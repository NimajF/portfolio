import Head from "next/dist/shared/lib/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

const notFound = () => (
  <>
    <Head>
      <title>Page Not Found - Benjamin</title>
    </Head>
    <Navbar />
    <div className="description" style={{ marginTop: "10rem" }}>
      <div className="header-info">
        <h1
          style={{
            alignSelf: "center",
            width: "50%",
            fontSize: "4rem",
            alignSelf: "center",
          }}
        >
          Ups! Error 404
        </h1>
        <h2>This page does not exist.</h2>
        <p className="p-text">Please return back.</p>
        <Link href="/">
          <button
            className="link-button"
            style={{
              fontSize: "1.1rem",
              marginTop: "1rem",
              alignSelf: "center",
            }}
          >
            Home
          </button>
        </Link>
      </div>
    </div>
  </>
);
export default notFound;
