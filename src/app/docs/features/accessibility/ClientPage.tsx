"use client";

import Link from "next/link";
import { DocPage, Callout, InlineCode } from "@/components/docs/DocLayout";

const toc = [
  { id: "wcag-target", label: "WCAG 2.1 AA Target" },
  { id: "semantic-html", label: "Semantic HTML Foundation" },
  { id: "keyboard-nav", label: "Keyboard Navigation" },
  { id: "focus-management", label: "Focus Management" },
  { id: "aria", label: "ARIA Attributes in Practice" },
  { id: "screen-readers", label: "Screen Reader Support" },
  { id: "reduced-motion", label: "Reduced Motion" },
  { id: "color-contrast", label: "Color Contrast" },
  { id: "forms", label: "Form Accessibility" },
  { id: "testing", label: "Testing and Auditing" },
  { id: "best-practices", label: "Best Practices" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "limitations", label: "Limitations" },
];

export default function AccessibilityClientPage() {
  return (
    <DocPage
      title="Accessibility"
      description="How the Portfolio App implements WCAG 2.1 AA compliance — covering semantic HTML, keyboard navigation, focus management, ARIA usage, screen reader behavior, reduced motion, color contrast, and the testing approach used to verify each."
      toc={toc}
      section="Features"
    >
      <section id="wcag-target">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          WCAG 2.1 AA Target
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application targets WCAG 2.1 Level AA compliance. This is the most commonly required standard for web applications and is referenced by legislation in many jurisdictions (ADA, Section 508, EU Accessibility Act). Level AA addresses the most critical accessibility barriers while remaining practical to implement.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          WCAG is organized around four principles — the app addresses each as follows:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Perceivable:</strong> All non-text content has text alternatives. Content can be presented in different ways without losing meaning (responsive layout, high contrast). Information is not conveyed by color alone.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Operable:</strong> All functionality is available via keyboard. Users have enough time to interact. No content flashes more than three times per second. Skip navigation is provided.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Understandable:</strong> Text is readable. Pages operate in predictable ways. Input assistance helps users avoid errors.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Robust:</strong> Content is compatible with current and future user agents, including assistive technologies. This is achieved through valid HTML, proper ARIA usage, and tested with screen readers.</span>
          </li>
        </ul>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">WCAG 2.1 AA Success Criteria — Key Items</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Criterion                       Category        Status
──────────────────────────────────────────────────────────
1.1.1  Non-text Content         Perceivable     ✓ Pass
1.3.1  Info and Relationships   Perceivable     ✓ Pass
1.4.3  Contrast (Minimum)       Perceivable     ✓ Pass
1.4.4  Resize Text              Perceivable     ✓ Pass
1.4.10 Reflow                   Perceivable     ✓ Pass
1.4.11 Non-text Contrast        Perceivable     ✓ Pass
2.1.1  Keyboard                 Operable        ✓ Pass
2.1.2  No Keyboard Trap         Operable        ✓ Pass
2.4.1  Bypass Blocks            Operable        ✓ Pass
2.4.3  Focus Order              Operable        ✓ Pass
2.4.6  Headings and Labels      Operable        ✓ Pass
2.4.7  Focus Visible            Operable        ✓ Pass
2.5.3  Label in Name            Operable        ✓ Pass
3.1.1  Language of Page         Understandable  ✓ Pass
3.2.1  On Focus                 Understandable  ✓ Pass
3.3.1  Error Identification     Understandable  ✓ Pass
3.3.2  Labels or Instructions   Understandable  ✓ Pass
4.1.2  Name, Role, Value        Robust          ✓ Pass
4.1.3  Status Messages          Robust          ✓ Pass`}
            </code>
          </pre>
        </div>
      </section>

      <section id="semantic-html">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Semantic HTML Foundation
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Accessibility starts with semantic HTML. Before any ARIA is added, the app uses native HTML elements that convey meaning to assistive technologies. A <InlineCode>&lt;nav&gt;</InlineCode> element is announced as a navigation landmark. A <InlineCode>&lt;button&gt;</InlineCode> is announced as a button and is keyboard-focusable by default. A <InlineCode>&lt;main&gt;</InlineCode> element identifies the primary content region.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The semantic structure used across pages:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><InlineCode>&lt;header&gt;</InlineCode> — Site header with logo and primary actions</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><InlineCode>&lt;nav&gt;</InlineCode> — Sidebar navigation (with <InlineCode>aria-label</InlineCode> to distinguish from other nav elements)</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><InlineCode>&lt;main&gt;</InlineCode> — Primary content area (one per page)</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><InlineCode>&lt;article&gt;</InlineCode> — Self-contained content blocks (project cards, documentation sections)</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><InlineCode>&lt;aside&gt;</InlineCode> — Table of contents sidebar (supplementary content)</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><InlineCode>&lt;footer&gt;</InlineCode> — Site footer</span>
          </li>
        </ul>

        <Callout type="info" title="Why Semantic HTML Matters">
          Screen readers use semantic elements to build a document outline. Users can navigate by landmarks (jump to main, jump to nav) and by heading levels. If a <InlineCode>&lt;div&gt;</InlineCode> is used instead of <InlineCode>&lt;button&gt;</InlineCode>, the element is not keyboard-focusable, has no button role, and is invisible to assistive technologies unless manually annotated with ARIA.
        </Callout>
      </section>

      <section id="keyboard-nav">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Keyboard Navigation
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every interactive element is reachable and operable via keyboard. The application implements standard keyboard patterns defined by WAI-ARIA Authoring Practices:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Keyboard Shortcuts</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Key                    Context                Action
──────────────────────────────────────────────────────────
Tab                    Global                 Move to next
                                              focusable element

Shift+Tab              Global                 Move to previous
                                              focusable element

Enter                  Button/link/link       Activate

Escape                 Modal/overlay/sidebar  Close and return
                                              focus to trigger

Arrow keys             Tab bar                Switch between
                                              tabs

Arrow keys             Navigation menu        Move between
                                              menu items

Arrow keys             List/grid              Move between
                                              items

Home                   List/grid              Move to first
                                              item

End                    List/grid              Move to last
                                              item

Ctrl+K                 Global                 Open search
                                              overlay`}
            </code>
          </pre>
        </div>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Tab Order
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Tab order follows the visual document flow. Elements are focusable in the order they appear visually — top to bottom, left to right. The application does not use positive <InlineCode>tabindex</InlineCode> values (which override natural tab order). The only <InlineCode>tabindex</InlineCode> values used are <InlineCode>0</InlineCode> (make a non-interactive element focusable) and <InlineCode>-1</InlineCode> (programmatically focusable but not in tab order).
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Skip Links
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          A &quot;Skip to main content&quot; link is the first focusable element on every page. It is visually hidden until the user presses Tab, at which point it becomes visible in the top-left corner. Activating it moves focus directly to the <InlineCode>&lt;main&gt;</InlineCode> element, bypassing the sidebar navigation. This is essential for keyboard users who would otherwise have to tab through 15-20 sidebar links on every page load.
        </p>
      </section>

      <section id="focus-management">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Focus Management
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Focus management ensures keyboard users never lose their position in the document. The application implements these patterns:
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Visible Focus Indicators
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every focusable element displays a visible focus ring when focused via keyboard. The focus ring uses a high-contrast outline that is distinct from the element&apos;s border. Mouse users do not see focus rings (using <InlineCode>:focus-visible</InlineCode> instead of <InlineCode>:focus</InlineCode>), which avoids the common complaint of &quot;ugly blue outlines&quot; while preserving them for keyboard users who need them.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Focus Trapping in Modals
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When a modal or dialog opens, focus moves to the first focusable element inside it. Pressing Tab cycles through the modal&apos;s interactive elements only — focus cannot escape the modal to interact with background content. Pressing Escape closes the modal and returns focus to the element that triggered it.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Focus Restoration
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When a component unmounts (e.g., closing the sidebar overlay, dismissing a toast notification), focus returns to the element that originally triggered it. Without this, focus would fall to the <InlineCode>body</InlineCode> element, forcing the keyboard user to tab from the beginning of the document.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Route Change Focus
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When navigating to a new page via client-side routing, focus moves to the new page&apos;s <InlineCode>&lt;h1&gt;</InlineCode> element or main content container. This announces the new page title to screen readers and gives keyboard users a known starting point.
        </p>

        <Callout type="tip" title="Testing Focus Management">
          Press Tab repeatedly on any page and verify: (1) focus is always visible, (2) focus never gets &quot;stuck&quot; on a non-interactive element, (3) opening and closing modals returns focus correctly, (4) navigating to a new page moves focus to the page title.
        </Callout>
      </section>

      <section id="aria">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          ARIA Attributes in Practice
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          ARIA attributes are used to supplement semantic HTML where native elements don&apos;t convey enough information. The rule is: use native HTML first, add ARIA only when HTML alone is insufficient. Common ARIA usage in this application:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">ARIA Attributes Used</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Attribute          Element                Purpose
──────────────────────────────────────────────────────────
aria-label         Icon buttons           Accessible name
                   Nav elements           when no visible
                   Search input           text is present

aria-expanded      Sidebar trigger        Indicates whether
                   Dropdown menus         the associated
                   Collapsible sections   content is visible

aria-current       Navigation links       Marks the active
                                         page/route

aria-live          Toast notifications    Announces dynamic
                   Loading states         content changes
                   Status updates         to screen readers

aria-describedby   Form inputs           Links to hint text
                                         or error messages

aria-hidden        Decorative icons       Hides elements
                   Sidebar backdrop       from assistive
                                         technologies

role="dialog"      Modal dialogs          Identifies the
                                         element as a
                                         interactive dialog`}
            </code>
          </pre>
        </div>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Live Regions for Dynamic Content
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When content changes dynamically (a toast notification appears, a loading spinner finishes, a form submission succeeds), screen readers need to be informed. The application uses <InlineCode>aria-live</InlineCode> regions to announce these changes. A <InlineCode>role=&quot;status&quot;</InlineCode> element (which implies <InlineCode>aria-live=&quot;polite&quot;</InlineCode>) is used for non-urgent updates. <InlineCode>role=&quot;alert&quot;</InlineCode> is used for error messages that require immediate attention.
        </p>
      </section>

      <section id="screen-readers">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Screen Reader Support
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application is tested with three screen readers that cover the major platforms:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">VoiceOver (macOS / iOS):</strong> Built into Apple devices. Tested with Safari on macOS and Safari on iOS. VoiceOver announces landmarks, headings, links, buttons, and form controls. The heading navigation (VO + Command + H) works correctly due to proper heading hierarchy.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">NVDA (Windows):</strong> Free, open-source screen reader for Windows. Tested with Chrome and Firefox. NVDA&apos;s browse mode and focus mode transitions work correctly with the app&apos;s interactive components.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">TalkBack (Android):</strong> Built into Android devices. Tested with Chrome on Android. TalkBack&apos;s linear navigation and local context navigation work correctly with the app&apos;s touch targets and ARIA annotations.</span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Heading Hierarchy
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every page has exactly one <InlineCode>&lt;h1&gt;</InlineCode> element (the page title). Section headings use <InlineCode>&lt;h2&gt;</InlineCode>. Sub-sections use <InlineCode>&lt;h3&gt;</InlineCode>. No heading levels are skipped — jumping from <InlineCode>&lt;h2&gt;</InlineCode> to <InlineCode>&lt;h4&gt;</InlineCode> would break heading navigation for screen reader users.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Descriptive Link Text
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          All links have descriptive text that makes sense out of context. Screen reader users often navigate by listing all links on a page. Links like &quot;click here&quot; or &quot;read more&quot; are meaningless in a link list. Instead, each link describes its destination: &quot;View project: Weather Dashboard&quot; or &quot;Read documentation: Offline Experience.&quot;
        </p>
      </section>

      <section id="reduced-motion">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Reduced Motion
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application respects the <InlineCode>prefers-reduced-motion</InlineCode> media query. When the user has enabled &quot;Reduce Motion&quot; in their operating system, the app adapts:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>All Framer Motion animations are disabled — elements appear and disappear instantly via opacity changes with no transition duration</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>Scroll-triggered animations (fade-in on scroll, parallax effects) are skipped entirely — content is visible immediately without waiting for scroll position</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>Page transitions use a simple opacity fade instead of directional slides</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>Hover-triggered transforms (scale, translate) are simplified to color changes only</span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          How to Enable Reduced Motion
        </h3>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">macOS:</strong> System Settings &gt; Accessibility &gt; Display &gt; Reduce Motion</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Windows:</strong> Settings &gt; Accessibility &gt; Visual Effects &gt; Animation effects (toggle off)</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">iOS:</strong> Settings &gt; Accessibility &gt; Motion &gt; Reduce Motion</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Android:</strong> Settings &gt; Accessibility &gt; Remove animations</span>
          </li>
        </ul>

        <Callout type="warning" title="Testing Reduced Motion">
          Developers can emulate reduced motion in Chrome DevTools: open the Rendering tab, find &quot;Emulate CSS media feature prefers-reduced-motion: reduce&quot; and enable it. This avoids changing your OS settings during testing.
        </Callout>
      </section>

      <section id="color-contrast">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Color Contrast
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          All text and interactive elements meet WCAG 2.1 AA contrast ratios. The application uses a dark theme, which requires careful attention to contrast — low-opacity white text on dark backgrounds can easily fall below the minimum threshold:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Normal text (&lt;18px):</strong> Minimum 4.5:1 contrast ratio. All body text, captions, and labels meet this threshold.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Large text (18px+ bold or 24px+ regular):</strong> Minimum 3:1 contrast ratio. Page titles and section headings meet this threshold.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">UI components and icons:</strong> Minimum 3:1 contrast ratio against adjacent colors. Focus rings, borders, and interactive icons meet this threshold.</span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Color Is Not the Only Indicator
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application never conveys information through color alone. Active navigation items use both color (emerald accent) and weight (bold text). Error states use both color (red) and an icon. Status indicators use color plus text labels. This ensures that colorblind users can still understand the interface.
        </p>
      </section>

      <section id="forms">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Form Accessibility
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Forms are one of the most accessibility-sensitive areas. The application implements these patterns:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Every input has a visible <InlineCode>&lt;label&gt;</InlineCode>.</strong> Labels are associated with their inputs via the <InlineCode>htmlFor</InlineCode> attribute. Placeholder text is never used as a substitute for a label — it disappears when the user types, leaving no visible label.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Error messages are linked to inputs.</strong> When a form field has an error, the error message is linked to the input via <InlineCode>aria-describedby</InlineCode>. Screen readers announce the error when the user focuses the input.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Required fields are indicated both visually and programmatically.</strong> Required inputs use the <InlineCode>required</InlineCode> attribute and an asterisk in the label. The <InlineCode>aria-required=&quot;true&quot;</InlineCode> attribute is also set for screen readers that don&apos;t announce the <InlineCode>required</InlineCode> attribute.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Form submission feedback is announced.</strong> When a form is submitted successfully or fails, the result is announced via an <InlineCode>aria-live</InlineCode> region. The user does not need to visually scan the page to confirm the result.</span>
          </li>
        </ul>
      </section>

      <section id="testing">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Testing and Auditing
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Accessibility is verified through a combination of automated and manual testing:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Automated scans:</strong> axe-core runs in the test suite to catch common violations — missing alt text, contrast failures, missing labels, duplicate IDs. Automated tools catch approximately 30-40% of WCAG issues.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Keyboard-only testing:</strong> Every page is navigated entirely via keyboard to verify tab order, focus visibility, and keyboard trap absence. This catches issues that automated tools miss.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Screen reader testing:</strong> Key user flows are tested with VoiceOver and NVDA to verify that the announced content matches the visual content and that interactive elements behave as expected.</span>
          </li>
        </ul>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Use semantic HTML before reaching for ARIA.</strong> A <InlineCode>&lt;button&gt;</InlineCode> is always better than a <InlineCode>&lt;div role=&quot;button&quot;&gt;</InlineCode>. Native elements come with keyboard handling, focus management, and screen reader support built in.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Test with a keyboard weekly.</strong> Navigate every page using only Tab, Shift+Tab, Enter, Escape, and Arrow keys. If any element is unreachable or any interaction is impossible, it is an accessibility bug.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Run axe-core on every PR.</strong> Automated testing catches low-hanging fruit. It is not sufficient alone, but it prevents regressions on the issues it can detect.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span><strong className="text-white/60">Do not disable focus outlines without replacement.</strong> Removing <InlineCode>:focus</InlineCode> outlines with <InlineCode>outline: none</InlineCode> without providing a <InlineCode>:focus-visible</InlineCode> alternative makes the app unusable for keyboard users.</span>
          </li>
        </ul>
      </section>

      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Common Mistakes
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Using <InlineCode>aria-label</InlineCode> on non-interactive elements.</strong> <InlineCode>aria-label</InlineCode> only works on elements with explicit roles (buttons, links, landmarks). On a <InlineCode>&lt;div&gt;</InlineCode> without a role, <InlineCode>aria-label</InlineCode> is ignored by screen readers.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Skipping heading levels.</strong> Going from <InlineCode>&lt;h2&gt;</InlineCode> to <InlineCode>&lt;h4&gt;</InlineCode> breaks heading navigation. Screen reader users rely on heading levels to understand document structure.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Setting <InlineCode>aria-hidden=&quot;true&quot;</InlineCode> on focusable elements.</strong> If a focusable element (button, link) is hidden from screen readers via <InlineCode>aria-hidden</InlineCode>, keyboard users can still Tab to it, but screen readers won&apos;t announce it. This creates a confusing experience.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Using placeholder text as labels.</strong> Placeholders disappear on input, leaving no visible label. This violates WCAG 1.3.1 (Info and Relationships) and 3.3.2 (Labels or Instructions).</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Not testing with actual screen readers.</strong> Automated tools catch about 30-40% of issues. The remaining 60-70% — incorrect announcements, missing context, broken navigation — can only be found by testing with VoiceOver, NVDA, or TalkBack.</span>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The current accessibility implementation has these known gaps:
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Known Limitations</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Limitation                     Impact
────────────────────────────────────────────────────────────
No WCAG AAA compliance         Some contrast ratios and text
                               sizing criteria are not met at
                               the AAA level (not required
                               for AA)

Dark theme is the only         Users who need high-contrast
option                         light themes cannot switch.
                               No light theme toggle exists.

Complex data tables may        Some dashboard data tables may
lack full ARIA table           not have complete row/column
semantics                      header associations.

Third-party content            If external content (embedded
(如果 ever added)              videos, iframes) is added in
                               the future, it may introduce
                               accessibility gaps.

Automated testing covers       ~30-40% of WCAG criteria.
only ~30-40%                   Manual testing is required
                               for the rest.`}
            </code>
          </pre>
        </div>

        <Callout type="note" title="Continuous Improvement">
          Accessibility is an ongoing commitment, not a one-time achievement. If you encounter any accessibility barrier, please report it. Every issue is reviewed, triaged by severity, and addressed. The WCAG criteria listed in the compliance table above are re-verified with each major release.
        </Callout>
      </section>

      <section id="related">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Related
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/features/responsive"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Responsive Design</p>
            <p className="text-[13px] text-white/30">How the app adapts across screen sizes and input methods.</p>
          </Link>
          <Link
            href="/docs/getting-started/navigation"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Navigation</p>
            <p className="text-[13px] text-white/30">Keyboard shortcuts and navigation patterns for all pages.</p>
          </Link>
          <Link
            href="/docs/features/privacy"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Privacy</p>
            <p className="text-[13px] text-white/30">Zero data collection and local-only storage.</p>
          </Link>
          <Link
            href="/docs/developer/coding-standards"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Coding Standards</p>
            <p className="text-[13px] text-white/30">Accessibility patterns and conventions used in the codebase.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
