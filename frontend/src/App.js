import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainDashboard from "./component/store/Main";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/store/dashboard" element={<MainDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
