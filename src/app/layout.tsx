import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Food Map — Histamine & Kidney-Friendly",
  description:
    "Everyday foods plotted by histamine content or by potassium and phosphorus load — switch between histamine intolerance and a kidney-friendly (renal) diet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
