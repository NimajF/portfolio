import Link from "next/link";
import { socialIcons } from "../constants/iconList";

const Footer = () => (
  <footer>
    <div className="footer-links">
      <ul>
        <p className="footer-title">Benjamin</p>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/projects">
            <a>Projects</a>
          </Link>
        </li>
      </ul>

      <ul className="footer-socialIcons">
        <p className="footer-title">Social</p>
        {socialIcons
          .filter((icon) => icon.name !== "Mail")
          .map((filteredIcon, idx) => (
            <li key={idx} >
              <Link href={`${filteredIcon.link}`}>
                <a>
                  {filteredIcon.icon}
                    <> </>
                  {filteredIcon.name}
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
    <p>© Benjamin Francisco. All Rights Reserved.</p>
  </footer>
);
export default Footer;
