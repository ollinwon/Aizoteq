import React, { useEffect, useState } from 'react';
import './Staff.css';
import { useTheme } from '../theme/ThemeContext';
import DataTable from 'react-data-table-component';

const Staff = () => {
  const { theme } = useTheme();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showSlide, setShowSlide] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('admin');
  const [editData, setEditData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState(''); // State for selected role in popup

  const handleEdit = (row) => {
    setEditData(row);
    setSelectedRole(row.userrole); // Default to the current role
    setShowPopup(true);
  };

  const handleSlide = () => {
    setShowSlide((prev) => !prev);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowSlide(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const endpoint = `/dashboard/api/display/users/${selectedFilter.toLowerCase()}?search=${search}`;
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch users');
        const result = await response.json();
        setData(result.users);
        setFilteredData(result.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [search, selectedFilter]);

  const handleSave = async () => {
    if (!editData) return;
    
    const allowedRoles = ['admin', 'staff', 'customer', 'dealers'];
    if (!allowedRoles.includes(selectedRole)) {
      alert(`Invalid role selected. Allowed roles: ${allowedRoles.join(', ')}`);
      return;
    }
  
    const confirmAction = window.confirm('Are you sure you want to update the user role?');
    if (confirmAction) {
      try {
        const response = await fetch(`/dashboard/api/users/${editData.id}/role`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userRole: selectedRole }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update role');
        }
  
        const result = await response.json();
        console.log('Update response:', result);
  
        // Update local state
        const updatedData = data.map((user) =>
          user.id === editData.id ? { ...user, userrole: selectedRole } : user
        );
        setData(updatedData);
        setFilteredData(updatedData);
        setShowPopup(false);
      } catch (error) {
        console.error('Error updating user role:', error);
        alert(`Failed to update role. Error: ${error.message}`);
      }
    }
  };
  
  
  

  const columns = [
    {
      name: 'ID',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Image',
      selector: (row) => row.profilepic || 'N/A',
      sortable: true,
      cell: (row) =>
        row.profilepic ? (
          <img
            src={
              row.profilepic.startsWith('http')
                ? row.profilepic
                : `http://localhost:5000${row.profilepic}`
            }
            alt="Profile"
            style={{ width: 40, height: 40, borderRadius: '50%' }}
            onError={(e) => {
              e.target.src = '/path/to/default-image.jpg';
            }}
          />
        ) : (
          <div
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#ccc',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '0.8em', color: '#555' }}>N/A</span>
          </div>
        ),
    },
    { name: 'Name', selector: (row) => row.name || 'N/A', sortable: true },
    { name: 'User Name', selector: (row) => row.username || 'N/A', sortable: true },
    { name: 'Role', selector: (row) => row.userrole || 'N/A', sortable: true },
    {
      name: 'Last Modified',
      selector: (row) => new Date(row.lastmodified).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="device-action-btn">
          <button className="action-button" onClick={() => handleEdit(row)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={`user-main ${theme}-theme`}>
      <div className="dash-dummy"></div>
      <div className="user-content-main">
        <div className="user-content-nav">
          <div className="user-nav-head">
            <p>{selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Details</p>
          </div>
          <div className="user-nav-items">
            <div className="device-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <i className="fa-solid fa-sliders" onClick={handleSlide}></i>
              {showSlide && (
                <div className="customer-slide-menu show">
                  {['admin', 'staff', 'dealers', 'customer'].map((filter) => (
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
        <DataTable columns={columns} data={filteredData} pagination />
        {showPopup && (
          <div className="user-popup-overlay">
            <div className="user-popup-content">
              <button
                className="user-popup-close"
                type="button"
                onClick={() => setShowPopup(false)}
              >
                <i className="fa-solid fa-x"></i>
              </button>

              <div className="user-popup-dropdown">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="dealers">Dealers</option>
                  <option value="customer">Customer</option>
                </select>
              </div>

              <button type="button" className="user-popup-save" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Staff;
