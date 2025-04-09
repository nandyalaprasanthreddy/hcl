
import './App.css'
import Login from './pages/Auth/Login';
import Home from "./pages/Dashboard/Home"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
 

  return (
    <>
   {/* <Login/> */}
   <Router>
      <Routes>
        {/* Route for the login form */}
        <Route path="/login" element={<Login />} />

        {/* Route for the home page (only accessible after login) */}
        <Route path="/home" element={<Home />} />
        {/* <Route path="/borrow" element={<BorrowBook />}/>
        <Route path="/return" element={<ReturnBook />}/> */}
        {/* Optional: Redirect the root path to the login page */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
