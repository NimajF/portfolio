import FeaturedProject from "./FeaturedProject";
import Project from "./Project";
import InView from "./InView";
import projects from "../constants/projectsData";
import {
  container,
  hiddenSubTitle,
  hiddenText,
} from "../constants/motionConstants";

const RepositoryList = ({ dbProjects = [] }) => {
  // Admin-created projects (newest) first, then the static ones
  const allProjects = [...dbProjects, ...projects];

  const featuredProjects = allProjects.filter((project) =>
    project.hasOwnProperty("responsiveScreenshot"),
  );

  const moreProjects = allProjects.filter(
    (project) => !("responsiveScreenshot" in project),
  );

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
        <InView variants={hiddenText}>
          <h3>Featured Projects</h3>
        </InView>
      </div>
      <div className="featuredProjects">
        {featuredProjects.map((project, idx) => (
          <FeaturedProject project={project} key={idx} id={idx} />
        ))}
      </div>
      {/* <div className="featuredProjects">
        {featuredProjects.map((project, idx) => (
          <Parallax bgImage={project.screenshot} strength={200}>
            <FeaturedProject project={project} key={idx} id={idx} />
          </Parallax>
        ))}
      </div> */}
      <InView variants={hiddenSubTitle}>
        <h3 className="moreProjectsTitle">More Projects</h3>
      </InView>
      <InView className="projects" variants={container}>
        {moreProjects.map((project, idx) => (
          <Project project={project} key={idx} />
        ))}
      </InView>
    </div>
  );
};
export default RepositoryList;
