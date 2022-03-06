import Link from "next/link";
import Navbar from "../components/Navbar";

const notFound = () => (
   <>
    <Navbar/>
  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
    <h1>Error 404</h1>
    <h2>Ups...</h2>
    <p>This page does not exist.</p>
    <Link href="/">
      <button className="link-button" style={{ fontSize: "1.1rem" }} >Home</button>
    </Link>
  </div>
   </>
);
export default notFound;
