import "./globals.css";
import "leaflet/dist/leaflet.css";
import Script from "next/script";
import ScrollToTopButton from "src/components/ui/ScrollToTopButton";

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
              try {
                const theme = localStorage.getItem("theme");

                // chỉ set khi chưa có class dark/light
                const root = document.documentElement;

                if (theme === "dark") {
                  root.classList.add("dark");
                } else if (theme === "light") {
                  root.classList.remove("dark");
                }
              } catch (e) {}
            })();
          `}
        </Script>
      </head>

      <body>
        <div style={{ paddingTop: "70px" }}>
          {children}
        </div>

        <ScrollToTopButton />
      </body>
    </html>
  );
}