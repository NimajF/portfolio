import Link from "next/link";
import { socialIcons } from "../constants/iconList";

const Footer = () => (
  <footer>
    <div className="footer-links">
      <ul>
        <p className="footer-title">Benjamin</p>
        <li>
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about" legacyBehavior>
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/projects" legacyBehavior>
            <a>Projects</a>
          </Link>
        </li>
      </ul>

      <ul className="footer-socialIcons">
        <p className="footer-title">Social</p>
        {socialIcons
          .filter((icon) => icon.name !== "Mail")
          .map((filteredIcon, idx) => (
            <li key={idx}>
              <Link href={`${filteredIcon.link}`} legacyBehavior>
                <a target="_blank">
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
