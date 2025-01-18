import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Nav from './components/nav/Nav';
import Dash from './components/dashbord/Dash';
import Product from './components/products/Product';
import { ThemeProvider } from './components/theme/ThemeContext';
import Bill from './components/billing/Bill';
import Settings from './components/settings/Settings';
import Devices from './components/devices/Devices';
import Profile from './components/profile/Profile';
import Thing from './components/thing/Thing';
import Customer from './components/customer/Customer';
import Dealer from './components/dealers/Dealer';
import Staff from './components/staff/Staff';
import Raw from './components/sidebar/raw materials/Raw';

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <ThemeProvider>
      <Router>
        <Nav toggleSidebar={toggleSidebar} />
        <Sidebar isSidebarVisible={isSidebarVisible} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dash />} />
            <Route path="/products" element={<Product />} />
            <Route path="/device" element={<Devices />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/thing' element={<Thing/>}/>
            <Route path='/customer' element={<Customer/>}/>
            <Route path='/dealers' element={<Dealer/>}/>
            <Route path='/staff' element={<Staff/>}/>
            <Route path='/raw' element={<Raw/>}/>
          </Routes>
        </div>
        <Settings />
      </Router>
    </ThemeProvider>
  );
}

export default App;
