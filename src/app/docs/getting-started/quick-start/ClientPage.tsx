"use client";

import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";

const steps = [
  {
    number: 1,
    title: "Open the Portfolio",
    body: (
      <>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Navigate to the Portfolio App in any modern browser. The app is hosted at:
        </p>
        <CodeBlock
          code="https://savan.sp-net.in"
          language="url"
          filename="URL"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          No account creation, sign-in, or personal information is required. The app is
          fully open and accessible to everyone.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mt-3">
          <strong className="text-white/50">What happens here:</strong> Your browser
          fetches the HTML, CSS, and JavaScript for the landing page. The service worker
          registers in the background and begins caching assets. This registration is
          what enables offline access later.
        </p>
        <Callout type="note" title="First Visit Behavior">
          On the first visit, the service worker installs but does not activate until
          all tabs pointing to the app are closed and reopened. This is standard
          browser behavior to prevent old cached content from being served while the
          app is open.
        </Callout>
      </>
    ),
  },
  {
    number: 2,
    title: "Install the App",
    body: (
      <>
        <p className="text-[14px] text-white/40 leading-relaxed mb-3">
          Installing the app adds it to your device with its own icon, window, and
          taskbar entry. The installation method varies by platform:
        </p>
        <ul className="space-y-3 mb-4">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-5 w-5 flex items-center justify-center rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400/60 shrink-0">
              C
            </span>
            <div>
              <strong className="text-white/50 text-[14px]">Desktop (Chrome/Edge)</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Click the install icon in the address bar (a monitor with a downward
                arrow), or open the browser menu and select{" "}
                <InlineCode>Install Portfolio App</InlineCode>. Confirm the dialog
                and the app installs in under 5 seconds.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-5 w-5 flex items-center justify-center rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400/60 shrink-0">
              A
            </span>
            <div>
              <strong className="text-white/50 text-[14px]">Android (Chrome)</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                A banner appears at the bottom of the screen after a few seconds.
                Tap <InlineCode>Install</InlineCode>. Alternatively, tap the three-dot
                menu and select <InlineCode>Add to Home screen</InlineCode>. The app
                icon appears on your home screen.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-5 w-5 flex items-center justify-center rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400/60 shrink-0">
              I
            </span>
            <div>
              <strong className="text-white/50 text-[14px]">iPhone/iPad (Safari)</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Tap the Share button (square with upward arrow) at the bottom of the
                screen. Scroll down and tap <InlineCode>Add to Home Screen</InlineCode>.
                Tap <InlineCode>Add</InlineCode> in the top-right corner. The app icon
                appears on your home screen and opens in standalone mode.
              </p>
            </div>
          </li>
        </ul>
        <Callout type="tip" title="Alternative: Install from Downloads Page">
          You can install the app at any time by visiting{" "}
          <InlineCode>/downloads</InlineCode> and clicking the install button. This
          works even if the browser&apos;s native install prompt does not appear.
        </Callout>
        <p className="text-[14px] text-white/40 leading-relaxed mt-3">
          <strong className="text-white/50">What happens here:</strong> The browser
          creates a standalone app entry in your OS. It downloads the app icon, sets
          up the standalone window configuration, and registers the app with your
          operating system&apos;s application manager.
        </p>
      </>
    ),
  },
  {
    number: 3,
    title: "Launch from Desktop or Home Screen",
    body: (
      <>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          After installation, the Portfolio App appears as a standalone application:
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              <strong className="text-white/50">Windows:</strong> Found in the Start
              Menu under &quot;Recently added&quot; or by searching &quot;Portfolio App&quot;. Can be
              pinned to the taskbar.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              <strong className="text-white/50">macOS:</strong> Found in the
              Applications folder or Spotlight search. Drag to the Dock for
              persistent access.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              <strong className="text-white/50">Android:</strong> Appears on the home
              screen like any other app. Long-press to move or create folders.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              <strong className="text-white/50">iOS:</strong> Appears on the home
              screen. Supports Spotlight search and can be added to Home Screen
              pages or folders.
            </span>
          </li>
        </ul>
        <p className="text-[14px] text-white/40 leading-relaxed">
          When launched from the home screen or desktop, the app opens in its own
          window — no browser tabs, no address bar, no URL bar. It looks and behaves
          like any other application on your device. The taskbar or app switcher shows
          it as a separate entry.
        </p>
      </>
    ),
  },
  {
    number: 4,
    title: "Verify Offline Access",
    body: (
      <>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Once the app has been visited with an internet connection, key pages and
          assets are cached. To verify offline access works:
        </p>
        <ol className="space-y-3 mb-4 list-decimal list-inside">
          <li className="text-[14px] text-white/40 leading-relaxed">
            <strong className="text-white/50">Browse a few pages</strong> — visit
            the Home page, Projects, and at least one Documentation page while online.
            This ensures those pages are cached.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            <strong className="text-white/50">Go offline</strong> — turn on
            airplane mode, disable Wi-Fi, or disconnect your Ethernet cable.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            <strong className="text-white/50">Reload the app</strong> — close and
            reopen the app, or navigate to pages you visited while online. They should
            load instantly from the cache.
          </li>
        </ol>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/50">What happens here:</strong> The service
          worker intercepts the navigation request, checks the cache, and serves the
          cached version of the page. Assets (CSS, JS, images) are also served from
          cache. The page appears identical to the online version.
        </p>
        <Callout type="info" title="What Is and Is Not Available Offline">
          <strong className="text-white/50">Available:</strong> Pages you have
          previously visited, documentation, project descriptions, and static assets.
          <br />
          <strong className="text-white/50">Not available:</strong> Pages you have
          never visited while online, real-time data, and external resources not
          cached by the service worker.
        </Callout>
      </>
    ),
  },
];

export default function ClientPage() {
  return (
    <DocPage
      title="Quick Start"
      description="Get the Portfolio App installed and running in four steps. Total time: under 2 minutes."
      toc={[
        { id: "step-1-open-the-portfolio", label: "Step 1: Open the Portfolio" },
        { id: "step-2-install-the-app", label: "Step 2: Install the App" },
        { id: "step-3-launch-from-desktop-or-home-screen", label: "Step 3: Launch" },
        { id: "step-4-verify-offline-access", label: "Step 4: Verify Offline" },
      ]}
      section="Getting Started"
    >
      <Callout type="note" title="Prerequisites">
        You need a modern browser (Chrome 76+, Edge 76+, Safari 16.4+, or Firefox
        108+) and an internet connection for the initial visit. No software
        downloads or account creation required.
      </Callout>

      {steps.map((step) => (
        <section key={step.number} id={`step-${step.number}-${step.title.toLowerCase().replace(/\s+/g, "-")}`}>
          <div className="flex items-start gap-4 mb-6 mt-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm font-mono text-blue-400/60">
              {step.number}
            </span>
            <div>
              <h2 className="text-xl font-semibold text-white/70">{step.title}</h2>
            </div>
          </div>
          <div className="ml-12">
            {step.body}
          </div>
        </section>
      ))}

      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Common Mistakes</h2>
        <ul className="space-y-3 mb-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">The install prompt does not appear</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Some browsers suppress the install prompt if the user has previously
                dismissed it. Use the{" "}
                <InlineCode>/downloads</InlineCode> page install button instead, or
                check the browser menu for a manual install option.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Offline pages show a blank screen</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                You must visit a page while online before it becomes available offline.
                The service worker caches pages on first visit, not preemptively for
                all routes.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">The app icon does not appear on home screen</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                On iOS, you must use Safari&apos;s Share menu to add to Home Screen.
                Chrome on iOS does not support PWA installation. On Android, ensure
                you are using Chrome (not a WebView wrapper).
              </p>
            </div>
          </li>
        </ul>
      </section>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <Callout type="note" title="Next Steps">
          Now that the app is installed, explore the{" "}
          <a href="/docs/getting-started/navigation" className="text-white/50 hover:text-white/70 underline underline-offset-2 transition-colors">
            Navigation guide
          </a>{" "}
          to learn how to move through the application, or visit the{" "}
          <a href="/docs/features/offline" className="text-white/50 hover:text-white/70 underline underline-offset-2 transition-colors">
            Offline Experience
          </a>{" "}
          page to understand caching behavior in depth.
        </Callout>
      </div>
    </DocPage>
  );
}
