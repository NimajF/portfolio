import Project from "./Project";
import projects from "../constants/projectsData";

const RepositoryList = () => {
  return (
   <div className="projects-container" >
     <h2></h2>
      <div className="projects" >
      {projects.map((project, idx) => (
        <Project project={project} key={idx} />
      ))}
    </div>
   </div>
  );
};
export default RepositoryList;
