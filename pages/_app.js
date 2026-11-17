import { ThemeProvider } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from '../context/authContext';
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
    <AuthProvider>
      <ThemeProvider attribute="data-theme" defaultTheme="dark">
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          // variants={pageTransition}
        >
          <Component {...pageProps} />
        </motion.div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
