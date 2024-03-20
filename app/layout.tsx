import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./nprogress.css";
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
      <head>
        <script
          src="https://unpkg.com/nprogress@0.2.0/nprogress.js"
          defer
        ></script>
      </head>
      <body className={inter.className}>
        <Authenticate>{children}</Authenticate>
      </body>
    </html>
  );
}
