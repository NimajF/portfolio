import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";
import "../styles/globals.css";

const pageTransition = {
  pageInitial: {
    opacity: 0,
  },
  pageAnimate: {
    opacity: 1,
  },
};

function MyApp({ Component, pageProps, router }) {
  return (
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      variants={pageTransition}
    >
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </motion.div>
  );
}

export default MyApp;
