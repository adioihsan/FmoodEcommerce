import "../../assets/store/css/sb-admin-2.css";
import Sidebar from "../../layout/store/Sidebar";
import TopBar from "../../layout/store/TopBar";
import Footer from "../../layout/store/Footer";
import { Outlet } from "react-router";

function Store() {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <TopBar />
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default Store;
