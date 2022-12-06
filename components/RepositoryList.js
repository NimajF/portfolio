import FeaturedProject from "./FeaturedProject";
import Project from "./Project";
import InView from "./InView";
import projects from "../constants/projectsData";
import { Parallax } from "react-parallax";
import {
  container,
  hiddenSubTitle,
  hiddenText,
} from "../constants/motionConstants";

const RepositoryList = () => {
  const featuredProjects = projects.filter((project) =>
    project.hasOwnProperty("responsiveScreenshot")
  );

  const moreProjects = projects.filter(
    (project) => !("responsiveScreenshot" in project)
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
        {/* <p>
          <a href="https://www.freepik.com/free-psd/smartphone-mockup-front-view_13714308.htm#query=iphone%2013%20pro%20mockup&position=28&from_view=keyword">
            Image by originalmockup
          </a>{" "}
          on Freepik
        </p> */}
        <h3
          style={{
            textAlign: "center",
            fontSize: "3.5rem",
            color: "white",
            marginTop: "-2rem",
          }}
        >
          More Projects
        </h3>
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
