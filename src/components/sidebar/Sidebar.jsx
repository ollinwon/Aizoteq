import React, { useState } from 'react';
import './Sidebar.css';
import logo from './side-img/logo.png'
import icon from './side-img/dashboard.png'
import Settings from '../settings/Settings';
import { useTheme } from '../theme/ThemeContext';
import { NavLink } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';



const Sidebar = ({ isSidebarVisible }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { theme } = useTheme()



  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (index) => {
    setSelectedItem(index === selectedItem ? null : index); // Toggle the selection
  };



  //  const [theme, setTheme] = useState('light');

  //   const handleThemeChange = (newTheme) => {
  //     setTheme(newTheme);
  //     document.documentElement.setAttribute('data-theme', newTheme);
  //   };


  // const menuItems = [
  //   { id: 0, label: "Dashboard", iconClass: "fa-solid fa-house",},
  //   { id: 1, label: "Products", iconClass: "fa-solid fa-arrow-trend-up", },
  //   { id: 2, label: "Billing", iconClass: "fas fa-wallet", },
  // ];

  return (
    <div className={`theme-main ${theme}-theme`}>
      <div className="sidebar-main" >
        <div className="sidebar-content-main">
          <div className="dash-p" >
          <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
                <i class="fa-solid fa-house"></i>
                <p >
                  Dashboard
                </p>
              </div>
            </NavLink>
          </div>
          <div className="dash-p" >
          <NavLink
              to="/device"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
              <i class="fa-solid fa-hard-drive"></i>
                <p >
                  Model
                </p>
              </div>
            </NavLink>
          </div>
          <div className="dash-p" >
          <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
                <i class="fa-solid fa-arrow-trend-up"></i>
                <p >
                  Product
                </p>
              </div>
            </NavLink>
          </div>
          <div className="dash-p" >
          <NavLink
              to="/thing"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
              <i class="fa-brands fa-windows"></i>
                <p >
                  Stock
                </p>
              </div>
            </NavLink>
          </div>
          <div className="dash-p" >
          <NavLink
              to="/bill"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
                <i class="fas fa-wallet"></i>
                <p >
                  Billing
                </p>
              </div>
            </NavLink>
          </div>
          <div className="dash-p" >
          <NavLink
              to="/customer"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
              <i class="fa-solid fa-users"></i>
                <p >
                  Customer
                </p>
              </div>
            </NavLink>
          </div>
          <div className="dash-p" >
          <NavLink
              to="/staff"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
              <i class="fa-solid fa-user-tie"></i>
                <p >
                  User Manage
                </p>
              </div>
            </NavLink>
          </div>
          <div className="dash-p" >
          <NavLink
              to="/raw"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
              <i class="fa-solid fa-screwdriver-wrench"></i>
                <p >
                 Raw Materials
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>

      {/* ............................................................................. Response ........................................................................ */}

      <div className={`sidebar-main1 ${isSidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-content-main">
          <div className="dash-p" >
          <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
                <i class="fa-solid fa-house"></i>
                <p >
                  Dashboard
                </p>
              </div>
            </NavLink>
          </div>
          <div className="dash-p" >
          <NavLink
              to="/device"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
              <i class="fa-solid fa-hard-drive"></i>
                <p >
                  Devices
                </p>
              </div>
            </NavLink>
            </div>
            <div className="dash-p" >
          <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
              <i class="fa-solid fa-arrow-trend-up"></i>
                <p >
                  Products
                </p>
              </div>
            </NavLink>
          </div>
          <div className="dash-p" >
          <NavLink
              to="/thing"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
              <i class="fa-brands fa-windows"></i>
                <p >
                  Thing
                </p>
              </div>
            </NavLink>
          </div>
          <div className="dash-p" >
          <NavLink
              to="/bill"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
              <i class="fas fa-wallet"></i>
                <p >
                  Billing
                </p>
              </div>
            </NavLink>
          </div>
          <div className="dash-p" >
          <NavLink
              to="/customer"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
              <i class="fa-solid fa-users"></i>
                <p >
                  Customer
                </p>
              </div>
            </NavLink>
          </div>
          
          <div className="dash-p" >
          <NavLink
              to="/staff"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
              <i class="fa-solid fa-user-tie"></i>
                <p >
                  User Manage
                </p>
              </div>
            </NavLink>
          </div>
          <div className="dash-p" >
          <NavLink
              to="/raw"
              className={({ isActive }) =>
                isActive ? 'dashboard active-link' : 'dashboard'
              }
            >
              <div className="p-tag">
              <i class="fa-solid fa-screwdriver-wrench"></i>
                <p >
                 Raw Materials
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
