import { useState } from "react";
import Link from "next/link";
import InView from "./InView";
import styles from "../styles/contact.module.css";
import { item } from "../constants/motionConstants";

const SocialIcon = (props) => {
  const { name, icon, linkParam, link } = props;
  const [mouseOver, setMouseEnter] = useState();
  return (
    <Link href={`${link}`}>
      <a target="_blank">
        <InView
          className={styles.socialDiv}
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
          variants={item}
        >
          <div className={`${styles[name]}`}>{icon}</div>
          {name === "Mail" ? (
            <p style={{ cursor: "text", textDecoration: "none" }}>
              {linkParam}
            </p>
          ) : (
            <Link href={`${link}`}>
              {mouseOver ? <p>{linkParam}</p> : <p>{name}</p>}
            </Link>
          )}
        </InView>
      </a>
    </Link>
  );
};

export default SocialIcon;
