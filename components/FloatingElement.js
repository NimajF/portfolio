import { useEffect, useRef, useState, useMemo } from "react";
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
      // Para clouds (div)
      "--cloud-width": `${Math.floor(Math.random() * 100 + 150)}px`, // 150-250px
      "--cloud-height": `${Math.floor(Math.random() * 30 + 50)}px`, // 50-80px
      "--cloud-before-width": `${Math.floor(Math.random() * 40 + 80)}px`, // 80-120px
      "--cloud-before-height": `${Math.floor(Math.random() * 30 + 70)}px`, // 70-100px
      "--cloud-after-width": `${Math.floor(Math.random() * 40 + 100)}px`, // 100-140px
      "--cloud-after-height": `${Math.floor(Math.random() * 40 + 100)}px`, // 100-140px
      "--cloud-after-top": `${Math.floor(Math.random() * 20 - 65)}px`, // -65 a -45px
      // Para stars (span)
      "--star-size": `${Math.floor(Math.random() * 3 + 2)}px`, // 2-5px
      "--tail-width": `${Math.floor(Math.random() * 150 + 200)}px`, // 200-350px
      "--tail-height": `${Math.floor(Math.random() * 1 + 1)}px`, // 1-2px
      "--star-glow": `${Math.floor(Math.random() * 4 + 4)}px`, // 4-8px
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
  const style = useMemo(() => generateStyle(), []);
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
