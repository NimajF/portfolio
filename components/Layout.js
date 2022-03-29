import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className="mainContainer" style={{ overflowX: "hidden" }}>
      <div className="container">{children}</div>
    </main>
    <Footer />
  </>
);

export default Layout;
