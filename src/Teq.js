// import React, { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Sidebar from './components/sidebar/Sidebar';
// import Nav from './components/nav/Nav';
// import Dash from './components/aizo-teq/dashbord/Dash';
// import Product from './components/aizo-teq/products/Product';
// import { ThemeProvider } from './components/theme/ThemeContext';
// import Bill from './components/aizo-teq/billing/Bill';
// import Settings from './components/settings/Settings';
// import Devices from './components/aizo-teq/devices/Devices';

// const Teq = () => {
//   const [isSidebarVisible, setSidebarVisible] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarVisible((prev) => !prev);
//   };

//   return (
//     <div>
//       <ThemeProvider>
//         <Nav toggleSidebar={toggleSidebar} />
//         <Sidebar isSidebarVisible={isSidebarVisible} />
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<Dash />} />
//             <Route path="/products" element={<Product />} />          
//             <Route path='/device' element={<Devices/>}/>
//             <Route path="/bill" element={<Bill/>} />
//           </Routes>
//         </div>
//         <Settings/>
//       </ThemeProvider>
//     </div>
//   );
// };

// export default Teq;
