import "./globals.css";
import "leaflet/dist/leaflet.css";
import Script from "next/script";
import ScrollToTopButton from "src/components/ui/ScrollToTopButton";
import Providers from "@/src/app/provider";
import { FavoriteProvider } from "src/locales/context/FavoriteContext"; // ⭐ thêm dòng này

export const metadata = {
  title: "Tastii",
  icons: {
    icon: "/Logo1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ FIX: chỉ SET INIT 1 LẦN, không override sau khi React chạy */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function () {
              try {
                const theme = localStorage.getItem("theme");

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
        {/* ⭐ THÊM FAVORITE PROVIDER */}
        <FavoriteProvider>
          <Providers>
            {/* ⭐ FIX NAVBAR OVERLAP AWARENESS */}
            <div style={{ paddingTop: "70px" }}>
              {children}
            </div>

            <ScrollToTopButton />
          </Providers>
        </FavoriteProvider>
      </body>
    </html>
  );
}