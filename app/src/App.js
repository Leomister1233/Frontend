import './/App.css'

import {BrowserRouter as Router, Route, Routes } from'react-router-dom'
import React, {useState} from 'react';

//import { useState, useEffect } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./componentes/Navigation";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Users from "./pages/Users";
import UsersId from "./pages/UsersId";
import Book from "./pages/Book";
import Footer from './componentes/Footer';
import { useEffect } from 'react';

function App() {
    const [userData, setUserData]= useState()

    useEffect(()=>{

    })

    return (
        <div className="App">
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/:id" element={<UsersId />} />
              <Route path="/book/:id" element={<Book />} />
            </Routes>
            <Footer />
          </Router>
        </div>
        
      );
    }
    
export default App;


