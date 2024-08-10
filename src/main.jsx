import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './home/index.jsx';
import Contact from './contact/index.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/contact" element={<Contact />} ></Route>
      </Routes>
    </Router>
    {/* <App /> */}
  </React.StrictMode>,
)
