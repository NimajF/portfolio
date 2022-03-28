import Head from "next/head";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { hiddenText } from "../constants/motionConstants";
import RepositoryList from "../components/RepositoryList";

const Projects = () => {
  return (
    <Layout>
      <Head>
        <title>Benjamin - Projects</title>
      </Head>
      <motion.div
        className="h1-title"
        initial="hidden"
        animate="visible"
        variants={hiddenText}
      >
        <h1>Projects</h1>
      </motion.div>
      <RepositoryList />
    </Layout>
  );
};
export default Projects;
