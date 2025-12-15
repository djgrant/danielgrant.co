import { Analytics } from "@vercel/analytics/react";
import type { Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "rgb(255, 251, 235)" },
    { media: "(prefers-color-scheme: dark)", color: "rgb(18, 24, 38)" },
  ],
};

export const metadata = {
  title: {
    template: "%s | Daniel Grant",
    default: "Daniel Grant",
  },
  metadataBase: new URL("https://danielgrant.co"),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark:bg-gray-900">
      <body>
        <div className="max-w-[44rem] md:mx-auto px-6 sm:px-8">
          {props.children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
