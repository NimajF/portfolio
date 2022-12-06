import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import InView from "../components/InView";
import {
  hiddenTitle,
  hiddenSubTitle,
  hiddenText,
} from "../constants/motionConstants";
import { motion } from "framer-motion";
import styles from "../styles/about.module.css";
import { iconList } from "../constants/iconList";
import Link from "next/link";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

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
              I am an <span> autodidact </span> argentinian FullStack developer
              student. I have a great capacity learning and self-learning, high
              sense of responsibility and commitment.
            </p>
          </InView>
          <InView variants={hiddenText}>
            <p>
              When facing problem, I propose useful solutions and alternatives
              to continue with the designated task.
            </p>
            <p>
              At this point, I&apos;m specially waiting to start my Web
              Development FP (Formación Profesional) in Spain. In addition im
              studying, developing projects and learning every day.
            </p>
          </InView>
          <div className={styles.cvDiv}>
            <InView variants={hiddenText}>
              <h3>Job Opportunities</h3>
            </InView>
            <InView variants={hiddenText}>
              <p>
                I am currently in search for a job to expand and apply my
                skills. Check out my <b>CV</b>.
              </p>

              <a
                href="https://drive.google.com/file/d/1txHOBXFhCAXNYhSbCcDolS54rBFEu-OL/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.cvButton}>CV</button>
              </a>
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
          <div className={styles.headerMacNav}>
            <div className={styles.menuCircle} />
            <div className={styles.fakeSearchTab}>
              <p>www.skills.com</p>
            </div>
          </div>
          <InView
            className={styles.skillsDiv}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {iconList
              .filter((icon) => icon.name !== "EJS")
              .map((icon, idx) => (
                <motion.div
                  key={idx}
                  className={`${styles.icon}`}
                  variants={item}
                >
                  <span className={`${styles[icon.name]}`}>{icon.icon}</span>
                  <p>{icon.name}</p>
                </motion.div>
              ))}
          </InView>
        </InView>
      </div>
    </Layout>
  );
};

export default About;
