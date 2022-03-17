import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme("light");

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      {/* The current theme is: {theme} */}
      {theme === "light" ? (
        <button className="theme-button" onClick={() => setTheme("dark")}>
          <BsFillMoonFill />
        </button>
      ) : (
        <button className="theme-button" onClick={() => setTheme("light")}>
          <BsSunFill />
        </button>
      )}
      {/* <button className="theme-button" onClick={() => setTheme("dark")}>
        <BsFillMoonFill />
      </button> */}
      {/* <button className="theme-button" onClick={() => setTheme("light")}>
        <BsSunFill />
      </button> */}
      {/* <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button> */}
    </div>
  );
};
export default ThemeChanger;
