import Head from "next/dist/shared/lib/head";
import SocialIcon from "../components/SocialIcon";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { hiddenText } from "../constants/motionConstants";
import styles from "../styles/contact.module.css";
import { socialIcons } from "../constants/iconList";
import { contactContainer } from "../constants/motionConstants";

const Contact = () => {
  return (
    <Layout>
      <Head>
        <title>Benjamin - Contact</title>
      </Head>
      <motion.div
        className="h1-title"
        initial="hidden"
        animate="visible"
        variants={hiddenText}
      >
        <h1>Contact Me</h1>
      </motion.div>
      <div className="description">
        <div className="header-info">
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2>Let&apos;s keep in touch</h2>
          </motion.div>
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
            <p className="p-text">
              If my profile fits your new project or company, feel free to
              contact me!
            </p>
          </motion.div>
        </div>
      </div>
      <motion.div
        className={styles.socialIcons}
        variants={contactContainer}
        initial="hidden"
        animate="visible"
      >
        {socialIcons.map((icon, idx) => (
          <SocialIcon
            key={idx}
            name={icon.name}
            icon={icon.icon}
            linkParam={icon.linkParam}
            link={icon.link}
          />
        ))}
      </motion.div>
    </Layout>
  );
};

export default Contact;
