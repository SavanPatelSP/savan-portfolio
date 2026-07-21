"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Home,
  Briefcase,
  Download,
  BookOpen,
  Settings,
  Search,
  Bell,
  User,
  ChevronRight,
  ArrowUpRight,
  Wifi,
  WifiOff,
  CheckCircle2,
  Clock,
  Star,
  GitBranch,
  Shield,
  Globe,
  Smartphone,
  Monitor,
  Terminal,
  Tablet,
  Layers,
  Folder,
  FileText,
  Code2,
  Palette,
  BellRing,
  ShieldCheck,
  Keyboard,
  Info,
  ExternalLink,
  Zap,
  HardDrive,
  RefreshCw,
  Circle,
  Plus,
  Tag,
  Calendar,
  Eye,
  TrendingUp,
  ArrowRight,
  MoreHorizontal,
  Filter,
  BarChart3,
  Box,
  Cpu,
  Lock,
  Unlock,
  Moon,
  Sun,
  MonitorSmartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, NORMAL, SLOW, FAST } from "@/lib/motion";

/* ─── SHARED: AVATAR ────────────────────────────────────────── */

function Avatar({ initials, color = "from-blue-500 to-blue-600", size = "sm" }: { initials: string; color?: string; size?: "xs" | "sm" | "md" }) {
  const sizes = { xs: "h-4 w-4 text-[6px]", sm: "h-5 w-5 text-[7px]", md: "h-7 w-7 text-[9px]" };
  return (
    <div className={cn("rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-white shrink-0", sizes[size], color)}>
      {initials}
    </div>
  );
}

/* ─── SHARED: STATUS DOT ────────────────────────────────────── */

function StatusDot({ status }: { status: "online" | "offline" | "synced" | "error" }) {
  const colors = {
    online: "bg-emerald-400",
    synced: "bg-blue-400",
    offline: "bg-amber-400",
    error: "bg-red-400",
  };
  return <div className={cn("h-1.5 w-1.5 rounded-full", colors[status])} />;
}

/* ─── SHARED: BADGE ─────────────────────────────────────────── */

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "info" | "muted" }) {
  const variants = {
    default: "border-white/[0.08] bg-white/[0.04] text-white/40",
    success: "border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-400/70",
    warning: "border-amber-500/20 bg-amber-500/[0.08] text-amber-400/70",
    info: "border-blue-500/20 bg-blue-500/[0.08] text-blue-400/70",
    muted: "border-white/[0.06] bg-white/[0.02] text-white/25",
  };
  return (
    <span className={cn("inline-flex items-center rounded-md border px-1.5 py-0.5 text-[7px] font-mono", variants[variant])}>
      {children}
    </span>
  );
}

/* ─── SHARED: SIDEBAR NAV ───────────────────────────────────── */

function SidebarNav({ active }: { active: string }) {
  const items = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "downloads", label: "Installations", icon: Download },
    { id: "docs", label: "Documentation", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-[140px] shrink-0 border-r border-white/[0.06] bg-white/[0.01] flex flex-col">
      {/* Logo */}
      <div className="h-9 flex items-center px-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-[6px] font-bold text-white">SP</span>
          </div>
          <span className="text-[9px] font-medium text-white/50">Portfolio</span>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 py-2 px-1.5 space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-md text-[9px] transition-colors cursor-default",
                isActive
                  ? "text-white/70 bg-white/[0.06]"
                  : "text-white/30 hover:text-white/45 hover:bg-white/[0.03]"
              )}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="p-2 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar initials="SP" size="xs" />
          <div className="flex-1 min-w-0">
            <p className="text-[8px] font-medium text-white/50 truncate">Savan Patel</p>
            <div className="flex items-center gap-1">
              <StatusDot status="online" />
              <span className="text-[6px] text-white/20">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SHARED: TOPBAR ────────────────────────────────────────── */

function TopBar({ title, actions }: { title: string; actions?: React.ReactNode }) {
  return (
    <div className="h-9 flex items-center justify-between px-3 border-b border-white/[0.06] bg-white/[0.015]">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-medium text-white/60">{title}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {actions}
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.04]">
          <Search className="h-2.5 w-2.5 text-white/20" />
          <span className="text-[7px] text-white/15">Search...</span>
          <kbd className="text-[6px] text-white/10 border border-white/[0.06] rounded px-0.5">⌘K</kbd>
        </div>
        <div className="relative">
          <Bell className="h-3 w-3 text-white/25" />
          <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-red-400" />
        </div>
        <Avatar initials="SP" size="xs" />
      </div>
    </div>
  );
}

/* ─── SHARED: STAT CARD ─────────────────────────────────────── */

function StatCard({ label, value, change, icon: Icon }: { label: string; value: string; change?: string; icon: React.ElementType }) {
  return (
    <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-2.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[7px] text-white/25 uppercase tracking-wider">{label}</span>
        <Icon className="h-2.5 w-2.5 text-white/15" />
      </div>
      <p className="text-sm font-semibold text-white/70">{value}</p>
      {change && <p className="text-[7px] text-emerald-400/50 mt-0.5">{change}</p>}
    </div>
  );
}

/* ─── SHARED: PROJECT CARD ──────────────────────────────────── */

function ProjectCard({ name, status, tech, updated, description }: { name: string; status: string; tech: string[]; updated: string; description: string }) {
  const statusColors: Record<string, string> = {
    Active: "success",
    Published: "success",
    "In Progress": "warning",
    Planning: "info",
    Synced: "info",
  };

  return (
    <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 hover:border-white/[0.1] transition-colors">
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded bg-gradient-to-br from-blue-500/20 to-violet-500/10 flex items-center justify-center">
            <Folder className="h-2.5 w-2.5 text-blue-400/50" />
          </div>
          <span className="text-[9px] font-medium text-white/60">{name}</span>
        </div>
        <Badge variant={statusColors[status] as "success" | "warning" | "info" || "default"}>{status}</Badge>
      </div>
      <p className="text-[7px] text-white/25 mb-2 leading-relaxed line-clamp-2">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {tech.slice(0, 2).map((t) => (
            <span key={t} className="text-[6px] text-white/20 border border-white/[0.06] rounded px-1 py-0.5">{t}</span>
          ))}
        </div>
        <span className="text-[6px] text-white/15">{updated}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  PAGE: HOME                                                    */
/* ═══════════════════════════════════════════════════════════════ */

function HomeDesktop() {
  return (
    <div className="flex h-full">
      <SidebarNav active="home" />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Dashboard" />
        <div className="flex-1 p-3 overflow-hidden">
          {/* Welcome */}
          <div className="mb-3">
            <p className="text-[9px] text-white/25">Good evening,</p>
            <h3 className="text-sm font-semibold text-white/70">Savan Patel</h3>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <StatCard label="Projects" value="12" change="+2 this month" icon={Briefcase} />
            <StatCard label="Installs" value="1,247" change="+18% this week" icon={Download} />
            <StatCard label="Active" value="8" icon={Zap} />
            <StatCard label="Uptime" value="99.9%" icon={Shield} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-2">
            {/* Recent Projects (spans 2 cols) */}
            <div className="col-span-2 rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-medium text-white/50">Recent Projects</span>
                <span className="text-[7px] text-blue-400/50 cursor-pointer">View All</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { name: "SP NET GRAM", status: "Active", updated: "4 min ago", tech: ["React", "TypeScript"] },
                  { name: "SP NET ADMIN OS", status: "In Progress", updated: "2 hours ago", tech: ["Next.js", "Prisma"] },
                  { name: "SP NET AI", status: "Active", updated: "1 day ago", tech: ["Python", "TensorFlow"] },
                  { name: "Portfolio Website", status: "Published", updated: "3 days ago", tech: ["Next.js", "Tailwind"] },
                ].map((p) => (
                  <div key={p.name} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/[0.03] transition-colors">
                    <div className="h-4 w-4 rounded bg-gradient-to-br from-blue-500/20 to-violet-500/10 flex items-center justify-center shrink-0">
                      <Folder className="h-2 w-2 text-blue-400/40" />
                    </div>
                    <span className="text-[8px] font-medium text-white/50 flex-1 truncate">{p.name}</span>
                    <Badge variant={p.status === "Published" ? "success" : p.status === "In Progress" ? "warning" : "info"}>{p.status}</Badge>
                    <span className="text-[6px] text-white/15 shrink-0">{p.updated}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
              <span className="text-[9px] font-medium text-white/50 block mb-2">Activity</span>
              <div className="space-y-2">
                {[
                  { text: "SP NET GRAM build passed", time: "2m ago", color: "text-emerald-400/60" },
                  { text: "Portfolio App v1.0.0 released", time: "1h ago", color: "text-blue-400/60" },
                  { text: "SP NET AI model trained", time: "3h ago", color: "text-violet-400/60" },
                  { text: "Security scan completed", time: "5h ago", color: "text-emerald-400/60" },
                  { text: "Documentation updated", time: "1d ago", color: "text-white/30" },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={cn("h-1.5 w-1.5 rounded-full mt-1 shrink-0", a.color.replace("/60", "").replace("text-", "bg-"))} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[7px] text-white/35 leading-relaxed">{a.text}</p>
                      <p className="text-[6px] text-white/15">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              { label: "New Project", icon: Plus, desc: "Create a new project" },
              { label: "View Installs", icon: Download, desc: "Manage releases" },
              { label: "Read Docs", icon: BookOpen, desc: "Browse documentation" },
            ].map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.label} className="flex items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.015] p-2.5 hover:border-blue-500/15 transition-colors cursor-pointer">
                  <div className="h-6 w-6 rounded bg-blue-500/[0.06] border border-blue-500/10 flex items-center justify-center shrink-0">
                    <Icon className="h-3 w-3 text-blue-400/50" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[8px] font-medium text-white/50">{a.label}</p>
                    <p className="text-[6px] text-white/20">{a.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  PAGE: PROJECTS                                                */
/* ═══════════════════════════════════════════════════════════════ */

function ProjectsDesktop() {
  return (
    <div className="flex h-full">
      <SidebarNav active="projects" />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          title="Projects"
          actions={
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.04] text-[7px] text-white/30">
                <Filter className="h-2 w-2" /> Filter
              </div>
              <Plus className="h-3 w-3 text-white/25" />
            </div>
          }
        />
        <div className="flex-1 p-3 overflow-hidden">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 mb-3">
            {["All", "Active", "Published", "Archived"].map((tab, i) => (
              <button
                key={tab}
                className={cn(
                  "px-2 py-1 rounded-md text-[8px] font-medium transition-colors",
                  i === 0 ? "text-white/60 bg-white/[0.06]" : "text-white/25 hover:text-white/40"
                )}
              >
                {tab}
              </button>
            ))}
            <span className="text-[7px] text-white/15 ml-auto">12 projects</span>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "SP NET GRAM", status: "Active", tech: ["React", "TypeScript", "WebSocket"], updated: "4 min ago", desc: "Real-time messaging platform with end-to-end encryption and media sharing" },
              { name: "SP NET ADMIN OS", status: "In Progress", tech: ["Next.js", "Prisma", "PostgreSQL"], updated: "2 hours ago", desc: "Enterprise administration dashboard with role-based access control" },
              { name: "SP NET AI", status: "Active", tech: ["Python", "TensorFlow", "FastAPI"], updated: "1 day ago", desc: "Machine learning platform for natural language processing and vision" },
              { name: "SP NET Cloud", status: "Published", tech: ["Go", "Docker", "Kubernetes"], updated: "3 days ago", desc: "Cloud infrastructure management with automated scaling and monitoring" },
              { name: "SP NET Security", status: "Active", tech: ["Rust", "C", "Assembly"], updated: "5 days ago", desc: "Security auditing toolkit with vulnerability scanning and reporting" },
              { name: "Portfolio Website", status: "Published", tech: ["Next.js", "Tailwind", "Framer"], updated: "1 week ago", desc: "Personal portfolio and documentation hub built with modern web stack" },
            ].map((p) => (
              <ProjectCard key={p.name} {...p} description={p.desc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  PAGE: DOWNLOADS                                               */
/* ═══════════════════════════════════════════════════════════════ */

function DownloadsDesktop() {
  return (
    <div className="flex h-full">
      <SidebarNav active="downloads" />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Installations" />
        <div className="flex-1 p-3 overflow-hidden">
          {/* Hero Download Card */}
          <div className="rounded-lg border border-blue-500/15 bg-blue-500/[0.03] p-3 mb-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-[7px] font-bold text-white">SP</span>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-semibold text-white/70">Portfolio App</h3>
                    <p className="text-[7px] text-white/25">The flagship installable web application</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="success">Stable</Badge>
                  <Badge variant="info">v1.0.0</Badge>
                  <span className="text-[7px] text-white/20">Build 2026.07.17</span>
                </div>
              </div>
              <div className="h-7 px-3 rounded-md bg-white text-black text-[8px] font-medium flex items-center gap-1 cursor-pointer">
                <Download className="h-2.5 w-2.5" /> Install
              </div>
            </div>
          </div>

          {/* Platforms */}
          <div className="mb-3">
            <span className="text-[8px] font-medium text-white/40 block mb-1.5">Supported Platforms</span>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { name: "Windows", icon: Monitor, status: "Full" },
                { name: "macOS", icon: Monitor, status: "Full" },
                { name: "Linux", icon: Terminal, status: "Full" },
                { name: "Android", icon: Smartphone, status: "Full" },
                { name: "iOS", icon: Smartphone, status: "Guided" },
                { name: "iPadOS", icon: Tablet, status: "Guided" },
                { name: "ChromeOS", icon: Globe, status: "Full" },
                { name: "Browser", icon: Globe, status: "Direct" },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.name} className="flex items-center gap-1.5 rounded border border-white/[0.05] bg-white/[0.02] px-2 py-1.5">
                    <Icon className="h-2.5 w-2.5 text-white/25" />
                    <span className="text-[7px] text-white/40 flex-1">{p.name}</span>
                    <span className={cn("text-[6px] font-mono", p.status === "Full" ? "text-emerald-400/50" : "text-amber-400/50")}>{p.status}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Version History */}
          <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
            <span className="text-[8px] font-medium text-white/40 block mb-2">Release History</span>
            <div className="space-y-2">
              {[
                { version: "v1.0.0", date: "2026", type: "major", notes: "Initial release with PWA support, offline access, cross-platform installation" },
              ].map((r) => (
                <div key={r.version} className="flex items-start gap-2 pb-2 border-b border-white/[0.04] last:border-0 last:pb-0">
                  <div className="h-4 w-4 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Tag className="h-2 w-2 text-blue-400/50" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-medium text-white/50">{r.version}</span>
                      <Badge variant={r.type === "major" ? "info" : "default"}>{r.type}</Badge>
                      <span className="text-[6px] text-white/15">{r.date}</span>
                    </div>
                    <p className="text-[7px] text-white/25 mt-0.5">{r.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  PAGE: DOCUMENTATION                                           */
/* ═══════════════════════════════════════════════════════════════ */

function DocsDesktop() {
  return (
    <div className="flex h-full">
      <SidebarNav active="docs" />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Documentation" />
        <div className="flex-1 flex min-w-0">
          {/* Docs Sidebar */}
          <div className="w-[120px] shrink-0 border-r border-white/[0.06] bg-white/[0.01] p-2 overflow-hidden">
            <div className="mb-2">
              <span className="text-[6px] font-mono uppercase tracking-wider text-white/15">Getting Started</span>
              <div className="mt-1 space-y-0.5">
                {["Introduction", "Installation", "Quick Start"].map((item, i) => (
                  <div key={item} className={cn("px-2 py-1 rounded text-[7px] cursor-default", i === 1 ? "text-white/60 bg-white/[0.06]" : "text-white/30 hover:text-white/45")}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <span className="text-[6px] font-mono uppercase tracking-wider text-white/15">Guides</span>
              <div className="mt-1 space-y-0.5">
                {["Platform Support", "Offline Mode", "Privacy", "Updates"].map((item) => (
                  <div key={item} className="px-2 py-1 rounded text-[7px] text-white/30 hover:text-white/45 cursor-default">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[6px] font-mono uppercase tracking-wider text-white/15">Reference</span>
              <div className="mt-1 space-y-0.5">
                {["Release Notes", "FAQ", "API"].map((item) => (
                  <div key={item} className="px-2 py-1 rounded text-[7px] text-white/30 hover:text-white/45 cursor-default">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="flex-1 p-3 overflow-hidden">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1 mb-3 text-[7px] text-white/20">
              <span>Docs</span>
              <ChevronRight className="h-2 w-2" />
              <span>Getting Started</span>
              <ChevronRight className="h-2 w-2" />
              <span className="text-white/40">Installation</span>
            </div>

            <h2 className="text-sm font-semibold text-white/70 mb-1">Installation Guide</h2>
            <p className="text-[8px] text-white/30 mb-3 leading-relaxed">
              Install the Portfolio App on your device. The app is a Progressive Web App (PWA) that can be installed directly from your browser.
            </p>

            {/* Code Snippet */}
            <div className="rounded-lg bg-black/40 border border-white/[0.06] p-2.5 mb-3 font-mono">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#ff5f56]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#ffbd2e]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#27c93f]" />
                <span className="text-[6px] text-white/15 ml-1">terminal</span>
              </div>
              <p className="text-[7px] text-emerald-400/60">$ npm install portfolio-app</p>
              <p className="text-[7px] text-white/25 mt-0.5">added 42 packages in 2.1s</p>
            </div>

            {/* Steps */}
            <div className="space-y-2">
              {[
                { step: 1, title: "Open in Browser", desc: "Navigate to savan.sp-net.in in Chrome, Edge, or Safari." },
                { step: 2, title: "Click Install", desc: "Look for the install icon in the address bar and click it." },
                { step: 3, title: "Confirm Installation", desc: "Click 'Install' in the confirmation dialog." },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-2">
                  <div className="h-4 w-4 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[7px] font-mono text-blue-400/60">{s.step}</span>
                  </div>
                  <div>
                    <p className="text-[8px] font-medium text-white/50">{s.title}</p>
                    <p className="text-[7px] text-white/25">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table of Contents */}
          <div className="w-[100px] shrink-0 border-l border-white/[0.06] bg-white/[0.01] p-2">
            <span className="text-[6px] font-mono uppercase tracking-wider text-white/15 block mb-2">On This Page</span>
            <div className="space-y-1">
              {["Overview", "Requirements", "Desktop Install", "Mobile Install", "Troubleshooting"].map((item, i) => (
                <div key={item} className={cn("text-[7px] cursor-default", i === 0 ? "text-white/50" : "text-white/25 hover:text-white/40")}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  PAGE: OFFLINE MODE                                            */
/* ═══════════════════════════════════════════════════════════════ */

function OfflineDesktop() {
  return (
    <div className="flex h-full">
      <SidebarNav active="home" />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          title="Offline Status"
          actions={
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/[0.08] border border-emerald-500/15">
                <Wifi className="h-2 w-2 text-emerald-400/60" />
                <span className="text-[7px] text-emerald-400/60">Online</span>
              </div>
            </div>
          }
        />
        <div className="flex-1 p-3 overflow-hidden">
          {/* Status Overview */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <StatCard label="Cached Pages" value="24" icon={Layers} />
            <StatCard label="Storage Used" value="8.2 MB" icon={HardDrive} />
            <StatCard label="Last Sync" value="2 min ago" icon={RefreshCw} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Cached Content */}
            <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
              <span className="text-[8px] font-medium text-white/40 block mb-2">Cached Content</span>
              <div className="space-y-1">
                {[
                  { page: "Homepage", size: "1.2 MB", status: "cached" },
                  { page: "Projects", size: "0.8 MB", status: "cached" },
                  { page: "Installations", size: "1.5 MB", status: "cached" },
                  { page: "Documentation", size: "2.1 MB", status: "cached" },
                  { page: "Release Notes", size: "0.4 MB", status: "cached" },
                  { page: "Platform Support", size: "0.6 MB", status: "cached" },
                  { page: "Privacy Policy", size: "0.2 MB", status: "cached" },
                  { page: "FAQ", size: "0.3 MB", status: "cached" },
                ].map((c) => (
                  <div key={c.page} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/[0.03] transition-colors">
                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400/50 shrink-0" />
                    <span className="text-[7px] text-white/40 flex-1">{c.page}</span>
                    <span className="text-[6px] text-white/20">{c.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage & Sync */}
            <div className="space-y-2">
              <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
                <span className="text-[8px] font-medium text-white/40 block mb-2">Storage Usage</span>
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div className="h-full w-[35%] bg-gradient-to-r from-blue-500/40 to-blue-400/30 rounded-full" />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[6px] text-white/20">8.2 MB used</span>
                  <span className="text-[6px] text-white/20">~15 MB total</span>
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
                <span className="text-[8px] font-medium text-white/40 block mb-2">Sync Status</span>
                <div className="space-y-1.5">
                  {[
                    { label: "Assets", status: "Synced", time: "2 min ago" },
                    { label: "Content", status: "Synced", time: "5 min ago" },
                    { label: "Preferences", status: "Synced", time: "1 min ago" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <CheckCircle2 className="h-2 w-2 text-emerald-400/50 shrink-0" />
                      <span className="text-[7px] text-white/40 flex-1">{s.label}</span>
                      <span className="text-[6px] text-white/20">{s.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
                <span className="text-[8px] font-medium text-white/40 block mb-1.5">Pending Updates</span>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-amber-500/[0.06] border border-amber-500/10">
                  <Clock className="h-2.5 w-2.5 text-amber-400/50 shrink-0" />
                  <span className="text-[7px] text-amber-400/50">1 update available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  PAGE: SETTINGS                                                */
/* ═══════════════════════════════════════════════════════════════ */

function SettingsDesktop() {
  return (
    <div className="flex h-full">
      <SidebarNav active="settings" />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Settings" />
        <div className="flex-1 p-3 overflow-hidden">
          <div className="grid grid-cols-4 gap-3">
            {/* Settings Sidebar */}
            <div className="space-y-0.5">
              {[
                { label: "Appearance", icon: Palette, active: true },
                { label: "Profile", icon: User },
                { label: "Notifications", icon: BellRing },
                { label: "Security", icon: ShieldCheck },
                { label: "Keyboard", icon: Keyboard },
                { label: "About", icon: Info },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1.5 rounded-md text-[8px] cursor-default transition-colors",
                      item.active ? "text-white/60 bg-white/[0.06]" : "text-white/30 hover:text-white/45 hover:bg-white/[0.03]"
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {item.label}
                  </div>
                );
              })}
            </div>

            {/* Settings Content */}
            <div className="col-span-3 space-y-3">
              {/* Appearance */}
              <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
                <span className="text-[9px] font-medium text-white/50 block mb-2">Appearance</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Moon className="h-3 w-3 text-white/30" />
                      <span className="text-[8px] text-white/40">Theme</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="px-2 py-0.5 rounded bg-white/[0.06] text-[7px] text-white/50">Dark</div>
                      <div className="px-2 py-0.5 rounded text-[7px] text-white/25">Light</div>
                      <div className="px-2 py-0.5 rounded text-[7px] text-white/25">System</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Palette className="h-3 w-3 text-white/30" />
                      <span className="text-[8px] text-white/40">Accent Color</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {["bg-blue-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500"].map((c, i) => (
                        <div key={c} className={cn("h-3 w-3 rounded-full", c, i === 0 ? "ring-1 ring-white/30 ring-offset-1 ring-offset-[#0a0a0a]" : "opacity-40")} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MonitorSmartphone className="h-3 w-3 text-white/30" />
                      <span className="text-[8px] text-white/40">Compact Mode</span>
                    </div>
                    <div className="h-3.5 w-6 rounded-full bg-blue-500/30 border border-blue-500/20 relative">
                      <div className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-white/80" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile */}
              <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
                <span className="text-[9px] font-medium text-white/50 block mb-2">Profile</span>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar initials="SP" size="md" />
                  <div>
                    <p className="text-[9px] font-medium text-white/60">Savan Patel</p>
                    <p className="text-[7px] text-white/25">savan@sp-net.in</p>
                  </div>
                  <Badge variant="success">Verified</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded border border-white/[0.04] bg-white/[0.02] px-2 py-1.5">
                    <span className="text-[6px] text-white/20 block">Role</span>
                    <span className="text-[8px] text-white/50">Developer</span>
                  </div>
                  <div className="rounded border border-white/[0.04] bg-white/[0.02] px-2 py-1.5">
                    <span className="text-[6px] text-white/20 block">Joined</span>
                    <span className="text-[8px] text-white/50">January 2026</span>
                  </div>
                </div>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
                <span className="text-[9px] font-medium text-white/50 block mb-2">Keyboard Shortcuts</span>
                <div className="space-y-1">
                  {[
                    { keys: "⌘ + K", action: "Quick Search" },
                    { keys: "⌘ + /", action: "Toggle Sidebar" },
                    { keys: "⌘ + ,", action: "Open Settings" },
                    { keys: "⌘ + Shift + D", action: "Go to Installations" },
                  ].map((s) => (
                    <div key={s.action} className="flex items-center justify-between px-2 py-1 rounded hover:bg-white/[0.03]">
                      <span className="text-[7px] text-white/35">{s.action}</span>
                      <kbd className="text-[6px] text-white/25 border border-white/[0.08] rounded px-1 py-0.5 font-mono bg-white/[0.02]">{s.keys}</kbd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  TABLET LAYOUTS                                                */
/* ═══════════════════════════════════════════════════════════════ */

function TabletNav({ active }: { active: string }) {
  const items = [
    { id: "home", icon: Home },
    { id: "projects", icon: Briefcase },
    { id: "downloads", icon: Download },
    { id: "docs", icon: BookOpen },
    { id: "settings", icon: Settings },
  ];
  return (
    <div className="h-10 flex items-center justify-around border-b border-white/[0.06] bg-white/[0.015] px-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className={cn("flex flex-col items-center gap-0.5 px-2 py-1", item.id === active ? "text-blue-400/60" : "text-white/25")}>
            <Icon className="h-3 w-3" />
          </div>
        );
      })}
    </div>
  );
}

function HomeTablet() {
  return (
    <div className="flex flex-col h-full">
      <TabletNav active="home" />
      <div className="flex-1 p-3 overflow-hidden">
        <div className="mb-2">
          <p className="text-[8px] text-white/25">Good evening,</p>
          <h3 className="text-xs font-semibold text-white/70">Savan Patel</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <StatCard label="Projects" value="12" icon={Briefcase} />
          <StatCard label="Installs" value="1,247" icon={Download} />
        </div>
        <div className="space-y-1.5">
          {["SP NET GRAM", "SP NET ADMIN OS", "SP NET AI", "Portfolio Website"].map((name) => (
            <div key={name} className="flex items-center gap-2 px-2 py-1.5 rounded border border-white/[0.05] bg-white/[0.02]">
              <Folder className="h-3 w-3 text-blue-400/40" />
              <span className="text-[8px] text-white/50 flex-1">{name}</span>
              <Badge variant="info">Active</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  PHONE LAYOUTS                                                 */
/* ═══════════════════════════════════════════════════════════════ */

function PhoneBottomNav({ active }: { active: string }) {
  const items = [
    { id: "home", icon: Home },
    { id: "projects", icon: Briefcase },
    { id: "downloads", icon: Download },
    { id: "settings", icon: Settings },
  ];
  return (
    <div className="h-10 flex items-center justify-around border-t border-white/[0.06] bg-white/[0.02] px-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className={cn("flex flex-col items-center gap-0.5", item.id === active ? "text-blue-400/60" : "text-white/25")}>
            <Icon className="h-3 w-3" />
          </div>
        );
      })}
    </div>
  );
}

function HomePhone() {
  return (
    <div className="flex flex-col h-full">
      <div className="h-9 flex items-center justify-between px-3 border-b border-white/[0.06]">
        <span className="text-[9px] font-medium text-white/60">Home</span>
        <div className="flex items-center gap-2">
          <Bell className="h-3 w-3 text-white/25" />
          <Avatar initials="SP" size="xs" />
        </div>
      </div>
      <div className="flex-1 p-3 overflow-hidden">
        <div className="mb-2">
          <p className="text-[7px] text-white/25">Good evening,</p>
          <h3 className="text-[10px] font-semibold text-white/70">Savan</h3>
        </div>
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          <StatCard label="Projects" value="12" icon={Briefcase} />
          <StatCard label="Installs" value="1.2k" icon={Download} />
        </div>
        <div className="space-y-1">
          {["SP NET GRAM", "SP NET ADMIN OS", "Portfolio"].map((name) => (
            <div key={name} className="flex items-center gap-2 px-2 py-1.5 rounded border border-white/[0.05] bg-white/[0.02]">
              <Folder className="h-2.5 w-2.5 text-blue-400/40" />
              <span className="text-[7px] text-white/50 flex-1">{name}</span>
              <Badge variant="info">Active</Badge>
            </div>
          ))}
        </div>
      </div>
      <PhoneBottomNav active="home" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  LANDSCAPE PHONE LAYOUT                                        */
/* ═══════════════════════════════════════════════════════════════ */

function LandscapePhone() {
  return (
    <div className="flex h-full">
      <div className="w-12 border-r border-white/[0.06] bg-white/[0.01] flex flex-col items-center py-2 gap-2">
        {[Home, Briefcase, Download, Settings].map((Icon, i) => (
          <div key={i} className={cn("p-1.5 rounded", i === 0 ? "text-blue-400/60 bg-blue-500/[0.06]" : "text-white/25")}>
            <Icon className="h-3 w-3" />
          </div>
        ))}
      </div>
      <div className="flex-1 p-2 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[8px] font-medium text-white/60">Dashboard</span>
          <Avatar initials="SP" size="xs" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <StatCard label="Projects" value="12" icon={Briefcase} />
          <StatCard label="Installs" value="1.2k" icon={Download} />
          <StatCard label="Uptime" value="99.9%" icon={Shield} />
        </div>
      </div>
    </div>
  );
}

/* ─── DESKTOP WINDOW FRAME (PREMIUM) ─────────────────────────── */

function MacWindowFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden",
        "border border-white/[0.08]",
        "shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5),0_2px_12px_-2px_rgba(0,0,0,0.3)]",
        className
      )}
      style={{
        background: "linear-gradient(180deg, rgba(28,28,30,0.98) 0%, rgba(18,18,20,1) 100%)",
      }}
    >
      {/* Title Bar with Glass Effect */}
      <div
        className="relative flex items-center h-8 px-3 border-b border-white/[0.06]"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        {/* Traffic Lights */}
        <div className="flex items-center gap-1.5 mr-3 shrink-0">
          <div className="group/traffic relative h-2.5 w-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] cursor-default">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/traffic:opacity-100 transition-opacity">
              <span className="text-[5px] text-[#4a0002] font-bold leading-none">x</span>
            </div>
          </div>
          <div className="group/traffic relative h-2.5 w-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] cursor-default">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/traffic:opacity-100 transition-opacity">
              <span className="text-[5px] text-[#5a3b00] font-bold leading-none">-</span>
            </div>
          </div>
          <div className="group/traffic relative h-2.5 w-2.5 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] cursor-default">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/traffic:opacity-100 transition-opacity">
              <span className="text-[5px] text-[#0a4a00] font-bold leading-none">+</span>
            </div>
          </div>
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="flex items-center gap-1.5 px-3 py-[3px] rounded-md max-w-[220px] w-full"
            style={{
              background: "rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <Lock className="h-2 w-2 text-emerald-400/40 shrink-0" />
            <span className="text-[7px] text-white/30 font-mono truncate">savan.sp-net.in</span>
          </div>
        </div>

        {/* Right spacer to balance traffic lights */}
        <div className="w-10 shrink-0" />
      </div>

      {/* Content */}
      <div className="relative" style={{ minHeight: 360 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── PAGE VARIANTS ─────────────────────────────────────────── */

const desktopPages: Record<string, React.ComponentType> = {
  home: HomeDesktop,
  projects: ProjectsDesktop,
  downloads: DownloadsDesktop,
  docs: DocsDesktop,
  offline: OfflineDesktop,
  settings: SettingsDesktop,
  install: HomeDesktop,
};

const tabletPages: Record<string, React.ComponentType> = {
  home: HomeTablet,
  projects: HomeTablet,
  downloads: HomeTablet,
  docs: HomeTablet,
  offline: HomeTablet,
  settings: HomeTablet,
  install: HomeTablet,
};

/* ─── MAIN COMPONENT ────────────────────────────────────────── */

export function ApplicationPreview({
  className,
  activeTab = "home",
  variant = "hero",
}: {
  className?: string;
  activeTab?: string;
  variant?: "hero" | "full";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const PageContent = desktopPages[activeTab] || HomeDesktop;

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: SLOW, delay: 0.2, ease: ease.out }}
    >
      {/* Ambient glow behind window */}
      <div className="absolute -inset-8 bg-gradient-to-b from-blue-500/[0.06] via-blue-500/[0.02] to-transparent rounded-3xl blur-2xl pointer-events-none" />
      {/* Window frame with premium styling */}
      <div className="relative">
        <MacWindowFrame>
          <PageContent />
        </MacWindowFrame>
      </div>
      {/* Floor reflection */}
      <div className="absolute -bottom-8 left-[10%] right-[10%] h-16 bg-gradient-to-b from-white/[0.02] to-transparent rounded-full blur-xl pointer-events-none" />
    </motion.div>
  );
}

export { MacWindowFrame, desktopPages, tabletPages, HomeDesktop, HomeTablet, HomePhone, LandscapePhone };
