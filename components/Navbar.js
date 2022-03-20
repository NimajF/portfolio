import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ThemeChanger from "./ThemeChanger";
import Link from "next/link";

const Navbar = () => {
  const [sticky, setSticky] = useState("relative");

  const router = useRouter();
  const currentRoute = router.pathname;

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
      <Link href="/">
        <div className="personal-logo">
          <h4>BENJAMIN</h4>
          <p>Front-End Developer</p>
        </div>
      </Link>
      <ThemeChanger />
      <div className="nav-links">
        <Link href="/about">
          <a className={currentRoute === "/about" ? "active" : ""}>About</a>
        </Link>
        <Link href="/projects">
          <a className={currentRoute === "/projects" ? "active" : ""}>
            Projects
          </a>
        </Link>
        <Link href="/contact">
          <a className={currentRoute === "/contact" ? "active" : ""}>Contact</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
