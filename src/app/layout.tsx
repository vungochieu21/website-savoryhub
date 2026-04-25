import "./globals.css";
import "antd/dist/reset.css";
import "leaflet/dist/leaflet.css";
import Script from "next/script";
import ScrollToTopButton from "src/components/ui/ScrollToTopButton";
import Providers from "@/src/app/provider";
import { FavoriteProvider } from "src/locales/context/FavoriteContext";
import { ConfigProvider } from "antd";

export const metadata = {
  title: "Tastii",
  icons: {
    icon: "/Logo1.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme script (dark/light) */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function () {
              try {
                const theme = localStorage.getItem("theme");
                const root = document.documentElement;

                if (theme === "dark") {
                  root.classList.add("dark");
                } else {
                  root.classList.remove("dark");
                }
              } catch (e) {}
            })();
          `}
        </Script>
      </head>

      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#b30000",
            },
          }}
        >
          <FavoriteProvider>
            <Providers>
              <div style={{ paddingTop: "70px" }}>
                {children}
              </div>

              <ScrollToTopButton />
            </Providers>
          </FavoriteProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}