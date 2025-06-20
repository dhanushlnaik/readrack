// src/app/layout.tsx
import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "ReadRack",
  description: "Your doodlebook of book reviews!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${poppins.variable} font-sans antialiased bg-[#fefcf3] text-black`}
      >
        <Providers>
          <Navbar />
          <main className="px-4 md:px-8 lg:px-20 pt-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
