import React, { useState } from 'react';
import Nav from './components/nav/Nav';
import Sidebar from './components/sidebar/Sidebar';
import Settings from './components/settings/Settings';

const Layout = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div>
      <Nav toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex' }}>
        <Sidebar isSidebarVisible={isSidebarVisible} />
        <div style={{ flex: 1, padding: '20px' }}>
          {children} {/* Render the main content here */}
        </div>
        <Settings />
      </div>
    </div>
  );
};

export default Layout;
