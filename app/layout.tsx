import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.open-ena.com"),
  title: {
    default: "Open ENA | Epistemic Network Analysis",
    template: "%s | Open ENA",
  },
  description: "An open, browser-based interface for Epistemic Network Analysis prepared for jENA integration.",
  applicationName: "Open ENA",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Open ENA",
    title: "Open ENA | Epistemic Network Analysis",
    description: "Open methods, open tooling, and transparent epistemic network analysis.",
    url: "https://www.open-ena.com",
  },
  twitter: {
    card: "summary",
    title: "Open ENA | Epistemic Network Analysis",
    description: "Open methods, open tooling, and transparent epistemic network analysis.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
