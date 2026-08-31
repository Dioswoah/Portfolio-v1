import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CommandPalette } from "@/components/CommandPalette";
import { MotionProvider } from "@/components/MotionProvider";
import { ChatWidget } from "@/components/ChatWidget";

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-v1-two-ebon.vercel.app"),
  title: "Marc: Prompt — Marc Joshua Ramos, AI Engineer & IT Lead",
  description:
    "Marc: Prompt — the portfolio of Marc Joshua Ramos, an AI engineer and IT lead who builds the agents, automations, and systems that real businesses run on.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Marc: Prompt — Marc Joshua Ramos",
    description:
      "I build the agents, automations, and systems that real businesses run on.",
    type: "website",
  },
};

const themeScript = `(function(){try{var s=localStorage.getItem("theme");var d=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;if(s==="dark"||(!s&&d)){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jbmono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <MotionProvider>
          <SmoothScroll />
          <CommandPalette />
          <ChatWidget />
          {children}
          <Toaster
            position="bottom-left"
            toastOptions={{
              style: {
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                background: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </MotionProvider>
      </body>
    </html>
  );
}
