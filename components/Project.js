import Link from "next/link";
import styles from "../styles/project.module.css";
import Image from "next/image";
const Project = ({ project }) => (
  <div className={styles.projectCard}>
    <div className={styles.overlay}>
      <Link href={`${project.repositoryURL}`}>
        <button className={styles.sourceButton}>Source Code</button>
      </Link>
      <Link href={`${project.site}`}>
        <button className={styles.visitButton}>Visit</button>
      </Link>
    </div>
    <div className={styles.projectImg}>
      <Image
        src={`${project.screenshot}`}
        alt={`${project.screenshot}`}
        height={200}
        width={350}
      />
      <img />
    </div>
    <h2>{project.name}</h2>
    <p>{project.description}</p>
    <div className={styles.languages}>{project.skills}</div>
  </div>
);
export default Project;
