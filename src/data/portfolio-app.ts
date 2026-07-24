import { APP_CONFIG } from "@/config/app";

export const APP_VERSION = APP_CONFIG.version;
export const APP_NAME = "Portfolio App";
export const APP_DESCRIPTION = `Installable web application developed by ${APP_CONFIG.organization.name}`;
export const APP_TAGLINE = "The portfolio, installed.";
export const RELEASE_CHANNEL = "Stable";
export const FIRST_RELEASE = "2026";

export const features = [
  {
    id: "native-experience",
    title: "Native Experience",
    description: "Runs in its own window without browser chrome. Feels like a dedicated desktop application.",
    icon: "Monitor",
  },
  {
    id: "offline-access",
    title: "Offline Access",
    description: "Previously viewed pages remain available without an internet connection.",
    icon: "Wifi",
  },
  {
    id: "auto-updates",
    title: "Automatic Updates",
    description: "Always stays current with the latest content and improvements.",
    icon: "RefreshCw",
  },
  {
    id: "fast-launch",
    title: "Instant Launch",
    description: "Opens directly from your desktop or home screen. No browser navigation required.",
    icon: "Zap",
  },
  {
    id: "privacy-first",
    title: "Privacy First",
    description: "No analytics, no tracking, no data collection. Your browsing stays on your device.",
    icon: "Shield",
  },
  {
    id: "cross-platform",
    title: "Cross-Platform",
    description: "Works on Windows, macOS, Linux, Android, and iOS. Consistent experience everywhere.",
    icon: "Smartphone",
  },
] as const;

export interface Platform {
  name: string;
  icon: string;
  support: "Full Support" | "Guided Install" | "Limited";
  method: string;
  browsers: string[];
  requirements: string;
  limitations?: string;
  experience: string;
}

export const platforms: Platform[] = [
  {
    name: "Windows",
    icon: "desktop",
    support: "Full Support",
    method: "Click the install icon in the address bar, or use the three-dot menu → 'Install app'.",
    browsers: ["Chrome 67+", "Edge 79+", "Opera 54+"],
    requirements: "Windows 10 or later",
    experience: "Standalone window with native title bar integration. Pins to taskbar. Launches from Start menu.",
  },
  {
    name: "macOS",
    icon: "monitor",
    support: "Full Support",
    method: "Safari: File → 'Add to Dock'. Chrome: Install icon in address bar. Edge: Install from menu.",
    browsers: ["Safari 14.1+", "Chrome 67+", "Edge 79+"],
    requirements: "macOS 11 Big Sur or later",
    experience: "Standalone window. Appears in Dock and Launchpad. Supports native macOS keyboard shortcuts.",
  },
  {
    name: "Linux",
    icon: "terminal",
    support: "Full Support",
    method: "Click the install icon in the Chrome or Edge address bar.",
    browsers: ["Chrome 67+", "Edge 79+"],
    requirements: "Any modern Linux distribution",
    experience: "Standalone window. Integrates with desktop environment. Can be launched from application menu.",
  },
  {
    name: "Android",
    icon: "smartphone",
    support: "Full Support",
    method: "Chrome: Tap the three-dot menu → 'Add to Home Screen' or 'Install app'.",
    browsers: ["Chrome 67+", "Samsung Internet 14+", "Edge 79+"],
    requirements: "Android 5.0 or later",
    experience: "Full-screen app without browser UI. Appears on home screen and in app drawer. Supports notifications.",
  },
  {
    name: "iPhone",
    icon: "smartphone",
    support: "Guided Install",
    method: "Safari: Tap the Share button → 'Add to Home Screen'.",
    browsers: ["Safari 14.1+ (iOS 15+)"],
    requirements: "iOS 15 or later",
    experience: "Standalone web app. Opens without Safari chrome. Limited to Safari's web capabilities.",
    limitations: "No automatic install prompt. No push notifications. Some APIs restricted by iOS.",
  },
  {
    name: "iPad",
    icon: "tablet",
    support: "Guided Install",
    method: "Safari: Tap the Share button → 'Add to Home Screen'.",
    browsers: ["Safari 14.1+ (iPadOS 15+)"],
    requirements: "iPadOS 15 or later",
    experience: "Optimized for tablet display. Works in both portrait and landscape. Supports Split View.",
    limitations: "Same limitations as iPhone — no automatic prompt, no push notifications.",
  },
];

export interface ReleaseNote {
  version: string;
  date: string;
  type: "major" | "minor" | "patch";
  added: string[];
  improved: string[];
  fixed: string[];
  knownIssues: string[];
  upgradeNotes?: string;
}

export const releases: ReleaseNote[] = [
  {
    version: "1.0.0",
    date: "2026",
    type: "major",
    added: [
      "Initial Portfolio App release",
      "Progressive Web App with offline support",
      "Cross-platform installation (Windows, macOS, Linux, Android, iOS)",
      "Service worker with cache-first strategy for static assets",
      "Offline fallback page",
      "Custom install prompt with engagement detection",
      "Installation documentation for all platforms",
    ],
    improved: [],
    fixed: [],
    knownIssues: [
      "iOS installation requires manual Share \u2192 Add to Home Screen",
      "First visit requires internet connection to cache assets",
    ],
    upgradeNotes: "Initial release. No previous version to upgrade from.",
  },
];

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: "what-is",
    question: "What is the Portfolio App?",
    answer: "The Portfolio App is a Progressive Web App (PWA) that allows you to install this portfolio as a native-like application on your desktop or mobile device. It provides faster loading, offline access, and a distraction-free experience without browser chrome.",
    category: "General",
  },
  {
    id: "is-free",
    question: "Is it free?",
    answer: "Yes. The Portfolio App is completely free with no in-app purchases, subscriptions, or hidden costs.",
    category: "General",
  },
  {
    id: "how-install",
    question: "How do I install it?",
    answer: "On desktop browsers (Chrome, Edge, Safari), look for an install icon in the address bar. On mobile, use your browser's menu to 'Add to Home Screen'. Each platform has specific instructions — see the installation guide for details.",
    category: "Installation",
  },
  {
    id: "browser-support",
    question: "Which browsers support installation?",
    answer: "Chrome 67+, Edge 79+, Safari 14.1+, and Opera 54+ on desktop. On mobile: Chrome for Android, Samsung Internet, and Safari on iOS 15+. Firefox does not currently support PWA installation.",
    category: "Installation",
  },
  {
    id: "offline",
    question: "Does it work offline?",
    answer: "Yes. Once installed and visited at least once while online, previously viewed pages are cached for offline access. The homepage and core assets are always available offline.",
    category: "Features",
  },
  {
    id: "replaces-website",
    question: "Does it replace the website?",
    answer: "No. The installed app is the same website, just running in a standalone window. All content is identical. You can still use the website in your browser normally.",
    category: "General",
  },
  {
    id: "updates",
    question: "How are updates delivered?",
    answer: "The app checks for updates each time it connects to the internet. New versions are automatically cached. You may need to restart the app to see updates.",
    category: "Features",
  },
  {
    id: "uninstall",
    question: "How do I uninstall it?",
    answer: "On desktop: right-click the app in your taskbar or dock and select 'Uninstall', or use your operating system's app management. On mobile: long-press the app icon and select 'Remove' or 'Uninstall'.",
    category: "Installation",
  },
  {
    id: "data-collection",
    question: "Does it collect data?",
    answer: "No. The Portfolio App does not use analytics, tracking cookies, or any data collection. Your browsing activity stays entirely on your device. The service worker only caches assets for offline use.",
    category: "Privacy",
  },
  {
    id: "clear-cache",
    question: "How do I clear cached files?",
    answer: "In your browser, go to Settings → Privacy → Clear browsing data and select 'Cached images and files'. On mobile, you can also uninstall and reinstall the app to get a fresh cache.",
    category: "Features",
  },
  {
    id: "difference-bookmark",
    question: "How is this different from bookmarking?",
    answer: "Unlike a bookmark, the installed app runs in its own standalone window without browser tabs or address bar. It also caches content for offline viewing and can be launched directly from your desktop or home screen.",
    category: "General",
  },
  {
    id: "account-required",
    question: "Do I need an account?",
    answer: "No. The Portfolio App requires no account, login, or registration. Install it and use it immediately.",
    category: "General",
  },
  {
    id: "storage",
    question: "How much storage does it use?",
    answer: "The app typically uses 5-15MB of storage for cached assets. This varies based on how many pages you visit. Cached pages grow as you browse.",
    category: "Features",
  },
  {
    id: "battery",
    question: "Does it drain battery?",
    answer: "No. The app only activates when you open it. It does not run background processes or sync data when closed.",
    category: "Features",
  },
  {
    id: "notifications",
    question: "Does it support notifications?",
    answer: "Not currently. Push notifications are not implemented. The app focuses on content delivery rather than notification-based engagement.",
    category: "Features",
  },
  {
    id: "source-code",
    question: "Is the source code available?",
    answer: "The portfolio is a personal project. While some components may be open-sourced in the future, the full source code is not publicly available.",
    category: "General",
  },
  {
    id: "changelog",
    question: "Where can I see what changed?",
    answer: "Visit the Release Notes page for a detailed changelog of every version, including new features, improvements, and fixes.",
    category: "General",
  },
  {
    id: "ios-limitations",
    question: "What are the limitations on iOS?",
    answer: "iOS Safari does not support automatic install prompts — you must manually use Share → Add to Home Screen. Push notifications and some advanced web APIs are also restricted on iOS.",
    category: "Installation",
  },
  {
    id: "multiple-devices",
    question: "Can I install on multiple devices?",
    answer: "Yes. There is no limit on installations. Install the app on as many devices as you like.",
    category: "Installation",
  },
  {
    id: "sync",
    question: "Does it sync across devices?",
    answer: "No. Each installation is independent. There is no account system or cloud sync. Your preferences and cached data stay on each device.",
    category: "Features",
  },
  {
    id: "speed",
    question: "Is it faster than the website?",
    answer: "Yes. Cached assets load instantly without network requests. The app shell is pre-cached, making subsequent launches significantly faster than loading in a browser tab.",
    category: "Features",
  },
  {
    id: "security",
    question: "Is it secure?",
    answer: "The app uses HTTPS for all network requests and follows web security best practices. Service workers are scope-restricted. No external scripts or trackers are loaded.",
    category: "Privacy",
  },
  {
    id: "screen-size",
    question: "Does it work on all screen sizes?",
    answer: "Yes. The app is fully responsive and works on any screen size, from mobile phones to ultrawide monitors.",
    category: "Features",
  },
  {
    id: "pwa-explanation",
    question: "What is a PWA?",
    answer: "A Progressive Web App (PWA) uses modern web technologies to deliver a native app-like experience. It can be installed, works offline, and runs in its own window — without requiring an app store.",
    category: "General",
  },
  {
    id: "app-store",
    question: "Is it on the App Store or Play Store?",
    answer: "No. PWAs are installed directly from the browser, bypassing app stores. This means no review process, no store fees, and instant updates.",
    category: "Installation",
  },
  {
    id: "cookies",
    question: "Does it use cookies?",
    answer: "The app uses minimal local storage for preferences (theme, dismiss states). No tracking cookies or third-party cookies are used.",
    category: "Privacy",
  },
  {
    id: "javascript",
    question: "Does it require JavaScript?",
    answer: "Yes. The app is built with modern JavaScript frameworks. A basic fallback page is shown if JavaScript is disabled.",
    category: "Features",
  },
  {
    id: "accessibility",
    question: "Is it accessible?",
    answer: "Yes. The app maintains ARIA labels, keyboard navigation, reduced motion support, proper contrast ratios, and semantic HTML throughout.",
    category: "Features",
  },
  {
    id: "open-source-stance",
    question: "Will you open source the PWA code?",
    answer: "There are no current plans to open-source the PWA implementation. This may change as the project evolves.",
    category: "General",
  },
  {
    id: "roadmap",
    question: "What is planned for the future?",
    answer: "Future improvements include enhanced offline capabilities, background sync, richer notifications, and expanded platform support. See the roadmap for details.",
    category: "General",
  },
  {
    id: "troubleshoot-install",
    question: "The install button doesn't appear. What do I do?",
    answer: "Ensure you're using a supported browser (Chrome, Edge, or Safari). The install prompt only appears after the browser determines the site meets PWA criteria. Try refreshing the page or visiting a few sections first.",
    category: "Troubleshooting",
  },
  {
    id: "troubleshoot-offline",
    question: "Offline pages show errors.",
    answer: "Pages must be visited at least once while online to be cached. Visit the pages you want available offline, then they'll work without a connection.",
    category: "Troubleshooting",
  },
  {
    id: "troubleshoot-update",
    question: "The app shows outdated content.",
    answer: "Close and reopen the app to trigger an update check. If the issue persists, clear the app cache through your browser settings.",
    category: "Troubleshooting",
  },
  {
    id: "troubleshoot-browser-frame",
    question: "The app shows browser frames after installation.",
    answer: "Some browsers need a restart after installation. Close and reopen the app. If the issue persists, uninstall and reinstall.",
    category: "Troubleshooting",
  },
  {
    id: "theme",
    question: "Can I change the theme?",
    answer: "The app follows your system theme preference. Light and dark mode are both supported and adjust automatically based on your OS settings.",
    category: "Features",
  },
  {
    id: "performance",
    question: "How does it affect performance?",
    answer: "The app uses a cache-first strategy for static assets, reducing network requests. Service worker registration adds minimal overhead. Overall performance is improved over browser-based browsing.",
    category: "Features",
  },
  {
    id: "share",
    question: "Can I share content from the app?",
    answer: "Yes. The app supports the Web Share API on supported platforms, allowing you to share pages directly from the installed app.",
    category: "Features",
  },
  {
    id: "dark-mode",
    question: "Does it support dark mode?",
    answer: "Yes. The app automatically adapts to your operating system's light or dark mode preference using the prefers-color-scheme media query.",
    category: "Features",
  },
];

export const offlineCapabilities = {
  cached: [
    "Homepage and navigation structure",
    "Previously viewed pages",
    "Static assets (CSS, JavaScript, fonts)",
    "Images and icons",
    "Theme preferences",
    "Layout and component data",
  ],
  notCached: [
    "Pages not yet visited",
    "Dynamic API responses",
    "Real-time contact form submissions",
    "External embedded content",
  ],
  future: [
    "Background synchronization",
    "Periodic background sync for content updates",
    "Enhanced prefetching strategies",
    "Selective page caching controls",
  ],
};

export const privacyInfo = {
  stored: [
    { item: "Cached assets", description: "Static files (HTML, CSS, JS, images) stored for offline access", size: "5-15MB typical" },
    { item: "Theme preference", description: "Whether you prefer light or dark mode", size: "1 byte" },
    { item: "Dismiss states", description: "Whether you dismissed install prompts or notifications", size: "A few bytes" },
    { item: "Installation status", description: "Whether the app is installed (detected, not stored)", size: "N/A" },
  ],
  notStored: [
    "Browsing history beyond cache",
    "Personal information",
    "Analytics or tracking data",
    "Cookies (third-party)",
    "Device fingerprinting",
    "Location data",
    "Contact information",
  ],
  howUpdatesWork: "The service worker checks for new versions on each app launch. When an update is available, the new assets are cached in the background. The next time you restart the app, you'll see the latest version.",
  howToUninstall: "On desktop: right-click the taskbar icon or use OS app management. On mobile: long-press the app icon and select Remove. This removes all cached data from your device.",
  howToClearCache: "Through browser settings: Settings → Privacy → Clear browsing data → Cached images and files. Alternatively, uninstall and reinstall the app for a fresh cache.",
};

export const compatibilityMatrix = {
  browsers: [
    { name: "Chrome", desktop: true, mobile: true, install: true, offline: true, notes: "Full support" },
    { name: "Edge", desktop: true, mobile: true, install: true, offline: true, notes: "Full support" },
    { name: "Safari", desktop: true, mobile: true, install: true, offline: true, notes: "Manual install on iOS" },
    { name: "Opera", desktop: true, mobile: false, install: true, offline: true, notes: "Desktop only" },
    { name: "Firefox", desktop: false, mobile: false, install: false, offline: false, notes: "PWA not supported" },
    { name: "Samsung Internet", desktop: false, mobile: true, install: true, offline: true, notes: "Android only" },
  ],
  features: [
    { name: "Installation", windows: true, macos: true, linux: true, android: true, ios: "Manual" },
    { name: "Offline browsing", windows: true, macos: true, linux: true, android: true, ios: true },
    { name: "Standalone window", windows: true, macos: true, linux: true, android: true, ios: true },
    { name: "Taskbar/Dock integration", windows: true, macos: true, linux: true, android: true, ios: false },
    { name: "Push notifications", windows: false, macos: false, linux: false, android: false, ios: false },
    { name: "Background sync", windows: false, macos: false, linux: false, android: false, ios: false },
    { name: "Auto-updates", windows: true, macos: true, linux: true, android: true, ios: true },
  ],
};
