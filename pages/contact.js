import Head from "next/dist/shared/lib/head";
import SocialIcon from "../components/SocialIcon";
import Layout from "../components/Layout";
import InView from "../components/InView";
import styles from "../styles/contact.module.css";
import { socialIcons } from "../constants/iconList";
import {
  hiddenTitle,
  hiddenSubTitle,
  hiddenText,
  container,
} from "../constants/motionConstants";

const Contact = () => {
  return (
    <Layout>
      <Head>
        <title>Benjamin - Contact</title>
      </Head>
      <InView className="h1-title" variants={hiddenTitle}>
        <h1>Contact Me</h1>
      </InView>
      <div className="description">
        <div className="header-info">
          <InView variants={hiddenSubTitle}>
            <h2>Let&apos;s keep in touch</h2>
          </InView>
          <InView variants={hiddenText}>
            <p className="p-text">
              If my profile fits your new project or company, feel free to
              contact me!
            </p>
          </InView>
        </div>
      </div>
      <InView className={styles.socialIcons} variants={container}>
        {socialIcons.map((icon, idx) => (
          <SocialIcon
            key={idx}
            name={icon.name}
            icon={icon.icon}
            linkParam={icon.linkParam}
            link={icon.link}
          />
        ))}
      </InView>
    </Layout>
  );
};

export default Contact;
