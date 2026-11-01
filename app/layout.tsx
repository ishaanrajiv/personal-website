import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Outfit Medium for the wordmark, the same face the Lyrate site uses (SIL OFL).
const outfit = localFont({
  src: "./fonts/Outfit-Medium.ttf",
  weight: "500",
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ishaanrajiv.com"),
  title: "Ishaan Rajiv - Website and Blog",
  description: "Personal website of Ishaan - analytics professional exploring iOS and web development, writing about data, tech, and AI",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2EDED" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0D0D" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.variable}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
