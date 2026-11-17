import Head from "next/head";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { hiddenTitle } from "../constants/motionConstants";
import RepositoryList from "../components/RepositoryList";
import { supabase } from "../lib/supabase";
import { normalizeProject } from "../lib/normalizeProject";

const Projects = ({ dbProjects }) => {
  return (
    <Layout>
      <Head>
        <title>Benjamin - Projects</title>
      </Head>
      <motion.div
        className="h1-title"
        initial="hidden"
        animate="visible"
        variants={hiddenTitle}
      >
        <h1>Projects</h1>
      </motion.div>
      <RepositoryList dbProjects={dbProjects} />
    </Layout>
  );
};

// Fetch admin-created projects at build time and re-check every 60s (ISR)
export async function getStaticProps() {
  let dbProjects = [];

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    dbProjects = data.map(normalizeProject);
  } catch (err) {
    // Supabase unavailable (like paused): render static projects only
    console.error("Error fetching projects from Supabase:", err);
  }

  return {
    props: { dbProjects },
    revalidate: 60,
  };
}

export default Projects;
