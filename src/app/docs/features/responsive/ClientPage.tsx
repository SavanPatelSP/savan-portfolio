"use client";

import Link from "next/link";
import { DocPage, Callout, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/docs";

const toc = [
  { id: "breakpoint-system", label: "Breakpoint System" },
  { id: "mobile-first", label: "Mobile-First Strategy" },
  { id: "layout-patterns", label: "Layout Patterns by Device Class" },
  { id: "sidebar-behavior", label: "Sidebar Behavior Across Breakpoints" },
  { id: "typography-scaling", label: "Typography and Spacing Scaling" },
  { id: "touch-vs-pointer", label: "Touch vs Pointer Input" },
  { id: "orientation", label: "Orientation Changes" },
  { id: "safe-areas", label: "Safe Area Insets" },
  { id: "best-practices", label: "Best Practices" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "limitations", label: "Limitations" },
];

export default function ResponsiveClientPage() {
  return (
    <DocPage
      title="Responsive Design"
      description="How the Portfolio App handles layout adaptation across devices — from the breakpoint system and mobile-first strategy to sidebar behavior, touch input detection, safe area handling, and the specific trade-offs at each device class."
      toc={toc}
      section="Features"
    >
      <section id="breakpoint-system">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Breakpoint System
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application uses Tailwind CSS default breakpoints. These are CSS media queries that apply styles based on the viewport width. The breakpoints are additive — styles defined at the <InlineCode>sm</InlineCode> breakpoint apply to all screens wider than 640px, styles at <InlineCode>md</InlineCode> apply to all screens wider than 768px, and so on.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Breakpoint Definitions</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Prefix    Min Width    Typical Devices         Layout Strategy
──────────────────────────────────────────────────────────────────
(base)    0px          Small phones,            Single column,
                       foldables (closed)       bottom nav

sm        640px        Large phones,            Single column,
                       small tablets            slide-over nav

md        768px        Tablets (portrait),      Single column
                       large phones (land.)     with wider cards

lg        1024px       Tablets (landscape),     Two columns,
                       small laptops            icon sidebar

xl        1280px       Laptops, desktops        Three columns,
                                               full sidebar

2xl       1536px       Ultrawide monitors       Three columns,
                                               wider content`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The breakpoints are defined in the Tailwind configuration and applied via utility classes. For example, <InlineCode>grid-cols-1 md:grid-cols-2 xl:grid-cols-3</InlineCode> creates a single-column layout on phones, two columns on tablets, and three columns on desktops. There are no custom breakpoints beyond the Tailwind defaults — the app relies on the standard set because it covers the full device spectrum without unnecessary granularity.
        </p>
      </section>

      <section id="mobile-first">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Mobile-First Strategy
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          All layouts are built mobile-first. The base CSS targets the smallest screen (0px and up), and larger breakpoints progressively enhance the layout. This means:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Base styles are the mobile layout.</strong> No media query is needed for the smallest screen. All styles without a breakpoint prefix apply to phones.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Larger screens add complexity.</strong> The <InlineCode>md:</InlineCode> prefix adds a second column. The <InlineCode>xl:</InlineCode> prefix adds a third column and expands the sidebar. Each breakpoint adds features rather than replacing them.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">New features are designed for phones first.</strong> Before adding a desktop-only feature, the question is &quot;how does this work on a 375px screen?&quot; If the answer is &quot;it doesn&apos;t,&quot; the feature is redesigned rather than hidden.</span>
          </li>
        </ul>

        <Callout type="info" title="Why Mobile-First?">
          Mobile-first design ensures the core experience works on the most constrained device. It also results in smaller CSS bundles — base styles are small, and breakpoint-specific overrides are incremental. The alternative (desktop-first with mobile overrides) tends to produce larger CSS because more styles need to be reset or overridden for small screens.
        </Callout>
      </section>

      <section id="layout-patterns">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Layout Patterns by Device Class
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Each device class has a distinct layout pattern that optimizes for the available screen real estate and primary input method:
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Phone (below 768px)
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Single-column layout with full-width cards and components. Navigation is accessible through a slide-over sidebar triggered by a hamburger button. Typography is compact (smaller font sizes, tighter line heights) to maximize content density. All interactive elements meet the 44x44px minimum touch target. Content scrolls vertically with no horizontal scrolling required.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Tablet (768px - 1023px)
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Single-column primary layout, but with wider card grids (2 columns for project lists and dashboard widgets). The sidebar remains hidden by default, accessible via the slide-over. Typography scales up slightly. Horizontal swipe gestures work for tab bars and card carousels. In landscape mode, the layout may gain a second column for content-heavy pages.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Laptop (1024px - 1279px)
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Two-column layout with a persistent icon-only sidebar (no text labels, ~64px wide). The main content area uses 2-3 column grids. Hover interactions are fully supported — card hover states, dropdown menus, and tooltips appear on mouse hover. The table of contents is not yet visible (it appears at xl).
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Desktop (1280px+)
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Three-column layout: expanded sidebar with text labels (~240px), main content, and a sticky table of contents panel (on documentation pages). Grid layouts use 3-4 columns. All navigation paths are visible simultaneously. This is the layout that maximizes information density.
        </p>
      </section>

      <section id="sidebar-behavior">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Sidebar Behavior Across Breakpoints
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The sidebar is the most breakpoint-sensitive component. Its behavior changes at three distinct thresholds:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Sidebar State by Breakpoint</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Breakpoint    State                  Width      Trigger
─────────────────────────────────────────────────────────────
base - md     Hidden                 0px        Hamburger button
                                            opens slide-over

lg            Icon rail              ~64px      Always visible,
              (icons only,                         no text labels
              no text labels)

xl - 2xl      Expanded sidebar       ~240px     Always visible,
              (icons + text                      with text labels
              labels)`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          On phones and tablets (below <InlineCode>lg</InlineCode>), the sidebar is hidden by default and slides in as an overlay when the hamburger button is tapped. The overlay has a backdrop that closes the sidebar when tapped. The sidebar overlay traps keyboard focus while open — pressing Tab cycles through sidebar links only, and Escape closes it.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          At the <InlineCode>lg</InlineCode> breakpoint, the sidebar becomes a persistent icon-only rail. It is always visible and takes up approximately 64px of horizontal space. Navigation items show their icons but not their text labels. Hovering over an icon shows the label in a tooltip.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          At the <InlineCode>xl</InlineCode> breakpoint, the sidebar expands to show both icons and text labels, taking up approximately 240px. This is the full sidebar state that provides the most navigational context.
        </p>
      </section>

      <section id="typography-scaling">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Typography and Spacing Scaling
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Font sizes and spacing scale across breakpoints to maintain readability at every screen size. The scaling is not linear — it follows a constrained scale that prevents text from becoming too large on desktop or too small on phone:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Typography Scale</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Element          Phone        Tablet       Laptop       Desktop
────────────────────────────────────────────────────────────────
Page title       24px         28px         32px         36px
Section heading  18px         20px         20px         20px
Body text        14px         14px         14px         14px
Caption/meta     12px         12px         13px         13px
Line height      1.5          1.5          1.6          1.6
Content max-w    100%         100%         720px        720px
Page padding     16px         24px         32px         40px`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Body text remains at 14px across all breakpoints. This is intentional — 14px is the minimum comfortable reading size for extended content, and scaling it up on desktop would waste space without improving readability. Page titles and section headings scale up on larger screens to create visual hierarchy that matches the increased content width.
        </p>
      </section>

      <section id="touch-vs-pointer">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Touch vs Pointer Input
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application handles touch and pointer (mouse) input differently. Touch devices need larger tap targets, different hover behavior, and gesture support. Pointer devices can rely on hover states and precise clicks.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Input Behavior Map</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Interaction       Touch Device          Pointer Device
──────────────────────────────────────────────────────────
Hover             N/A (no hover)        Card highlight,
                                        tooltips, dropdowns

Tap/Click         44x44px min target    Standard click

Long press        Context menu          Right-click context
                                        menu

Swipe             Tab switching,        Not used (scroll
                  card carousel         via trackpad wheel)

Pinch             Image zoom            Not used

Double tap        Toggle zoom           Not used`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application uses the <InlineCode>pointer: coarse</InlineCode> media query to detect touch-primary devices and <InlineCode>pointer: fine</InlineCode> for mouse-primary devices. This allows different styles to apply based on input precision — for example, hover-dependent UI elements are hidden on touch devices where hover is unreliable.
        </p>

        <Callout type="note" title="Hover on Touch Devices">
          Modern mobile browsers do fire hover events on first tap (for elements with hover styles), but this behavior is inconsistent. The app does not rely on hover for critical functionality — hover states are always supplementary to tap/click actions.
        </Callout>
      </section>

      <section id="orientation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Orientation Changes
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When a tablet or phone rotates between portrait and landscape, the viewport dimensions change, which may cross a breakpoint boundary. The app handles this gracefully:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Layout reflows automatically.</strong> A tablet in portrait (768px wide) uses a single-column layout. Rotating to landscape (1024px wide) crosses the <InlineCode>lg</InlineCode> breakpoint and switches to a two-column layout with the icon sidebar. This happens without any JavaScript — it is pure CSS media query behavior.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Scroll position is preserved.</strong> The browser maintains scroll position across orientation changes by default. The app does not override this behavior. The user&apos;s position in the document is retained.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">No orientation lock.</strong> The app does not lock to portrait or landscape via the Screen Orientation API. Users are free to use whichever orientation is comfortable. The layout adapts to whichever orientation they choose.</span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Breakpoint Crossings During Rotation
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Common breakpoint crossings during rotation:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Phone portrait → landscape:</strong> 375px → 667px. Crosses <InlineCode>sm</InlineCode>. Minor layout adjustments (wider cards).</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Tablet portrait → landscape:</strong> 768px → 1024px. Crosses <InlineCode>lg</InlineCode>. Sidebar appears, layout switches from single to two-column.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Tablet landscape → portrait:</strong> 1024px → 768px. Crosses below <InlineCode>lg</InlineCode>. Sidebar hides, layout collapses to single-column.</span>
          </li>
        </ul>
      </section>

      <section id="safe-areas">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Safe Area Insets
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Modern phones have physical features that overlap the screen — notches, dynamic islands, rounded corners, and home indicator bars. The app respects these using CSS safe area insets:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Top safe area:</strong> <InlineCode>env(safe-area-inset-top)</InlineCode> accounts for the notch/dynamic island. The header and navigation are padded to avoid overlapping with these elements.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Bottom safe area:</strong> <InlineCode>env(safe-area-inset-bottom)</InlineCode> accounts for the home indicator bar on iPhone X and later. Bottom navigation and fixed elements are padded to remain fully visible and tappable.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">The viewport meta tag includes <InlineCode>viewport-fit=cover</InlineCode>.</strong> This tells the browser to extend the layout into the safe area, and the app uses padding to pull content back into the safe zone. Without <InlineCode>viewport-fit=cover</InlineCode>, the browser adds its own padding which is harder to control.</span>
          </li>
        </ul>

        <Callout type="warning" title="Testing Safe Areas">
          Safe area insets are only active when the app is in standalone mode (installed as a PWA) on devices with notches. In a browser tab, the browser chrome provides its own safe areas. To test safe area handling, install the app to the home screen on an iPhone X or later and verify that header and bottom content are not obscured.
        </Callout>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Test on real devices, not just browser resize.</strong> Browser responsive mode simulates viewport width but does not replicate touch behavior, safe area insets, or device-specific rendering. Test on actual phones and tablets for layout validation.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Verify orientation changes on tablets.</strong> Rotating a tablet can cross breakpoint boundaries. Check that the sidebar appears/disappears correctly, grids reflow, and scroll position is preserved.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Keep tap targets at 44x44px minimum on touch.</strong> This is the WCAG recommended minimum. Buttons, links, and form inputs on phone layouts should meet this size even if the design looks tighter.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span><strong className="text-white/60">Do not rely on hover for critical interactions.</strong> Hover states are supplementary on touch devices. All hover-dependent functionality must have an equivalent tap/click action.</span>
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
            <span><strong className="text-white/60">Using pixel-based widths instead of percentages.</strong> Setting a container to <InlineCode>width: 1024px</InlineCode> instead of <InlineCode>max-width: 1024px</InlineCode> will cause horizontal scrolling on smaller screens. Always use max-width for content containers.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Forgetting about the sidebar width.</strong> The sidebar takes up 64px (icon rail) or 240px (expanded). When calculating the available content width, these must be subtracted from the viewport. Failing to do this causes content to overflow on desktop.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Not testing with the sidebar open on tablet.</strong> The slide-over sidebar overlaps the content on phones and tablets. If content underneath is interactive (buttons, links), it may be inaccessible while the sidebar is open. Ensure the sidebar backdrop blocks interaction with underlying content.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Using fixed viewport height (100vh) on mobile.</strong> <InlineCode>100vh</InlineCode> on mobile browsers includes the area behind the URL bar, which means content may be partially hidden. Use <InlineCode>100dvh</InlineCode> (dynamic viewport height) or avoid fixed heights on mobile.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Ignoring text overflow on small screens.</strong> Long project names, URLs, or descriptions can overflow their containers on phone screens. Use text truncation (<InlineCode>truncate</InlineCode> class) or word-break for content that may exceed its container width.</span>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The responsive system has these constraints:
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Known Limitations</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Limitation                     Impact
────────────────────────────────────────────────────────────
No landscape-locked layout     Landscape on phones uses the
                               same layout as landscape on
                               tablets — no phone-landscape-
                               specific optimizations

Foldable device gaps           Foldable phones (Galaxy Fold)
                               may land between breakpoints
                               in half-screen mode. Layout
                               works but is not optimized
                               for the 360px half-screen

Sidebar memory                 On mobile, the sidebar open/
                               closed state is not persisted
                               across page navigations.
                               It resets on each route change.

100dvh not universal           Dynamic viewport height is
                               supported in Chrome 108+ and
                               Safari 15.4+. Older browsers
                               fall back to 100vh with the
                               known URL-bar issue.

No print stylesheet            Printing a page produces the
                               screen layout, which may not
                               be optimal for paper.`}
            </code>
          </pre>
        </div>
      </section>

      <section id="related">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Related
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/features/accessibility"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Accessibility</p>
            <p className="text-[13px] text-white/30">Keyboard navigation, screen reader support, and WCAG compliance.</p>
          </Link>
          <Link
            href="/docs/features/performance"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Performance</p>
            <p className="text-[13px] text-white/30">Responsive image loading and viewport-based optimizations.</p>
          </Link>
          <Link
            href="/docs/application/dashboard"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Dashboard</p>
            <p className="text-[13px] text-white/30">How dashboard layouts adapt across screen sizes.</p>
          </Link>
          <Link
            href="/docs/architecture/technology-stack"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Technology Stack</p>
            <p className="text-[13px] text-white/30">Tailwind CSS breakpoints and responsive utility classes.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
