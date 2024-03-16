import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Authenticate from "@/components/Authenticate";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Num Num",
  description: "Num Num Food App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Authenticate>{children}</Authenticate>
      </body>
    </html>
  );
}
