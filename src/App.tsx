import "./App.css";
import Login from "./pages/Auth/Login";
import BorrowedHistory from "./pages/Dashboard/BorrowedHistory";
import Home from "./pages/Dashboard/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/borrowed" element={<BorrowedHistory />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
