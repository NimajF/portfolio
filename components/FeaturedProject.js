import Link from "next/link";
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
          <p>{project.name}</p>
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
            <Link href={`${project.repositoryURL}`} passHref>
              <a target="_blank" className={styles.featuredSCButton}>
                Source Code
              </a>
            </Link>
            {project.completed ? (
              <Link href={`${project.site}`} passHref>
                <a target="_blank" className={styles.featuredVisitButton}>
                  Visit
                </a>
              </Link>
            ) : (
              <Link href="/">
                <button className={styles.featuredInProgressButton} disabled>
                  In progress
                </button>
              </Link>
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
              priority={
                project.screenshot === "/Homepage.png" ||
                project.screenshot === "/NickGen.PNG"
              }
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
            <Image
              className={styles.phoneImage}
              src={project.responsiveScreenshot}
              alt={`Phone view of ${project.name} - Mockup Image by originalmockup on Freepik`}
              height={350}
              width={240}
              unoptimized={true}
            />
          </InView>
        </figure>
        {/* <a href="https://www.freepik.com/free-psd/smartphone-mockup-front-view_13714308.htm#query=iphone%2013%20pro%20mockup&position=28&from_view=keyword">
          Image by originalmockup
        </a>{" "}
        on Freepik */}
      </InView>
    </div>
  );
}
