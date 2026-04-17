import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

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
    <html lang="en">
      <body>{children}</body>

      {/* ✅ FIX: đảm bảo theme sync khi reload */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              const theme = localStorage.getItem("theme");
              if (theme === "dark") {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            })();
          `,
        }}
      />
    </html>
  );
}