import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainStore from "./layout/store/Main";
import Dashboard from "./component/store/Dashboard";
import Profile from "./component/store/Profile";
import Home from "./component/front/Home";
import Login from "./component/front/auth/Login";
import Register from "./component/front/auth/Register";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/store" element={<MainStore />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
