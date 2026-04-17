import "./globals.css";
import "leaflet/dist/leaflet.css";
import Script from "next/script";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export const metadata = {
  title: "SavoryHub",
  description: "Food Map App",
};

export default function RootLayout({ children }) {
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

      <body>
        {children}

        {/* Scroll to top button */}
        <ScrollToTopButton />
      </body>
    </html>
  );
}