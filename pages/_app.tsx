import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Layout>
      <AnimatePresence>
        <motion.main
          key={router.route}
          transition={{
            duration: 0.75,
          }}
          initial={{
            opacity: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
          animate={{
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
          exit={{
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          }}
        >
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>
    </Layout>
  );
}
