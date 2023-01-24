import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Andada_Pro } from "@next/font/google";

const abril = Andada_Pro({ subsets: ["latin"], variable: "--andada-font" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${abril.variable} font-andanda`}>
      <Component {...pageProps} />
    </main>
  );
}
