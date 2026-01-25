import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith("/dashboard");

  return (
    <>
      <Navbar />
      <main
        className={isDashboard ? undefined : "mainContainer"}
        style={{ overflowX: "hidden", minHeight: "100vh" }}
      >
        {isDashboard ? children : <div className="container">{children}</div>}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
