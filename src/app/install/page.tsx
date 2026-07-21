import { redirect } from "next/navigation";

export const metadata = {
  title: "Redirecting to Downloads — SP NET INC",
  robots: { index: false, follow: true },
};

export default function InstallPage() {
  redirect("/downloads/portfolio-app");
}
