import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "SavoryHub",
  description: "Food Map App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function () {
              const theme = localStorage.getItem("theme");
              if (theme === "dark") {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            })();
          `}
        </Script>
      </head>

      <body>{children}</body>
    </html>
  );
}