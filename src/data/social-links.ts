import { personal } from "@/data/personal";
import { GithubIcon, XIcon, LinkedinIcon, InstagramIcon, TelegramIcon } from "@/components/ui/Icons";

export interface SocialLink {
  title: string;
  username: string | null;
  href: string;
  icon: typeof GithubIcon;
  color: string;
  borderColor: string;
  hoverBorder: string;
  modal?: true;
}

export const socialLinks: SocialLink[] = [
  {
    title: "GitHub",
    username: "savanpatelssp",
    href: personal.social.github,
    icon: GithubIcon,
    color: "text-white/70",
    borderColor: "border-white/[0.08]",
    hoverBorder: "hover:border-white/20",
  },
  {
    title: "X",
    username: null,
    href: personal.social.x,
    icon: XIcon,
    color: "text-white/70",
    borderColor: "border-white/[0.08]",
    hoverBorder: "hover:border-white/20",
    modal: true,
  },
  {
    title: "LinkedIn",
    username: null,
    href: personal.social.linkedin,
    icon: LinkedinIcon,
    color: "text-blue-400/70",
    borderColor: "border-blue-400/10",
    hoverBorder: "hover:border-blue-400/25",
    modal: true,
  },
  {
    title: "Instagram",
    username: "savanpatelssp",
    href: personal.social.instagram,
    icon: InstagramIcon,
    color: "text-pink-400/70",
    borderColor: "border-pink-400/10",
    hoverBorder: "hover:border-pink-400/25",
  },
  {
    title: "Telegram",
    username: "ABOUTME_SP",
    href: personal.social.telegram,
    icon: TelegramIcon,
    color: "text-cyan-400/70",
    borderColor: "border-cyan-400/10",
    hoverBorder: "hover:border-cyan-400/25",
  },
];
