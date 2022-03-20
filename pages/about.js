import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/about.module.css";
import { iconList } from "../constants/iconList";

const About = () => {
  return (
    <Layout>
      <Head>
        <title>Benjamin - About</title>
      </Head>
      <h1>About me</h1>
      <div className="description">
        <div className="header-info">
          <h2>Hey, you got here.</h2>
          <p className="p-text">
            I am an <span> autodidact </span>
            Front-End developer student. I have a great capacity learning and
            self-learning, high sense of responsibility and commitment. When
            faced with a problem, I propose useful solutions and alternatives to
            continue with the designated task.
          </p>
        </div>
      </div>
      <div className="text">
        <h3 className={styles.skillsTitle}>Skills</h3>
        <p style={{ width: "50%", lineHeight: "1.5rem", fontSize: "1.2rem" }}>
          These are the{" "}
          <span style={{ color: "#eb3434", fontWeight: "bold" }}>skills</span>{" "}
          that I am currently improving, gaining knowledge and experience.
        </p>

        <section className={styles.skillsContainer}>
          {iconList
            .filter((icon) => icon.name !== "EJS")
            .map((icon, idx) => (
              <div key={idx} className={`${styles.icon}`}>
                <span className={`${styles[icon.name]}`}>{icon.icon}</span>
                <p>{icon.name}</p>
              </div>
            ))}
        </section>
      </div>
    </Layout>
  );
};

export default About;
