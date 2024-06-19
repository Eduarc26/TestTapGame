import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Poppins, Lilita_One } from "next/font/google";
import "./globals.scss";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const pusia = localFont({
  src: "./fonts/Pusia-Bold.otf",
  display: "swap",
});
const lilita = Lilita_One({
  weight: ["400"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: process.env.APP_NAME!,
  description:
    "Выполняйте задания, получайте награды и соревнуйтесь с друзьями!",
};
export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  userScalable: false,
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={false}>
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={pusia.className}>
        {children}

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
