import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import InView from "./InView";
import { item } from "../constants/motionConstants";
import styles from "../styles/project.module.css";
const Project = ({ project }) => {
  return (
    <InView className={styles.projectCard} variants={item}>
      <div className={styles.projectImg}>
        <Image
          src={`${project.screenshot}`}
          alt={`${project.screenshot}`}
          height={150}
          width={300}
          priority={
            project.screenshot === "/Homepage.png" ||
            project.screenshot === "/NickGen.PNG"
          }
        />
        <img />
      </div>
      <div className={styles.projectContent}>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <div className={styles.languages}>
          {project.skills.map((icon, idx) => (
            <span key={idx}>{icon}</span>
          ))}
        </div>
        <div className={styles.linkButtons}>
          <Link href={`${project.repositoryURL}`}>
            <button className={styles.sourceButton}>Source Code</button>
          </Link>
          {project.completed ? (
            <Link href={`${project.site}`}>
              <button className={styles.visitButton}>Visit</button>
            </Link>
          ) : (
            <Link href="/">
              <button className={styles.inProgressButton} disabled>
                In progress
              </button>
            </Link>
          )}
        </div>
      </div>
    </InView>
  );
};
export default Project;
