import FloatingElement from "./FloatingElement";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import styles from "../styles/Home.module.css";

const DynamicElement = dynamic(() => import("./FloatingElement"), {
  ssr: false,
});

export default function FloatingElements() {
  const { theme } = useTheme();

  const elements =
    theme === "light"
      ? [
          // "<h1>",
          // "</h1>",
          // "<div>",
          // "</div>",
          // "<Benjamin>",
          // "</Benjamin>",
          // "<img>",
          // "<input>",
          // "<label>",
          <div />,
          <div />,
          <div />,
          <div />,
          <div />,
          <div />,
          <div />,
          <div />,
        ]
      : ["", "", "", "", "", "", "", ""];

  return (
    <div className={styles.area}>
      {elements.map((element, idx) => (
        <DynamicElement element={element} key={idx} theme={theme} />
      ))}
    </div>
  );
}
