import Project from "./Project";
import projects from "../constants/projectsData";
import { motion } from "framer-motion";
import { container } from "../constants/motionConstants";

const RepositoryList = () => {
  return (
    <div className="description">
      <div className="header-info">
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2>This list is not even close to be finished.</h2>
        </motion.div>
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <p className="p-text">
            I would love to extend it while experiencing my developer traversy.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="projects"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, idx) => (
          <Project project={project} key={idx} />
        ))}
      </motion.div>
    </div>
  );
};
export default RepositoryList;
