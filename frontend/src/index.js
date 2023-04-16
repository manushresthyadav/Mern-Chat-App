import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from "./components/Register"
import {BrowserRouter as Router  , Routes, Route} from "react-router-dom"
import Login from "./components/Login"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

    <Router>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/main' element={ <App />}>
      
        </Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
   
    </Router>
  
);


