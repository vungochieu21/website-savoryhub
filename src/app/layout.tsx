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
      <head />
      <body>
        <Script
          src="/scripts/theme.js"
          strategy="beforeInteractive"
        />

        <div style={{ paddingTop: "70px" }}>
          {children}
        </div>

        <ScrollToTopButton />
      </body>
    </html>
  );
}