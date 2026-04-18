"use client";

import { LanguageProvider } from "src/locales/context/LanguageContext";

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}