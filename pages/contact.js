import Head from "next/dist/shared/lib/head";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/contact.module.css";
import { socialIcons } from "../constants/iconList";

const Contact = () => (
  <Layout>
    <Head>
        <title>Benjamin - Contact</title>
      </Head>
    <h1>Contact me</h1>
    <div className="description">
      <h2 style={{ fontSize: "2rem" }} >Let's keep in touch</h2>
      <p style={{ lineHeight: "1.5rem", fontSize: "1.5rem" }}>
        Social media where you can reach me.
      </p>
    </div>
    <div className={styles.socialIcons}>
      {socialIcons.map((icon, idx) => (
        <div key={idx} className={styles.socialDiv}>
          <div className={`${styles[icon.name]}`}>{icon.icon}</div>
          {icon.name === "Mail" ? <p style={{ cursor: "text", textDecoration: "none" }} >{icon.linkParam}</p> : <Link href={`${icon.link}`}>
            <p>{icon.linkParam}</p>
          </Link>}
        </div>
      ))}
    </div>
  </Layout>
);

export default Contact;
