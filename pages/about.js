import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/about.module.css";
import { iconList } from "../constants/iconList";
import Link from "next/link";

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
            I am an <span> autodidact </span> argentinian Front-End developer
            student. I have a great capacity learning and self-learning, high
            sense of responsibility and commitment.
          </p>
          <p>
            When faced with a problem, I propose useful solutions and
            alternatives to continue with the designated task.
          </p>
          <p>
            At this point, I&apos;m specially waiting to start my Web
            Development FP (Formación Profesional) in Spain. In addition im
            studying, developing projects and learning every day.
          </p>
          <div className={styles.cvDiv}>
            <h3>Job Opportunities</h3>
            <p>
              I am currently in search for a job to expand and apply my skills.
              Check out my <b>CV</b>.
            </p>
            <Link href="https://drive.google.com/file/d/1saMOt6YJeCrXxokWpztf-EnMmEXNumZe/view?usp=sharing">
              <button className={styles.cvButton}>CV</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="text">
        <h4 className={styles.skillsTitle}>Skills</h4>
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
