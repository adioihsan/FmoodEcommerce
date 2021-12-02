import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import MainStore from "./layout/store/Main";
import Dashboard from "./component/store/Dashboard";
import Profile from "./component/store/Profile";
import Home from "./component/front/Home";
import Login from "./component/front/auth/Login";
import Register from "./component/front/auth/Register";
import axios from "axios";
import serverUrls from "./serverUrls";
import StoreRoute from "./routes/StoreRoute";
import AddProduct from "./component/store/AddProduct";
import Store from "./component/store/Store";
axios.defaults.baseURL = serverUrls.backend;
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  let isLogin = localStorage.getItem("auth_token") ? true : false;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isLogin ? <Home /> : <Login />} />
          <Route path="/register" element={isLogin ? <Home /> : <Register />} />
          <Route path="/store" element={<StoreRoute Cmp={Store} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
