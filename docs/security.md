# Security Architecture

Production security configuration for the portfolio application. This document covers HTTP headers, distributed rate limiting, CSP configuration, CSP reporting, deployment, and remaining risks.

## Architecture Overview

```
src/lib/security/
    constants.ts    — Security configuration constants
    redis.ts        — Upstash Redis client singleton
    rate-limit.ts   — Distributed sliding window rate limiter
    csp-report.ts   — CSP report parsing, sanitization, and logging
```

All security utilities are server-side only. No security logic runs in client components.

---

## Security Headers

Configured in `next.config.ts`, applied to all routes except `sitemap.xml` and `robots.txt`.

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Security-Policy` | See [CSP Configuration](#csp-configuration) | XSS and injection prevention |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | HTTPS enforcement (2 years) |
| `X-Frame-Options` | `DENY` | Clickjacking prevention |
| `X-Content-Type-Options` | `nosniff` | MIME-type sniffing prevention |
| `X-DNS-Prefetch-Control` | `on` | DNS prefetching (performance) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Referrer leakage control |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | Browser feature restriction |
| `X-Powered-By` | `""` | Server fingerprint removal |
| `Reporting-Endpoints` | `csp-report="/api/security/csp-report"` | CSP report routing |

API routes (`/api/*`) additionally receive:

| Header | Value | Purpose |
|--------|-------|---------|
| `Cache-Control` | `no-store, no-cache, must-revalidate, proxy-revalidate` | API response caching prevention |

---

## Distributed Rate Limiting

### Architecture

Uses **Upstash Redis** with `@upstash/ratelimit` v2.x and a sliding window algorithm.

```
┌─────────────────────────────────────────────┐
│  Vercel Serverless Function                 │
│  ┌─────────────┐    ┌──────────────────┐    │
│  │ API Route    │───▶│ checkRateLimit() │    │
│  └─────────────┘    └────────┬─────────┘    │
│                              │              │
└──────────────────────────────┼──────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Upstash Redis     │
                    │  (REST API, TLS)    │
                    │  Sliding Window     │
                    │  Atomic Operations  │
                    └─────────────────────┘
```

### Guarantees

- **Distributed**: Shared state across all Vercel function instances
- **Atomic**: `@upstash/ratelimit` uses Redis Lua scripts for atomic increment+check
- **Persistent**: Survives cold starts and function recycling
- **Graceful degradation**: If Redis is unreachable, requests are allowed through (availability over strictness)
- **Race-condition safe**: Sliding window with atomic operations prevents TOCTOU races

### Files

| File | Purpose |
|------|---------|
| `src/lib/security/constants.ts` | Default limits, key prefixes, timeout values |
| `src/lib/security/redis.ts` | Redis client singleton with connection pooling |
| `src/lib/security/rate-limit.ts` | Rate limit checker with fallback logic |

### Configuration

| Environment Variable | Required | Default | Description |
|---------------------|----------|---------|-------------|
| `UPSTASH_REDIS_REST_URL` | Yes | — | Upstash REST endpoint URL |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | — | Upstash authentication token |
| `RATE_LIMIT_MAX` | No | `5` | Max requests per window per key |
| `RATE_LIMIT_WINDOW_SECONDS` | No | `60` | Window duration in seconds |

### Usage

```typescript
import { checkRateLimit } from "@/lib/security/rate-limit";

const result = await checkRateLimit(`contact:${ip}`);
if (!result.allowed) {
  return NextResponse.json(
    { ok: false, error: "Too many requests. Please try again later." },
    { status: 429 },
  );
}
```

### Adding New Rate Limits

1. Import: `import { checkRateLimit } from "@/lib/security/rate-limit";`
2. Use a unique key prefix: `auth:${ip}`, `upload:${ip}:${filename}`
3. Check `result.allowed` before processing
4. Return `429` with the consistent JSON response on rejection

### Current Endpoints

| Endpoint | Key Pattern | Window | Max |
|----------|-------------|--------|-----|
| `POST /api/contact` | `contact:{ip}` | 60s | 5 |

---

## CSP Configuration

### Policy

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://vercel.live;
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self' data: https://fonts.gstatic.com;
connect-src 'self' https://vercel.live;
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
worker-src 'self';
report-uri /api/security/csp-report;
upgrade-insecure-requests
```

### Directive Rationale

| Directive | Value | Reason |
|-----------|-------|--------|
| `script-src` | `'self' 'unsafe-inline' https://vercel.live` | `unsafe-inline` required for 53 JSON-LD `<script>` tags and SW registration. `vercel.live` for dev toolbar. |
| `style-src` | `'self' 'unsafe-inline'` | Required for Tailwind CSS and framer-motion style injection |
| `img-src` | `'self' data: blob:` | Local images, data URIs, blob URLs |
| `font-src` | `'self' data: https://fonts.gstatic.com` | Local fonts, data URIs, Google Fonts |
| `connect-src` | `'self' https://vercel.live` | Same-origin API calls and Vercel analytics only |
| `frame-ancestors` | `'none'` | Prevents iframe embedding |
| `worker-src` | `'self'` | Service worker from same origin only |

### `unsafe-inline` Status

`unsafe-inline` in `script-src` cannot be removed until one of these is implemented:

1. **Nonce-based CSP**: Generate cryptographic nonce per request via middleware
2. **Hash-based CSP**: Compute SHA-256 hashes of all inline scripts at build time
3. **External script extraction**: Move JSON-LD to external `.json` files

All 53 JSON-LD scripts use static, developer-authored data with no user input.

### `unsafe-eval` Status

Removed. framer-motion v11+ does not require `eval()`. All animations and interactive components work without it.

---

## CSP Reporting

### Architecture

```
Browser detects CSP violation
        │
        ▼
POST /api/security/csp-report
        │
        ▼
parseCSPReport()  ─── Validates structure
        │
        ▼
logCSPReport()    ─── Sanitizes fields, strips PII, logs to stdout
        │
        ▼
Vercel Function Logs  ───  Filter by [csp-report] tag
```

### Files

| File | Purpose |
|------|---------|
| `src/lib/security/csp-report.ts` | Parsing, sanitization, logging utilities |
| `src/app/api/security/csp-report/route.ts` | HTTP endpoint |

### Endpoint Behavior

- **Method**: `POST` (receives reports), `GET` (health check)
- **Content-Type validation**: Rejects non-JSON bodies
- **Body validation**: Parses both `{"csp-report": {...}}` (legacy) and flat `{...}` (modern) formats
- **Minimum fields**: At least one of `blocked-uri` or `violated-directive` must be present
- **Sanitization**: All string fields stripped of HTML entities and control characters, truncated to 200 chars
- **Logged fields**: `timestamp`, `blockedUri`, `violatedDirective`, `documentUri`, `userAgent`, `sourceFile`, `lineNumber`, `columnNumber`, `statusCode`, `disposition`
- **Not logged**: Referrer, original-policy, script-sample (unnecessary PII/operational data)
- **Response**: Always `{ ok: true }` or `{ ok: false }` with appropriate status code

### Browser Configuration

Two mechanisms are active simultaneously:

1. **Modern browsers** (`Reporting-Endpoints` header):
   ```
   Reporting-Endpoints: csp-report="/api/security/csp-report"
   ```

2. **Legacy browsers** (`report-uri` in CSP):
   ```
   report-uri /api/security/csp-report
   ```

### Report Format

Browsers send JSON in this structure:

```json
{
  "csp-report": {
    "document-uri": "https://savan.sp-net.in/page",
    "referrer": "",
    "blocked-uri": "https://evil.com/script.js",
    "violated-directive": "script-src 'self'",
    "effective-directive": "script-src",
    "original-policy": "...",
    "disposition": "enforce",
    "status-code": 200,
    "source-file": "https://savan.sp-net.in/page",
    "line-number": 10,
    "column-number": 5
  }
}
```

### Integration Ready

The logging format is structured JSON compatible with:

| Service | Integration Method |
|---------|-------------------|
| Vercel Function Logs | Automatic — filter by `[csp-report]` |
| Datadog | Connect Vercel integration, filter logs |
| Better Stack | Ship Vercel logs via API |
| Sentry | Use Sentry CSP reports endpoint or custom integration |
| OpenTelemetry | Export logs via OTLP HTTP exporter |

---

## Redis Setup

### Upstash (Recommended)

1. Create account at [console.upstash.com](https://console.upstash.com)
2. Create database: name `portfolio`, region closest to Vercel deployment
3. Free tier: 10,000 commands/day, 256 MB — sufficient for portfolio traffic
4. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

### Vercel KV (Alternative)

If already using Vercel KV:

1. Enable KV in project settings
2. Use `KV_REST_API_URL` and `KV_REST_API_TOKEN` instead
3. Modify `src/lib/security/redis.ts` to use `@vercel/kv` client

### Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

| Variable | Scope | Value |
|----------|-------|-------|
| `UPSTASH_REDIS_REST_URL` | Production, Preview, Development | REST URL from Upstash |
| `UPSTASH_REDIS_REST_TOKEN` | Production, Preview, Development | Token from Upstash |
| `RATE_LIMIT_MAX` | All (optional) | `5` |
| `RATE_LIMIT_WINDOW_SECONDS` | All (optional) | `60` |

### Local Development

```bash
# .env.local
UPSTASH_REDIS_REST_URL=https://your-region.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxx...
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_SECONDS=60
```

---

## Deployment Steps

1. **Install dependencies**: `npm install` (Upstash packages already in `package.json`)
2. **Set environment variables** in Vercel Dashboard (see above)
3. **Deploy**: `git push` or `vercel deploy`
4. **Verify rate limiting**: Check Vercel Function Logs for `[contact]` entries
5. **Verify CSP reporting**: Check for `[csp-report]` entries after deploying

---

## Accepted Risks

| Risk | Severity | Rationale |
|------|----------|-----------|
| `unsafe-inline` in `script-src` | Medium | Required for 53 JSON-LD tags; no user input reaches these scripts |
| `unsafe-inline` in `style-src` | Low | Required for Tailwind + framer-motion; CSS injection has limited impact |
| `vercel.live` in CSP | Low | Only active in development; does not affect production |
| Rate limit bypass via X-Forwarded-For spoofing | Low | Vercel edge overwrites with real client IP |
| In-memory fallback when Redis is down | Low | Availability priority; origin validation and honeypot still active |
| PostCSS CVE (transitive via Next.js) | Low | Server-side only; CSP `style-src 'self'` prevents exploitation |

---

## Security Roadmap

| Priority | Item | Status |
|----------|------|--------|
| High | Distributed rate limiting (Upstash) | Done |
| High | CSP reporting endpoint | Done |
| High | `unsafe-eval` removal | Done |
| High | Security headers (HSTS, X-Frame-Options, etc.) | Done |
| High | CSRF origin validation | Done |
| High | Input validation and sanitization | Done |
| Medium | Nonce-based CSP to remove `unsafe-inline` | Planned |
| Medium | CSP violation alerting (Sentry/Datadog) | Planned |
| Medium | Request logging middleware | Planned |
| Low | IP-based blocking for repeat offenders | Planned |
| Low | Cloudflare Turnstile CAPTCHA | Planned |
| Info | `Permissions-Policy` extension for payments | If needed |
