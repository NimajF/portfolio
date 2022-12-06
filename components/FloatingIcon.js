import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
// import { IoMoon } from "react-icons/io";
// import { FaSun } from "react-icons/fa";
import { motion } from "framer-motion";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import styles from "../styles/Home.module.css";

export default function FloatingIcon() {
  const { theme } = useTheme();
  const [item, setItem] = useState("");
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (theme === "light") {
      const changeTItem = <BsSunFill />;
      setItem(changeTItem);
    } else {
      setItem(<BsFillMoonFill />);
    }
  }, [theme]);

  return <div style={{ position: "relative" }}>{item}</div>;
}
