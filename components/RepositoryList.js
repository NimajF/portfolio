import Project from "./Project";
import projects from "../constants/projectsData";

const RepositoryList = () => {
  return (
    <div className="description">
      <div className="header-info">
        <h2>This list is not even close to be finished.</h2>
        <p className="p-text">
          I would love to extend it while experiencing my developer traversy.
        </p>
      </div>
      <div className="projects">
        {projects.map((project, idx) => (
          <Project project={project} key={idx} />
        ))}
      </div>
    </div>
  );
};
export default RepositoryList;
