import Project from "./Project";
import InView from "./InView";
import projects from "../constants/projectsData";
import {
  container,
  hiddenSubTitle,
  hiddenText,
} from "../constants/motionConstants";

const RepositoryList = () => {
  return (
    <div className="description">
      <div className="header-info">
        <InView variants={hiddenSubTitle}>
          <h2>This list is not even close to be finished.</h2>
        </InView>
        <InView variants={hiddenText}>
          <p className="p-text">
            I would love to extend it while experiencing my developer traversy.
          </p>
        </InView>
      </div>

      <InView className="projects" variants={container}>
        {projects.map((project, idx) => (
          <Project project={project} key={idx} />
        ))}
      </InView>
    </div>
  );
};
export default RepositoryList;
