import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ProvidersTheme } from "../providers/ThemeProvider";
import { ToasterProvider } from "../providers/ToasterProvider";
import localFont from "next/font/local";
import { NextAuthProvider } from "../providers/SessionProvider";

const myFont = localFont({ src: "../../fonts/Cairo-Medium.ttf" });






export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/icons/HG-Icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/HG-Icon.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};




export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid

  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  const currentLocale = locale ?? "ar"; // default to Arabic

  return (
    <html
      lang={currentLocale}
      dir={currentLocale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`bg-[#FBFBFB] dark:bg-slate-900 ${myFont.className} antialiased`}
      >
        <NextAuthProvider>
          <NextIntlClientProvider messages={messages}>
            <ToasterProvider />
            <ProvidersTheme>{children}</ProvidersTheme>
          </NextIntlClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
