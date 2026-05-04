import "./globals.css";
import "antd/dist/reset.css";
import "leaflet/dist/leaflet.css";

import ScrollToTopButton from "src/components/ui/ScrollToTopButton";
import Providers from "@/src/app/provider";
import { FavoriteProvider } from "src/locales/context/FavoriteContext";
import { ConfigProvider } from "antd";
import ThemeInit from "@/src/components/ThemeInit";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

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
    <html lang="vi" suppressHydrationWarning>
      {/* add FONT */}
      <body className={inter.className}>
        <ThemeInit />

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