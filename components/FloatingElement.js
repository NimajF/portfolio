import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

const fonts = ["Poppins", "Inter", "Roboto Mono"];

function generateStyle() {
  const delay = Math.floor(Math.random() * 8 + 2);
  const duration = Math.floor(Math.random() * 4 + 8);
  const totalDuration = (delay + duration) * 1000;
  const style = [
    delay,
    duration,
    totalDuration,
    {
      left: `${Math.floor(Math.random() * 70 + 10)}%`,
      "--top": `${Math.floor(Math.random() * 15 + 5)}px`,
      // fontSize: `${Math.floor(Math.random() * 2 + 1)}rem`,
      // fontFamily: `${fonts[Math.floor(Math.random() * fonts.length)]}`,
      // fontWeight: `${Math.floor(Math.random() * 600 + 400)}`,
      // "--rotate": `${Math.floor(Math.random() * 199) - 99}deg`,
      animationIterationCount: "infinite",
      animationTimingFunction: "linear",
      // animationDelay: `${delay}s`,
      animationDelay: `${Math.floor(Math.random() * 3 + 2)}s`,
      animationDuration: `${duration}s`,
    },
  ];
  return style;
}

export default function FloatingElement({ element, theme }) {
  const [style, setStyle] = useState(generateStyle());
  let isTheme = theme === "light" && true;

  // useEffect(() => {
  //   let newDuration = style[1] * 1000;
  //   console.log(newDuration);
  //   const timer = setTimeout(() => {
  //     setStyle(generateStyle());
  //   }, newDuration);
  //   return () => clearTimeout(timer);
  // }, [style]);

  return isTheme ? (
    <div className={theme} style={style[3]}>
      {element}
    </div>
  ) : (
    <span className={theme} style={style[3]}></span>
  );
}
