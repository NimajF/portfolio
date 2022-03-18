import { useRouter } from "next/router";
import ThemeChanger from "./ThemeChanger";
import Link from "next/link";

const Navbar = () => {
  // const [click, setClick] = useState();

  // const handleClick = () => {

  // }

  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <nav>
      <Link href="/">
        <div className="personal-logo">
          <h4>BENJAMIN</h4>
          <p>Front-End Developer</p>
        </div>
      </Link>
      <ThemeChanger />
      {/* <button className="theme-button">
        <BsFillMoonFill />
      </button> */}
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
