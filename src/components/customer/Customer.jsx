import React, { useEffect, useState } from 'react';
import './Customer.css';
import { useTheme } from '../theme/ThemeContext';
import DataTable from 'react-data-table-component';

const Customer = () => {
  const { theme } = useTheme();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSlide, setShowSlide] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Customers'); // Default filter

  const handleSlide = () => {
    setShowSlide((prev) => !prev);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowSlide(false); // Close the slide menu after selection
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = '';
        if (selectedFilter === 'Customers') {
          endpoint = `/dashboard/api/display/party/customers?query=${searchQuery}`;
        } else if (selectedFilter === 'Online Customers') {
          endpoint = `/dashboard/api/display/party/onlinecustomer?query=${searchQuery}`;
        } else if (selectedFilter === 'Dealers') {
          endpoint = `/dashboard/api/display/party/dealers?query=${searchQuery}`; // Dealers API
        }
  
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [searchQuery, selectedFilter]);

  let customertype = '';
  if (selectedFilter === 'Customers'){
    customertype = 'Customers Details';
  } else if (selectedFilter === 'Online Customers'){
    customertype = 'Online Customers';
  }else if(selectedFilter === 'Dealers'){
    customertype = 'Dealers Details';
  }


  const columns = [
    { name: 'ID',
      selector: (row, index) => index + 1, sortable: true },
    { name: 'Name', selector: (row) => row.name || 'null', sortable: true },
    { name: 'Address', selector: (row) => row.address || 'null', sortable: true },
    { name: 'Phone', selector: (row) => row.phone || 'null', sortable: true },
    { name: 'Alt Phone', selector: (row) => row.alt_phone || 'null', sortable: true },
    { name: 'Total Amount', selector: (row) => row.total_amount || 'null', sortable: true },
    { name: 'Balance', selector: (row) => row.balance || 'null', sortable: true },
    { name: 'Last Modified', selector: (row) => row.lastmodified || 'null', sortable: true },
    { name: 'Email', selector: (row) => row.email || 'null', sortable: true },
    { name: 'Paid Amount', selector: (row) => row.paid_amount || 'null', sortable: true },
    { name: 'Refund Amount', selector: (row) => row.refund_amount || 'null', sortable: true },
  ];

  return (
    <div className={`customer-main ${theme}-theme`}>
      <div className="dash-dummy"></div>
      <div className="customer-content-main">
        <div className="customer-content-nav">
          <div className="customer-content-head">
            <p>{customertype}</p>
          </div>
          <div className="customer-content-items">
            <div className="device-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <i className="fa-solid fa-sliders" onClick={handleSlide}></i>
              {showSlide && (
                <div className="customer-slide-menu show">
                  {['Customers', 'Online Customers','Dealers'].map((filter) => (
                    <div
                      key={filter}
                      className="thing-slide-item"
                      onClick={() => handleFilterChange(filter)}
                    >
                      <span>{filter}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={data} fixedHeader pagination />
      </div>
    </div>
  );
};

export default Customer;
