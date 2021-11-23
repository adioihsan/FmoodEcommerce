import Dashboard from "../component/store/Dashboard";
import Profile from "../component/store/Profile";

const Routes = [
  { path: "/store", exact: true, name: "Store" },
  {
    path: "/store/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  { path: "/store/profile", exact: true, name: "store", component: Profile },
];
export default Routes;
