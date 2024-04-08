import * as React from "react";
import { Home } from "./components/home/home";
import "bootstrap/dist/css/bootstrap.css";
import { Login } from "./components/login/login";
import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

function App() {
  return (
 
  <Router>
    <Routes>
    <Route path="/home" element={<Home />} />
    <Route path='/' element={<Login />} />
    </Routes> 
  </Router>
  )
}


export default App; 