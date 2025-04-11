import "./App.css";
import Login from "./pages/Auth/Login";
import BorrowedHistory from "./pages/Dashboard/BorrowedHistory";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableDiplay from "./pages/Dashboard/TableDiplay";
import Home from "./pages/Dashboard/Home";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/booktable" element={<TableDiplay />} />
          <Route path="/home" element={<Home />} />
          <Route path="/borrowed" element={<BorrowedHistory />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
