import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "App Preview",
  robots: { index: false, follow: false },
};

const VALID_SCREENS = ["dashboard", "products", "downloads", "documentation", "projects", "settings", "offline"];

export default async function Page({ params }: { params: Promise<{ screen: string }> }) {
  const { screen } = await params;
  const isValid = VALID_SCREENS.includes(screen);
  return <ClientPage screen={isValid ? screen : "dashboard"} />;
}
