import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { FaFire } from "react-icons/fa";
import LoginBtn from "@/components/features/nav/LoginBtn";
import Link from "next/link";
import BurgerNav from "@/components/features/nav/BurgerNav";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FireDesk",
  description: "Manage your office in hot desk reservation system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ReactQueryProvider>
          <div className="relative text-dark overflow-x-hidden" id="app">
            <div className="fixed h-[64px] w-full bg-white border-b border-b-slate-200 flex justify-between items-center gap-3 px-4 py-2 z-50">
              <Link href="/" className="flex justify-start items-center gap-3">
                <span className="text-4xl text-main2">
                  <FaFire />
                </span>
                <p className="text-2xl tracking-wide">
                  Fire<span className="text-main2 font-medium">Desk</span>
                </p>
              </Link>
              <LoginBtn isInNav={true} />
              <BurgerNav />
            </div>
            {children}
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
