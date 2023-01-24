import React from "react";
import Header from "./Header";
import { Andada_Pro } from "@next/font/google";

type Props = {
  children: React.ReactNode;
};
const abril = Andada_Pro({ subsets: ["latin"], variable: "--andada-font" });

export default function Layout({ children }: Props) {
  return (
    <div className={`${abril.variable} font-andanda`}>
      <Header />
      <div>{children}</div>
    </div>
  );
}
