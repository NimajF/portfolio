import { useEffect, useState } from "react";
import Link from "next/link";
import InView from "./InView";
import styles from "../styles/contact.module.css";
import { item } from "../constants/motionConstants";

const SocialIcon = (props) => {
  const { name, icon, linkParam, link } = props;
  const [mouseOver, setMouseEnter] = useState();
  if (name === "Mail") {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(linkParam);
        setCopied(true);
      } catch (err){
        // err
      }
    };

    useEffect(() => {
      if (!copied) return;
      const t = setTimeout(() => setCopied(false), 1500);
      return () => clearTimeout(t);
    }, [copied]);
    return (
      <InView
        className={styles.socialDiv}
        data-type="email"
        data-copied={copied ? "true" : "false"}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
        onClick={handleCopy}
        role="button"
        aria-label="Copy email to clipboard"
        variants={item}
      >
        <div className={`${styles[name]}`}>{icon}</div>
        <p className={copied ? styles.copiedText : undefined}>
          {copied ? "Mail copied to clipboard" : linkParam}
        </p>
      </InView>
    );
  }

  return (
    <Link href={`${link}`} passHref>
      <a target="_blank" rel="noopener noreferrer">
        <InView
          className={styles.socialDiv}
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
          variants={item}
        >
          <div className={`${styles[name]}`}>{icon}</div>
          {mouseOver ? <p>{linkParam}</p> : <p>{name}</p>}
        </InView>
      </a>
    </Link>
  );
};

export default SocialIcon;
