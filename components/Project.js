import Image from "next/image";
import InView from "./InView";
import { item } from "../constants/motionConstants";
import styles from "../styles/project.module.css";

const Project = ({ project }) => {
  const skillNames = project.skillsNames || [];

  return (
    <InView className={styles.projectCard} variants={item}>
      <div className={styles.projectImg}>
        <Image
          src={`${project.screenshot}`}
          alt={`Image of ${project.name} Project`}
          fill
          sizes="(max-width: 576px) 100vw, (max-width: 1400px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          unoptimized={true}
        />
        <div className={styles.imgOverlay} />
      </div>
      <div className={styles.projectContent}>
        <h2>{project.name}</h2>
        <p>{project.briefDescription}</p>
        {skillNames.length > 0 && (
          <div className={styles.skillBubbles}>
            {skillNames.map((skill, idx) => (
              <span key={idx} className={styles.skillBubble}>{skill}</span>
            ))}
          </div>
        )}
        <div className={styles.linkButtons}>
          <a
            href={`${project.repositoryURL}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceButton}
          >
            Repository
          </a>
          {project.completed ? (
            <a
              href={`${project.site}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.visitButton}
            >
              Visit
            </a>
          ) : (
            <button className={styles.inProgressButton} disabled>
              <span className={styles.inProgressDotSmall} />
              In progress
            </button>
          )}
        </div>
      </div>
    </InView>
  );
};
export default Project;
