"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ChevronDown,
  Users,
  Building2,
  Shield,
  HeadphonesIcon,
  Briefcase,
  Crown,
  UserPlus,
  HardDrive,
  Monitor,
  Network,
  CircuitBoard,
  Cpu,
} from "lucide-react";
import { SectionContainer, SectionTitle } from "@/components/ui/AnimationPrimitives";
import { ParticleField } from "@/components/ui/ParticleField";
import { organizationCategories } from "@/data/organization";
import { cn } from "@/lib/utils";

/* ─── BACKGROUND ───────────────────────────────────────────────── */

function OsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full opacity-[0.08] blur-[120px]" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full opacity-[0.06] blur-[100px]" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)" }} />
      <div className="absolute top-1/4 left-0 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)", animation: "light-streak 8s ease-in-out infinite" }} />
      <div className="absolute top-2/3 left-0 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.35), transparent)", animation: "light-streak 12s ease-in-out 4s infinite" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)" }} />
    </div>
  );
}

/* ─── TYPES & CONFIG ──────────────────────────────────────────── */

type Level = 0 | 1 | 2 | 3;

const levelCfg = {
  0: { dot: "border-blue-400/80", dotBg: "bg-blue-500/30", text: "text-blue-200", dotGlow: "rgba(59,130,246,0.5) 0 0 40px, rgba(59,130,246,0.25) 0 0 80px", icon: "text-blue-300" },
  1: { dot: "border-blue-400/60", dotBg: "bg-blue-500/20", text: "text-blue-300", dotGlow: "rgba(59,130,246,0.35) 0 0 30px, rgba(59,130,246,0.15) 0 0 60px", icon: "text-blue-400" },
  2: { dot: "border-blue-400/40", dotBg: "bg-blue-500/10", text: "text-blue-300/80", dotGlow: "rgba(59,130,246,0.2) 0 0 20px, rgba(59,130,246,0.08) 0 0 40px", icon: "text-blue-400/60" },
  3: { dot: "border-blue-400/25", dotBg: "bg-blue-500/[0.06]", text: "text-blue-300/60", dotGlow: "rgba(59,130,246,0.08) 0 0 12px", icon: "text-blue-400/40" },
};

const lvlLabel = ["FOUNDER", "EXECUTIVE", "DEPARTMENT", "DETAIL"];

const catIcons: Record<string, React.ElementType> = {
  Executive: Crown, Engineering: Cpu, Product: Briefcase, Community: HeadphonesIcon,
  Support: HeadphonesIcon, "Moderation & Trust": Shield, Administration: Shield, Business: Building2,
};

/* ─── TREE NODE ────────────────────────────────────────────────── */

interface TNode { name: string; level: Level; icon?: React.ElementType; children?: TNode[]; }

function TreeNode({ name, level, icon: Icon, children, idx, visible }: { name: string; level: Level; icon?: React.ElementType; children?: TNode[]; idx: number; visible: boolean }) {
  const [open, setOpen] = useState(level < 2);
  const hasKids = !!(children && children.length);
  const cfg = levelCfg[level];
  const cat = level === 3 ? organizationCategories.find((c) => c.name === name) : null;
  const DIcon = cat ? catIcons[cat.name] || Building2 : null;

  return (
    <motion.div className="relative" initial={{ opacity: 0, y: 8 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: idx * 0.04, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
      <div className={cn("relative flex items-start gap-3", level === 0 ? "py-2" : "py-1")}>
        <div className="flex flex-col items-center shrink-0 pt-1.5">
          <div className={cn("relative flex items-center justify-center rounded-full border-2", level === 0 ? "h-5 w-5" : level === 1 ? "h-4 w-4" : "h-3 w-3", cfg.dot)} style={{ backgroundColor: cfg.dotBg, boxShadow: level <= 2 ? cfg.dotGlow : "none" }}>
            {level <= 1 && <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: level === 0 ? "rgba(59,130,246,0.5)" : "rgba(59,130,246,0.25)", animationDuration: level === 0 ? "2.5s" : "3.5s" }} />}
            {level === 0 && Icon && <Icon className="h-2.5 w-2.5 text-blue-300" />}
          </div>
          {hasKids && <div className="w-px h-6 sm:h-7" style={{ background: `linear-gradient(to bottom, rgba(59,130,246,${level <= 1 ? 0.4 : level === 2 ? 0.2 : 0.1}), transparent)` }} />}
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <button onClick={() => setOpen(!open)} className={cn("group relative w-full text-left flex items-center gap-2 sm:gap-2.5", level <= 1 ? "rounded-xl border px-3 sm:px-4 py-3 sm:py-3.5" : "py-1.5 px-1")}
            style={level <= 1 ? { borderColor: "rgba(59,130,246,0.2)", backgroundColor: "rgba(59,130,246,0.04)" } : undefined}
            onMouseEnter={(e) => { if (level <= 1) { e.currentTarget.style.borderColor = `rgba(59,130,246,${level === 0 ? 0.6 : 0.4})`; e.currentTarget.style.backgroundColor = `rgba(59,130,246,${level === 0 ? 0.15 : 0.08})`; e.currentTarget.style.boxShadow = `0 0 ${level === 0 ? "40px" : "25px"} rgba(59,130,246,${level === 0 ? 0.25 : 0.12})`; } }}
            onMouseLeave={(e) => { if (level <= 1) { e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)"; e.currentTarget.style.backgroundColor = "rgba(59,130,246,0.04)"; e.currentTarget.style.boxShadow = "none"; } }}
            aria-expanded={open}
          >
            {Icon && level > 0 && <Icon className={cn("h-3.5 w-3.5 shrink-0", cfg.icon, level <= 1 && "group-hover:text-blue-300")} />}
            <span className={cn("text-xs sm:text-sm font-medium", cfg.text, level <= 1 && "group-hover:text-blue-200")}>{name}</span>
            <span className={cn("font-mono text-[9px] tracking-[0.15em] px-1.5 py-0.5 rounded shrink-0",
              level === 0 && "text-blue-400/80 bg-blue-500/15 border border-blue-500/30",
              level === 1 && "text-blue-400/60 bg-blue-500/10 border border-blue-500/20",
              level === 2 && "text-blue-400/40 bg-blue-500/[0.06] border border-blue-500/15",
              level === 3 && "text-blue-400/30 bg-blue-500/[0.04] border border-blue-500/[0.08]",
            )}>{lvlLabel[level]}</span>
            {level <= 3 && (
              <motion.div animate={{ rotate: open ? 0 : -90 }} transition={{ duration: 0.2 }} className="ml-auto">
                <ChevronDown className={cn("h-3 w-3 shrink-0", level <= 1 ? "text-blue-400/60" : level === 2 ? "text-blue-400/40" : "text-blue-400/30")} />
              </motion.div>
            )}
          </button>

          {hasKids && level < 2 && (
            <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <div className="ml-0 mt-0.5">{children!.map((ch, i) => <TreeNode key={ch.name} name={ch.name} level={ch.level} icon={ch.icon} children={ch.children} idx={idx + i + 1} visible={visible} />)}</div>
            </motion.div>
          )}

          {level === 3 && cat && open && (
            <div className="ml-[52px] pb-3">
              <div className="rounded-xl border p-4 sm:p-5" style={{ borderColor: "rgba(59,130,246,0.25)", background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(0,0,0,0.45) 100%)", boxShadow: "0 0 50px rgba(59,130,246,0.08), inset 0 0 50px rgba(59,130,246,0.03)" }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0" style={{ border: "1px solid rgba(59,130,246,0.3)", backgroundColor: "rgba(59,130,246,0.12)" }}>
                    {DIcon && <DIcon className="h-4 w-4 text-blue-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-blue-200">{cat.name}</h4>
                      <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded text-[10px] font-mono" style={{ backgroundColor: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.2)", color: "rgba(147,197,253,0.9)" }}>{cat.roles.length}</span>
                    </div>
                    <p className="text-xs text-blue-300/60 leading-relaxed">{cat.description}</p>
                  </div>
                </div>
                <div className="h-px mb-3" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.25), rgba(59,130,246,0.4), transparent)" }} />
                <div className="flex flex-wrap gap-1.5">
                  {cat.roles.map((role) => (
                    <span key={role} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs" style={{ border: "1px solid rgba(59,130,246,0.18)", backgroundColor: "rgba(59,130,246,0.06)", color: "rgba(147,197,253,0.65)", transition: "all 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(59,130,246,0.15)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"; e.currentTarget.style.color = "rgba(191,219,254,0.9)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(59,130,246,0.06)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.18)"; e.currentTarget.style.color = "rgba(147,197,253,0.65)"; }}
                    >
                      <UserPlus className="h-2.5 w-2.5 shrink-0" style={{ color: "rgba(59,130,246,0.6)" }} />
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── ROLE CARD ────────────────────────────────────────────────── */

function RoleCard({ cat, idx, visible }: { cat: typeof organizationCategories[number]; idx: number; visible: boolean }) {
  const [open, setOpen] = useState(false);
  const Icon = catIcons[cat.name] || Building2;

  return (
    <motion.div className="group" initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: idx * 0.07, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
      <div className={cn("relative rounded-2xl border backdrop-blur-sm", open ? "border-blue-500/35" : "border-blue-500/15 group-hover:border-blue-500/25")}
        style={{ transition: "border-color 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease", backgroundColor: open ? "rgba(59,130,246,0.04)" : "rgba(59,130,246,0.02)" }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 50px rgba(59,130,246,0.1)"; e.currentTarget.style.backgroundColor = "rgba(59,130,246,0.05)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = open ? "rgba(59,130,246,0.04)" : "rgba(59,130,246,0.02)"; }}
      >
        <div className="absolute top-0 inset-x-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-400/60 via-blue-400/25 to-transparent" />
        <button onClick={() => setOpen(!open)} className="w-full text-left p-4 sm:p-5" aria-expanded={open}>
          <div className="flex items-center gap-3">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl border", open ? "border-blue-400/30 bg-blue-500/12" : "border-blue-400/20 bg-blue-500/[0.04] group-hover:border-blue-400/25")}>
              <Icon className={cn("h-4 w-4", open ? "text-blue-400" : "text-blue-400/50 group-hover:text-blue-400/70")} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={cn("text-sm font-medium", open ? "text-blue-200" : "text-blue-300/80 group-hover:text-blue-300")}>{cat.name}</h3>
                <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-md bg-blue-500/10 border border-blue-500/15 text-[10px] font-mono text-blue-400/60">{cat.roles.length}</span>
              </div>
              <p className="text-[11px] text-blue-300/35 leading-relaxed mt-0.5 line-clamp-1">{cat.description}</p>
            </div>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className={cn("h-3.5 w-3.5", open ? "text-blue-400/60" : "text-blue-400/35 group-hover:text-blue-400/55")} />
            </motion.div>
          </div>
          <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0, marginTop: open ? 12 : 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="pt-3 border-t border-blue-500/15 flex flex-wrap gap-1.5">
              {cat.roles.map((role) => (
                <span key={role} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-blue-500/15 bg-blue-500/[0.04] text-[11px] text-blue-300/50 hover:text-blue-300/70 hover:bg-blue-500/10 hover:border-blue-500/25 transition-all duration-200">
                  <UserPlus className="h-2.5 w-2.5 text-blue-400/50" />
                  {role}
                </span>
              ))}
            </div>
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
}

/* ─── MAIN ─────────────────────────────────────────────────────── */

const deptIcon: Record<string, React.ElementType> = {
  Engineering: Cpu, Product: Briefcase, Community: HeadphonesIcon, Support: HeadphonesIcon,
  "Moderation & Trust": Shield, Administration: Shield, Business: Building2,
};

const tree: TNode[] = [{
  name: "Founder & CEO", level: 0, icon: Crown, children: [{
    name: "Executive Leadership", level: 1, icon: Users, children: [{
      name: "Departments", level: 2, icon: HardDrive, children: organizationCategories.map((c) => ({ name: c.name, level: 3 as Level, icon: deptIcon[c.name] || Building2 })),
    }],
  }],
}];

export function OrganizationSection() {
  const treeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const treeVis = useInView(treeRef, { once: true, amount: 0.05 });
  const cardsVis = useInView(cardsRef, { once: true, amount: 0.05 });

  return (
    <SectionContainer id="organization" className="bg-black relative overflow-hidden">
      <OsBackground />
      <ParticleField count={45} connectionDistance={140} speed={0.15} />
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

      <div className="relative z-[2]">
        <SectionTitle label="Organization" title="Company hierarchy" subtitle="SP NET ADMIN OS is built for real organizations—from startups to enterprise. Expand any department to see roles." />

        <div ref={treeRef} className="max-w-2xl mx-auto rounded-2xl" style={{ border: "1px solid rgba(59,130,246,0.15)", background: "linear-gradient(180deg, rgba(59,130,246,0.04) 0%, rgba(0,0,0,0.5) 100%)", boxShadow: "0 0 80px rgba(59,130,246,0.05)" }}>
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-blue-500/15">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex items-center gap-1.5 shrink-0"><span className="h-2.5 w-2.5 rounded-full bg-blue-400/30" /><span className="h-2.5 w-2.5 rounded-full bg-blue-400/30" /><span className="h-2.5 w-2.5 rounded-full bg-blue-400/30" /></div>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-blue-400/60 truncate">{'//'} organization-tree — SP NET ADMIN OS v1.0</span>
            </div>
            <CircuitBoard className="h-3 w-3 text-blue-400/60 shrink-0" />
          </div>
          <div className="p-5 sm:p-6">
            {tree.map((n, i) => <TreeNode key={n.name} name={n.name} level={n.level} icon={n.icon} children={n.children} idx={i} visible={treeVis} />)}
          </div>
        </div>

        <div ref={cardsRef} className="mt-12 sm:mt-16">
          <div className="mb-4 sm:mb-6 flex items-center gap-3 justify-center lg:justify-start">
            <div className="h-px flex-1 bg-gradient-to-r from-blue-400/25 via-blue-400/40 to-blue-400/25" />
            <Monitor className="h-3.5 w-3.5 text-blue-400/60 shrink-0" />
            <span className="text-[10px] font-mono tracking-wider text-blue-400/60">ROLE CATALOG</span>
            <Network className="h-3.5 w-3.5 text-blue-400/60 shrink-0" />
            <div className="h-px flex-1 bg-gradient-to-r from-blue-400/25 via-blue-400/40 to-blue-400/25" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto lg:max-w-none">
            {organizationCategories.map((c, i) => <RoleCard key={c.name} cat={c} idx={i} visible={cardsVis} />)}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/25 to-transparent" />
    </SectionContainer>
  );
}