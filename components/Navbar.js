import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <nav>
      <Link href="/">
        <a>Benjamin</a>
      </Link>
      <div className="nav-links">
        <Link href="/about">
          <a className={currentRoute === "/about" ? "active" : "" }>About</a>
        </Link>
        <Link href="/projects">
          <a className={currentRoute === "/projects" ? "active" : ""}>Projects</a>
        </Link>
        <Link href="/contact">
          <a className={currentRoute === "/contactd" ? "active" : ""}>Contact</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
