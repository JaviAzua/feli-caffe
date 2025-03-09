import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import ResponsiveTitle from "@/components/responsive-title";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Felipe Cafferata",
  description:
    "Felipe Cafferata is a passionate photographer and traveler, capturing the beauty of life's fleeting moments through his lens.",
};

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <Suspense fallback="...loading">
          <ResponsiveTitle />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
