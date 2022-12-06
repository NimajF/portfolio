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
          alt={`Image of ${project.name} Project`}
          height={150}
          width={300}
          unoptimized={true}
          priority={
            project.screenshot === "/Homepage.png" ||
            project.screenshot === "/NickGen.PNG"
          }
        />
      </div>
      <div className={styles.projectContent}>
        <h2>{project.name}</h2>
        <p>{project.briefDescription}</p>
        <div className={styles.languages}>
          {project.skills.map((icon, idx) => (
            <span key={idx}>{icon}</span>
          ))}
        </div>
        <div className={styles.linkButtons}>
          <a
            href={`${project.repositoryURL}`}
            target="_blank"
            className={styles.sourceButton}
          >
            Repository
          </a>
          {project.completed ? (
            <a
              href={`${project.site}`}
              target="_blank"
              className={styles.visitButton}
            >
              Visit
            </a>
          ) : (
            <a href="/" className={styles.inProgressButton}>
              In progress
            </a>
          )}
        </div>
      </div>
    </InView>
  );
};
export default Project;
