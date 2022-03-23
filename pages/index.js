import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

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
            <h1>
              Hey, I'm <b>{`<b>`}</b>
              <span>Benjamin</span>
              <b>{`</b>`}</b>
            </h1>
            <p>Creative, passionate musician & Developer</p>
            {/* <ul>
              <li> 💻 Junior Web Developer</li>
              <li> ⚛️ React lover</li>
              <li>🎸 Guitarist</li>
            </ul> */}
            <Link href="/about">
              <a>About me</a>
            </Link>
          </div>
          <div className={styles.homeImage}>
            <Image
              className={styles.personalImage}
              src="/IMG_07982.png"
              alt="Picture of the author"
              height={550}
              width={400}
            />
          </div>
        </div>
      </main>
    </>
  );
}
