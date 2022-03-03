import { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/about.module.css";
import iconList from "../utils/iconList";

const About = () => {
  return (
    <Layout>
      <h1 style={{ alignSelf: "flex-start" }}>ABOUT ME</h1>
      <div className="description">
        <h3 style={{ fontWeight: "bold" }}>Hey, you got here.</h3>
        <p style={{ lineHeight: "1.5rem", fontSize: "1.1rem" }}>
          I am an{" "}
          <span style={{ color: "rgb(66, 132, 255)", fontWeight: "bold" }}>
            {" "}
            autodidact{" "}
          </span>
          Front-End developer student. I have a great capacity learning and
          self-learning, high sense of responsibility and commitment. When faced
          with a problem, I propose useful solutions and alternatives to
          continue with the designated task.
        </p>
      </div>
      <div className="text">
        <h2>Habilties</h2>
        <p>
          These are the skills that I am currently improving, gaining
          knowledge and experience.
        </p>
      </div>
      <section className={styles.skillsContainer}>
        {iconList.map((icon, idx) => (
          <div key={idx} className={`${styles.icon}`}>
            <span className={`${styles[icon.name]}`} >
              {icon.icon}
            </span>
            <p>{icon.name}</p>
            
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default About;
