import Head from "next/head";
import Layout from "../components/Layout";
import RepositoryList from "../components/RepositoryList";

const Projects = () => {
  return (
    <Layout>
      <Head>
        <title>Benjamin - Projects</title>
      </Head>
      <h1>Projects</h1>
      <RepositoryList />
    </Layout>
  );
};
export default Projects;
