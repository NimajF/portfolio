import Head from "next/head";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

const hiddenText = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Benjamin - Junior WEB Developer</title>
      </Head>
      <Navbar />
      <main className={styles.mainContainer}>
        <div className={styles.homeContainer}>
          <div className={styles.homeTitles}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={hiddenText}
            >
              <h1>
                Hey, I&apos;m <b>{`<b>`}</b>
                <span>Benjamin</span>
                <b>{`</b>`}</b>
              </h1>
            </motion.div>

            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              <p>Creative, passionate musician & Developer</p>
            </motion.div>
            {/* <ul>
              <li> 💻 Junior Web Developer</li>
              <li> ⚛️ React lover</li>
              <li>🎸 Guitarist</li>
            </ul> */}
            <motion.div
              style={{ marginTop: "2rem" }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              <Link href="/about">
                <a>About me</a>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className={styles.homeImage}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <Image
              className={styles.personalImage}
              src="/IMG_07982.png"
              alt="Picture of the author"
              height={550}
              width={400}
            />
          </motion.div>
        </div>
      </main>
    </>
  );
}
