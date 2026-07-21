import { Hero } from "@/components/hero/Hero";
import { ProductsSection } from "@/components/products/Products";
import dynamic from "next/dynamic";
import { SectionSkeleton } from "@/components/ui/Skeleton";

const AboutSection = dynamic(() => import("@/components/about/About").then((m) => ({ default: m.AboutSection })), {
  loading: () => <SectionSkeleton />,
});
const TechGridSection = dynamic(() => import("@/components/tech/TechGrid").then((m) => ({ default: m.TechGridSection })), {
  loading: () => <SectionSkeleton />,
});
const PortfolioAppSection = dynamic(() => import("@/components/portfolio-app/PortfolioAppSection").then((m) => ({ default: m.PortfolioAppSection })), {
  loading: () => <SectionSkeleton />,
});
const LockedOrganization = dynamic(() => import("@/components/ui/LockedSection").then((m) => ({ default: m.LockedSection })), {
  loading: () => <SectionSkeleton />,
});
const ExperienceSection = dynamic(() => import("@/components/experience/Experience").then((m) => ({ default: m.ExperienceSection })), {
  loading: () => <SectionSkeleton />,
});
const ProjectsSection = dynamic(() => import("@/components/projects/Projects").then((m) => ({ default: m.ProjectsSection })), {
  loading: () => <SectionSkeleton />,
});
const ContactSection = dynamic(() => import("@/components/contact/Contact").then((m) => ({ default: m.ContactSection })), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <AboutSection />
      <TechGridSection />
      <PortfolioAppSection />
      <LockedOrganization />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
