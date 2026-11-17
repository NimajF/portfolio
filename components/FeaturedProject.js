import Image from "next/image";
import InView from "./InView";
import { motion } from "framer-motion";
import {
  container,
  hiddenFeaturedImage,
  hiddenProject,
  hiddenProjectLeft,
} from "../constants/motionConstants";
import styles from "../styles/project.module.css";

const hiddenProjectInfoLeft = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 1.5 } },
};
const hiddenProjectInfo = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 1.5 } },
};

export default function FeaturedProject(props) {
  const { project, id } = props;
  return (
    <div className={styles.featuredProject}>
      <InView
        className={styles.featuredProjectInfo}
        variants={id % 2 == 0 ? hiddenProjectInfoLeft : hiddenProjectInfo}
      >
        <motion.div className={styles.projectInfo}>
          <p className={styles.featuredProjectTitle}>{project.name}</p>
          <p className={styles.featuredBriefDescription}>
            {project.briefDescription}
          </p>
          <p className={styles.featuredDescription}>{project.description}</p>
          <div className={styles.skillTags}>
            {project.skillsNames.map((skill, idx) => (
              <span key={idx}>{skill}</span>
            ))}
          </div>
          <div className={styles.featuredLinks}>
            <a
              href={`${project.repositoryURL}`}
              className={styles.featuredSCButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 16 16"
                width="14"
                height="14"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Source Code
            </a>
            {project.completed ? (
              <a
                href={`${project.site}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.featuredVisitButton}
              >
                Visit
                <svg
                  viewBox="0 0 16 16"
                  width="12"
                  height="12"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10.604 1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.75.75 0 0 1-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1zM3.75 2A1.75 1.75 0 0 0 2 3.75v8.5C2 13.216 2.784 14 3.75 14h8.5A1.75 1.75 0 0 0 14 12.25v-3.5a.75.75 0 0 0-1.5 0v3.5a.25.25 0 0 1-.25.25h-8.5a.25.25 0 0 1-.25-.25v-8.5a.25.25 0 0 1 .25-.25h3.5a.75.75 0 0 0 0-1.5h-3.5z" />
                </svg>
              </a>
            ) : (
              <button className={styles.featuredInProgressButton} disabled>
                <span className={styles.inProgressDot} />
                In progress
              </button>
            )}
          </div>
        </motion.div>
      </InView>
      <InView className={styles.featuredProjectImages}>
        <figure>
          {/* `${id % 2 == 0 ? 10 : -10}` */}
          <InView variants={hiddenFeaturedImage}>
            <Image
              src={`${project.screenshot}`}
              alt={`Image of ${project.name} Project`}
              height={400}
              width={700}
              unoptimized={true}
            />
          </InView>
        </figure>

        <figure
          style={
            id % 2 == 0
              ? { top: "120px", right: "-20px" }
              : { top: "120px", left: "-20px" }
          }
        >
          <InView variants={id % 2 == 0 ? hiddenProject : hiddenProjectLeft}>
            {/* CSS phone mockup wrapping a raw mobile screenshot */}
            <div className={styles.phoneMockup}>
              <div className={styles.phoneScreen}>
                <Image
                  className={styles.phoneScreenImage}
                  src={project.responsiveScreenshot}
                  alt={`Phone view of ${project.name}`}
                  fill
                  unoptimized={true}
                />
              </div>
            </div>
          </InView>
        </figure>
      </InView>
    </div>
  );
}
