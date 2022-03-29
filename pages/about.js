import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import InView from "../components/InView";
import {
  hiddenTitle,
  hiddenSubTitle,
  hiddenText,
} from "../constants/motionConstants";
import styles from "../styles/about.module.css";
import { iconList } from "../constants/iconList";
import Link from "next/link";

const About = () => {
  return (
    <Layout>
      <Head>
        <title>Benjamin - About</title>
      </Head>
      <InView className="h1-title" variants={hiddenTitle}>
        <h1>About me</h1>
      </InView>
      <div className="description">
        <div className="header-info">
          <InView variants={hiddenSubTitle}>
            <h2>Hey, you got here.</h2>
          </InView>
          <InView variants={hiddenText}>
            <p className="p-text">
              I am an <span> autodidact </span> argentinian Front-End developer
              student. I have a great capacity learning and self-learning, high
              sense of responsibility and commitment.
            </p>
          </InView>
          <InView variants={hiddenText}>
            <p>
              When faced with a problem, I propose useful solutions and
              alternatives to continue with the designated task.
            </p>
            <p>
              At this point, I&apos;m specially waiting to start my Web
              Development FP (Formación Profesional) in Spain. In addition im
              studying, developing projects and learning every day.
            </p>
          </InView>
          <div className={styles.cvDiv}>
            <InView variants={hiddenTitle}>
              <h3>Job Opportunities</h3>
            </InView>
            <InView variants={hiddenText}>
              <p>
                I am currently in search for a job to expand and apply my
                skills. Check out my <b>CV</b>.
              </p>

              <Link href="https://drive.google.com/file/d/1saMOt6YJeCrXxokWpztf-EnMmEXNumZe/view?usp=sharing">
                <button className={styles.cvButton}>CV</button>
              </Link>
            </InView>
          </div>
        </div>
      </div>
      <div className="text">
        <InView variants={hiddenSubTitle}>
          <h4 className={styles.skillsTitle}>Skills</h4>
        </InView>
        <InView
          variants={hiddenText}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <p className={styles.skillsText}>
            These are the{" "}
            <span style={{ color: "#eb3434", fontWeight: "bold" }}>skills</span>{" "}
            that I am currently improving, gaining knowledge and experience.
          </p>
        </InView>

        <InView className={styles.skillsContainer} variants={hiddenTitle}>
          {iconList
            .filter((icon) => icon.name !== "EJS")
            .map((icon, idx) => (
              <div key={idx} className={`${styles.icon}`}>
                <span className={`${styles[icon.name]}`}>{icon.icon}</span>
                <p>{icon.name}</p>
              </div>
            ))}
        </InView>
      </div>
    </Layout>
  );
};

export default About;
