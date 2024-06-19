import { Poppins } from "next/font/google";
import Providers from "@/components/providers";
import BottomNavigation from "@/components/common/bottom-navigation";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={false}>
      <body className={poppins.className}>
        <Providers>{children}</Providers>
        <BottomNavigation />
      </body>
    </html>
  );
}
