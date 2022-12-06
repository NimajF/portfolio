import Head from "next/head";
import Navbar from "../components/Navbar";
import FloatingElements from "../components/FloatingElements";
import FloatingIcon from "../components/FloatingIcon";
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
        <title>Benjamin - Web Developer</title>
      </Head>
      <Navbar />
      {/* <motion.div
        className={styles.moonSun}
        initial={{ y: 600, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <FloatingIcon />
      </motion.div> */}
      <FloatingElements />
      <motion.div
        className={styles.trees}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <Image
          src={"/m1.png"}
          alt="Picture of mountain 1"
          // height={"100%"}
          // width={"100%"}
          layout="fill"
          unoptimized={true}
          priority={true}
        />
      </motion.div>
      <motion.div
        className={styles.mountain2}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.5, delay: 3 }}
      >
        <Image
          src={"/m2.png"}
          alt="Picture of mountain 2"
          // height={"100%"}
          // width={"100%"}
          layout="fill"
          unoptimized={true}
        />
      </motion.div>
      <div className={styles.movingBG} />
      <main className={styles.mainContainer}>
        <div className={styles.homeContainer}>
          <div className={styles.homeTitles}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={hiddenText}
            >
              {/* <h1>
                Hey, I&apos;m <b>{`<b>`}</b>
                <span>Benjamin</span>
                <b>{`</b>`}</b>
              </h1> */}
              <h1>
                Hey, I&apos;m <br></br>
                <span>Benjamin</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ x: 10, opacity: 0 }}
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
                <button>About me</button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className={styles.homeImage}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <div className={styles.headerMacNav}>
              <div className={styles.menuCircle} />
            </div>
            <Image
              className={styles.personalImage}
              src="/logoface.png"
              alt="Picture of the author"
              height={550}
              width={400}
              unoptimized={true}
            />
            <span className={styles.planet}></span>
          </motion.div>
        </div>
      </main>
    </>
  );
}
