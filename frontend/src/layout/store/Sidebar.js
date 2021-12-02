// import { Link } from "react-router-dom";
import $ from "jquery";
const Sidebar = () => {
  return (
    <ul
      class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div class="sidebar-brand-icon">
          <img src="/logo-fmood-white-64.png" />
        </div>
        <div class="sidebar-brand-text mr-5 ml-1">
          Fmood <sup>Store</sup>
        </div>
      </a>

      {/* <!-- Divider --> */}
      <hr class="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li class="nav-item active">
        <a class="nav-link" href="/store/dashboard">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      {/* <!-- Divider --> */}
      <hr class="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div class="sidebar-heading">Produk</div>

      {/* <!-- Nav Item - Pages Collapse Menu --> */}

      {/* <!-- Nav Item - Utilities Collapse Menu --> */}

      {/* <!-- Divider --> */}

      {/* <!-- Heading --> */}

      {/* <!-- Nav Item - Pages Collapse Menu --> */}

      {/* <!-- Nav Item - Charts --> */}
      {/* <!-- Nav Item - Tables --> */}

      {/* <!-- Divider --> */}

      {/* <!-- Sidebar Toggler (Sidebar) --> */}

      {/* <!-- Sidebar Message --> */}
    </ul>
  );
};
export default Sidebar;
