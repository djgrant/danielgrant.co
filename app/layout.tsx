import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Daniel Grant",
    default: "Daniel Grant",
  },
  metadataBase: new URL("https://danielgrant.co"),
  themeColor: "rgb(255, 251, 235)",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-amber-50">
      <body>
        <div className="max-w-3xl md:mx-auto px-6 sm:px-8">
          {props.children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
