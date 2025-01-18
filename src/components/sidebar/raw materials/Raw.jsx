import React, { useEffect, useState } from 'react';
import './Raw.css';
import { useTheme } from '../../theme/ThemeContext';
import DataTable from 'react-data-table-component';
import { data } from 'react-router-dom';

const Raw = () => {
  const { theme } = useTheme();

  const [rawMaterials, setRawMaterials] = useState([]); // State to store raw materials
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [editData, setEditData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [devices, setDevices] = useState([]);
  const [newRawMaterial, setNewRawMaterial] = useState({
    component: "",
    category: "",
    stock_quantity: "",
    reorder_level: "",
    package: "",
    unit_price_in_rupees: "",
    unit_price_in_dollars: "",
    imageFile: null,
  });



  const handleAdd = () => {
    setAddPopup(true)
  }

  const handleEdit = (row) => {
    setEditData(row);
    setShowPopup(true);
  };
  // Fetch raw materials from the backend
  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await fetch('/dashboard/api/raw_materials');
        if (!response.ok) {
          throw new Error('Failed to fetch raw materials');
        }
        const data = await response.json();
        setRawMaterials(data.raw_materials || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    //  const ID = data.map((row, index) => ({ ...row, id: index + 1 }));

    fetchRawMaterials();
  }, []);


  const handleDeleteClick = (row) => {
    setDeleteData(row);
    setDeletePopup(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      await fetch(`/dashboard/api/raw_materials/delete/${deleteData.id}`, {
        method: "DELETE",
      });
      setDevices(devices.filter((device) => device.id !== deleteData.id));
      setDeletePopup(false);
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };


  const handleCloseDeletePopup = () => {
    setDeletePopup(false);
    setDeleteData(null);
  };

  const handleAddSave = async () => {
    const formData = new FormData();
    formData.append("Component", newRawMaterial.component);
    formData.append("category", newRawMaterial.category);
    formData.append("stock_quantity", newRawMaterial.stock_quantity);
    formData.append("reorder_level", newRawMaterial.reorder_level);
    formData.append("package", newRawMaterial.package);
    formData.append("unit_price_in_rupees", newRawMaterial.unit_price_in_rupees);
    formData.append("unit_price_in_dollars", newRawMaterial.unit_price_in_dollars);

    if (newRawMaterial.imageFile) {
      formData.append("image", newRawMaterial.imageFile);
    }

    try {
      const response = await fetch('/dashboard/api/raw_materials/create', {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add raw material");
      }

      const newMaterial = await response.json();
      setRawMaterials([...rawMaterials, { ...newMaterial, id: rawMaterials.length + 1 }]); // Update state with new material
      setAddPopup(false); // Close the popup
    } catch (err) {
      console.error("Error adding raw material:", err);
      alert(`Failed to save changes: ${err.message}`);
    }
  };



  const handleSave = async () => {
    if (!editData) {
      alert("No data to save.");
      return;
    }

    const formData = new FormData();
    formData.append("component", editData.component || "");
    formData.append("category", editData.category || "");
    formData.append("stock_quantity", editData.stock_quantity || "");
    formData.append("reorder_level", editData.reorder_level || "");
    formData.append("package", editData.package || "");
    formData.append("unit_price_in_rupees", editData.unit_price_in_rupees || "");
    formData.append("unit_price_in_dollars", editData.unit_price_in_dollars || "");

    if (editData.imageFile) {
      formData.append("image", editData.imageFile);
    }

    try {
      const response = await fetch(`/dashboard/api/raw_materials/update/${editData.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update raw material");
      }

      const updatedMaterial = await response.json();

      // Update the state to reflect changes
      setRawMaterials((prevMaterials) =>
        prevMaterials.map((material) =>
          material.id === editData.id ? { ...material, ...updatedMaterial } : material
        )
      );

      setShowPopup(false); // Close the popup
    } catch (err) {
      console.error("Error updating raw material:", err);
      alert(`Failed to save changes: ${err.message}`);
    }
  };




  const columns = [
    {
      name: 'ID',
      selector: (row, index) => index + 1, // Add 1 to make it 1-based index
      sortable: false, // Index is not sortable as it's tied to position
    },
    {
      name: 'Image',
      selector: (row) => row.image || 'N/A',
      sortable: true,
      cell: (row) =>
        row.image ? (
          <img
            src={
              row.image.startsWith('http')
                ? row.image
                : `http://localhost:5000${row.image}`
            }
            alt="Profile"
            style={{ width: 40, height: 40, borderRadius: '50%' }}
            onError={(e) => {
              e.target.src = '/path/to/default-image.jpg'; // Fallback image
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
    { name: 'Component', selector: (row) => row.component || 'null', sortable: true },
    { name: 'Category', selector: (row) => row.category || 'null', sortable: true },
    // { name: 'Value', selector: (row) => row.value || 'null', sortable: true },
    // { name: 'Reference', selector: (row) => row.reference_no || 'null', sortable: true },
    { name: 'Stock', selector: (row) => row.stock_quantity || 'null', sortable: true },
    { name: 'Reorder', selector: (row) => row.reorder_level || 'null', sortable: true },
    { name: 'Package', selector: (row) => row.package || 'null', sortable: true },
    { name: 'IND', selector: (row) => row.unit_price_in_rupees || 'null', sortable: true },
    { name: 'USD', selector: (row) => row.unit_price_in_dollars || 'null', sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div className="device-action-btn">
          <button className="action-button" onClick={() => handleEdit(row)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="action-button" >
            <i className="fa-solid fa-trash-can" onClick={() => handleDeleteClick(row)}></i>
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div className={`raw-main ${theme}-theme`}>Loading...</div>;
  }

  if (error) {
    return <div className={`raw-main ${theme}-theme`}>Error: {error}</div>;
  }

  return (
    <div className={`raw-main ${theme}-theme`}>
      <div className="dash-dummy"></div>
      <div className="raw-content-main">
        <div className="raw-content-nav">
          <div className="raw-content-head">
            <p>Raw Materials</p>
          </div>
          <div className="raw-content-items">
            <div className="device-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="search" placeholder="Search..." />
            </div>
            <i className="fa-regular fa-square-plus add-model-icon" onClick={handleAdd}></i>
            {addPopup && (
  <div className="raw-add-popup-overlay">
    <div className="raw-add-popup-content">
      <button
        className="raw-add-popup-close"
        onClick={() => setAddPopup(false)}
      >
        <i className="fa-solid fa-x"></i>
      </button>
      <h3>Add New Raw Material</h3>
      <div className="raw-add-input">
        <label htmlFor="add-image">Image:</label>
        <input
          type="file"
          id="add-image"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setNewRawMaterial({ ...newRawMaterial, imageFile: file, imageUrl });
            }
          }}
        />
        <img
          src={newRawMaterial.imageUrl || ""}
          alt="Uploaded Preview"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "50%",
            display: newRawMaterial.imageUrl ? "block" : "none",
          }}
        />
        <div
          className="raw-change-img-btn"
          onClick={() => document.getElementById("add-image").click()}
        >
          <p>Upload Photo</p>
        </div>
      </div>
      <div className="raw-add-input">
        <label>Component:</label>
        <input
          type="text"
          onChange={(e) =>
            setNewRawMaterial({ ...newRawMaterial, component: e.target.value })
          }
        />
      </div>
      <div className="raw-add-input">
        <label>Category:</label>
        <input
          type="text"
          onChange={(e) =>
            setNewRawMaterial({ ...newRawMaterial, category: e.target.value })
          }
        />
      </div>
      <div className="raw-add-input">
        <label>Stock:</label>
        <input
          type="number"
          onChange={(e) =>
            setNewRawMaterial({ ...newRawMaterial, stock_quantity: e.target.value })
          }
        />
      </div>
      <div className="raw-add-input">
        <label>Reorder Level:</label>
        <input
          type="number"
          onChange={(e) =>
            setNewRawMaterial({ ...newRawMaterial, reorder_level: e.target.value })
          }
        />
      </div>
      <div className="raw-add-input">
        <label>Package:</label>
        <input
          type="text"
          onChange={(e) =>
            setNewRawMaterial({ ...newRawMaterial, package: e.target.value })
          }
        />
      </div>
      <div className="raw-add-input">
        <label>IND Price:</label>
        <input
          type="number"
          onChange={(e) =>
            setNewRawMaterial({
              ...newRawMaterial,
              unit_price_in_rupees: e.target.value,
            })
          }
        />
      </div>
      <div className="raw-add-input">
        <label>USD Price:</label>
        <input
          type="number"
          onChange={(e) =>
            setNewRawMaterial({
              ...newRawMaterial,
              unit_price_in_dollars: e.target.value,
            })
          }
        />
      </div>
      <button className="raw-add-popup-save" onClick={handleAddSave}>
        Save
      </button>
    </div>
  </div>
)}


          </div>
        </div>
        <DataTable columns={columns} data={rawMaterials} fixedHeader pagination />
        {deletePopup && (
          <div className="delete-popup-overlay">
            <div className="delete-popup-content">
              <p>Are you sure you want to delete this device?</p>
              <div className="delete-popup-btn">
                <button className="delete-popup-confirm" onClick={handleDeleteConfirm}>
                  Confirm
                </button>
                <button className="delete-popup-cancel" onClick={handleCloseDeletePopup}>
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

        {showPopup && (
          <div className="raw-popup-overlay">
            <div className="raw-popup-content">
              <button
                className="raw-popup-close"
                type="button"
                onClick={() => setShowPopup(false)}
              >
                <i className="fa-solid fa-x"></i>
              </button>
              <form className="raw-popup-input">
                <div className="raw-popup-image">
                  <img
                    src={editData?.image || "/path/to/default-image.jpg"}
                    alt="Profile"
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                  <input
                    type="file"
                    id="upload-image-input"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setEditData({ ...editData, image: reader.result, imageFile: file });
                        };
                        reader.readAsDataURL(file); // Convert file to base64 for preview
                      }
                    }}
                  />
                  <div
                    className="raw-change-img-btn"
                    onClick={() => document.getElementById("upload-image-input").click()}
                  >
                    <p>Change Photo</p>
                  </div>
                </div>

                <div>
                  <label>Stock :</label> <br />
                  <input
                    type="text"
                    value={editData?.stock_quantity || ""}
                    onChange={(e) => setEditData({ ...editData, stock_quantity: e.target.value })}
                  />
                </div>
                <div>
                  <label>Reorder :</label> <br />
                  <input
                    type="text"
                    value={editData?.reorder_level || ""}
                    onChange={(e) => setEditData({ ...editData, reorder_level: e.target.value })}
                  />
                </div>
                <div>
                  <label>IND :</label> <br />
                  <input
                    type="text"
                    value={editData?.unit_price_in_rupees || ""}
                    onChange={(e) => setEditData({ ...editData, unit_price_in_rupees: e.target.value })}
                  />
                </div>
                <div>
                  <label>USD :</label> <br />
                  <input
                    type="text"
                    value={editData?.unit_price_in_dollars || ""}
                    onChange={(e) => setEditData({ ...editData, unit_price_in_dollars: e.target.value })}
                  />
                </div>

              </form>
              <button
                type="button"
                className="raw-add-popup-save"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Raw;
