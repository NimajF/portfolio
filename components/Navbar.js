import Link from "next/link";

const Navbar = () => (
    <nav>
         <Link href="/" ><a>Home</a></Link>   
         <Link href="/about" ><a>About</a></Link>
         <Link href="/projects"><a>My Projects</a></Link>
         <Link href="/contact"><a>Contact me</a></Link>
    </nav>
)

export default Navbar;
