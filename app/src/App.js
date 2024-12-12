import './/App.css'

import {BrowserRouter as Router, Route, Routes } from'react-router-dom'

//import { useState, useEffect } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./componentes/Navigation";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Users from "./pages/Users";
import Book from "./pages/Book";
import Footer from './componentes/Footer';

function App() {
    

    return (
        <div className="App">
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/users" element={<Users />} />
              <Route path="/book/:id" element={<Book />} />
            </Routes>
            <Footer />
          </Router>
        </div>
        
      );
    }
    
export default App;


