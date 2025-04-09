<<<<<<< HEAD
import './App.css'
import Login from './pages/Auth/Login'
function App() {

  
  return (
    <>
     <Login/>
=======
import "./App.css";
import Login from "./pages/Auth/Login";
import Home from "./pages/Dashboard/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
>>>>>>> ea345b0de06738afa328caa226ea7aceb0c390d9
    </>
  );
}

export default App;
