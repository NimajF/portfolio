import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useAuth } from "../context/authContext";
import ThemeChanger from "./ThemeChanger";

const Navbar = () => {
  const [sticky, setSticky] = useState("relative");
  const { isLogged } = useAuth();
  const { setTheme } = useTheme();
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    if (currentRoute !== "/") {
      setTheme("dark");
    }
  }, [currentRoute, setTheme]);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 200 ? setSticky("stickyNavbar") : setSticky("relative");
    }
  };

  return (
    <nav className={sticky}>
      <Link href="/" passHref legacyBehavior>
        <div className="personal-logo">
          <h4>BENJAMIN</h4>
          <p>Full-Stack Developer</p>
        </div>
      </Link>
      {currentRoute === "/" && <ThemeChanger />}
      <div className="nav-links">
        {isLogged ? (
          <Link href="/dashboard" legacyBehavior>
            <a className={currentRoute === "/dashboard" ? "active" : ""}>
              Dashboard
            </a>
          </Link>
        ) : null}
        <Link href="/about" legacyBehavior>
          <a className={currentRoute === "/about" ? "active" : ""}>About</a>
        </Link>
        <Link href="/projects" legacyBehavior>
          <a className={currentRoute === "/projects" ? "active" : ""}>
            Projects
          </a>
        </Link>
        <Link href="/contact" legacyBehavior>
          <a className={currentRoute === "/contact" ? "active" : ""}>Contact</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
