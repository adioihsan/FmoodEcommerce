import "../../assets/store/css/styles.css";
import "../../assets/store/js/scripts";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
const Main = () => {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>The content</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Main;
