import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/user/homepage';
import Login from './components/user/login';
import Register from './components/user/register'; 
import Pricelist from './components/user/priceList';
import Braces from './components/user/braces';
import TopScroll from './components/user/topScroll';
import News from './components/user/news';
import NewsImplant from './components/user/newsImplant';
import Admin from './components/admin/admin';
import Doctor from './components/doctor/doctor';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />   
          <Route path="/braces" element={<Braces />} />  
          <Route path="/priceList" element={<Pricelist />} />
          <Route path="/news" element={<News />} />
          <Route path="/newsImplant" element={<NewsImplant />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/doctor" element={<Doctor />} />
        </Routes>
        <TopScroll />
      </div>
    </Router>
  );
}

export default App;
