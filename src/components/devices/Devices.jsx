import React, { useEffect, useState } from "react";
import "./Devices.css";
import { useTheme } from "../theme/ThemeContext";
import DataTable from "react-data-table-component";

const Devices = () => {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  const [editData, setEditData] = useState(null);
  const [devices, setDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false)
  const [rawMaterials, setRawMaterials] = useState([]);
  const [newRawMaterial, setNewRawMaterial] = useState({
    component: "",
    required_qty: "",
  });
  
  const [newModel, setNewModel] = useState({
    model: "",
    mrp: "",
    retail_price: "",
    sgst: "",
    cgst: "",
    igst: "",
    discount: "",
    warranty_period: "",
  });


  const fetchDevices = async (query = "") => {
    try {
      const response = await fetch(`/dashboard/api/display/prices-table?search=${query}`);
      const data = await response.json();
      setDevices(data);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const fetchRawMaterials = async (modelId) => {
    try {
      const response = await fetch(`/dashboard/api/model/${modelId}`);
      const data = await response.json();
      if (response.ok) {
        setRawMaterials(data.raw_materials);
        setEditPopup(true);
      } else {
        console.error("Error fetching raw materials:", data.error);
      }
    } catch (error) {
      console.error("Error fetching raw materials:", error);
    }
  };


  useEffect(() => {
    fetchDevices(searchQuery);
  }, [searchQuery]);

  const handleEdit = (row) => {
    setEditData(row);
    setShowPopup(true);
  };

  const handleEditPopup = (row) => {
    setEditData(row);
    setEditPopup(true)
  }


  const handleDeleteClick = (row) => {
    setDeleteData(row);
    setDeletePopup(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(`/dashboard/api/delete/price_table/${deleteData.id}`, {
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const validateWarrantyPeriod = (warranty) => {
    const validFormat = /^(?:(\d+)\s+years?)?\s*(?:(\d+)\s+months?)?$/i;
    return validFormat.test(warranty);
  };

  const handleSaveEdit = async () => {
    const { id, warranty_period, ...updateData } = editData;

    if (!validateWarrantyPeriod(warranty_period)) {
      alert("Invalid warranty period format. Use formats like '2 years', '6 months', or '1 year 6 months'.");
      return;
    }
    if (!newModel.sgst || !newModel.cgst || !newModel.igst) {
      alert("Please provide valid tax values.");
      return;
    }

    try {
      const response = await fetch(`/dashboard/api/update/price_table/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updateData, warranty_period }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update device: ${errorMessage}`);
      }

      const updatedDevice = await response.json();
      setDevices((prevDevices) =>
        prevDevices.map((device) => (device.id === updatedDevice.id ? updatedDevice : device))
      );
      setShowPopup(false);
      setEditData(null);
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };


  const handleAddNewModel = async () => {
    console.log("New Model Data:", newModel); // Debugging

    try {
      const response = await fetch(`/dashboard/api/create/price_table`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newModel),
      });

      if (!response.ok) {
        throw new Error("Failed to add new model");
      }

      const addedDevice = await response.json();
      setDevices([...devices, addedDevice]);
      setAddPopup(false);
      setNewModel({
        model: "",
        mrp: "",
        retail_price: "",
        sgst: "",
        cgst: "",
        igst: "",
        discount: "",
        warranty_period: "",
      });
    } catch (error) {
      console.error("Error adding new model:", error);
    }
  };

  const handleAddRawMaterial = async () => {
    const { component, required_qty } = newRawMaterial;
    
    if (!component || !required_qty) {
      alert("Please provide both Raw Material ID and Required Quantity.");
      return;
    }
    
    try {
      const response = await fetch(`/dashboard/api/model/${editData.id}/add-raw-material`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ component, required_qty }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to add raw material.");
      }
  
      // Refresh raw materials list after successful addition
      fetchRawMaterials(editData.id);
  
      // Clear the input fields
      setNewRawMaterial({ component: "", required_qty: "" });
    } catch (error) {
      console.error("Error adding raw material:", error);
      alert("Error adding raw material. Please try again.");
    }
  };
  

  const abc = [
    {
      name: 'ID',
      selector: (row, index) => index + 1, sortable: true
    },
    {
      name: "Image", selector: (row) => row.image, sortable: true
    },
    {
      name: "Component", selector: (row) => row.component, sortable: true
    },
    {
      name: "Required Qty", selector: (row) => row.required_qty, sortable: true
    }
  ]

  const def = [
    {
      image: "edcevre",
      component: 'sensor',
      required_qty: 2,
    },
  ]


  const columns = [
    {
      name: 'ID',
      selector: (row, index) => index + 1, sortable: true
    },
    { name: "Model", selector: (row) => row.model, sortable: true },
    { name: "MRP", selector: (row) => row.mrp, sortable: true },
    { name: "Retail Price", selector: (row) => row.retail_price, sortable: true },
    { name: "sgst", selector: (row) => row.sgst, sortable: true },
    { name: "cgst", selector: (row) => row.cgst, sortable: true },
    { name: "igst", selector: (row) => row.igst, sortable: true },
    { name: "Discount", selector: (row) => row.discount, sortable: true },
    { name: "Last Modification", selector: (row) => row.lastmodified, sortable: true },
    {
      name: "Warranty",
      selector: (row) => {
        let warranty = row.warranty_period;

        // Validate the warranty_period as an object
        if (typeof warranty === 'object' && warranty !== null) {
          const years = warranty.years || 0;
          const months = warranty.months || 0;

          // Construct the warranty display string
          if (years > 0 && months > 0) {
            return `${years} years ${months} months`;
          } else if (years > 0) {
            return `${years} years`;
          } else if (months > 0) {
            return `${months} months`;
          } else {
            return 'No warranty';
          }
        }

        // Handle cases where warranty_period is not an object
        return 'Invalid warranty data';
      },
      sortable: true,
    },
    {
      name: "Raw Materials",
      cell: (row) => (
        <button className="raw-button" onClick={() => fetchRawMaterials(row.id)}>
          <i class="fa-solid fa-screwdriver-wrench"></i>
        </button>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="device-action-btn">
          <button className="action-button" onClick={() => handleEdit(row)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="action-button" onClick={() => handleDeleteClick(row)}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={`device-main ${theme}-theme`}>
      <div className="dash-dummy"></div>
      <div className="device-content-main">
        <div className="device-content">
          <div className="device-content-head">
            <p>Device Details</p>
          </div>
          <div className="device-content-items">
            <div className="device-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <i
              className="fa-regular fa-square-plus add-model-icon"
              onClick={() => setAddPopup(true)}
            ></i>
          </div>
          {addPopup && (
            <div className="model-popup-overlay">
              <div className="model-popup-content">
                <button className="model-popup-close" onClick={() => setAddPopup(false)}>
                  <i className="fa-solid fa-x"></i>
                </button>
                <h3>Add New Model</h3>
                <form>
                  <div className="model-add-input">
                    <label>Model :</label>
                    <input
                      type="text"
                      value={newModel.model}
                      onChange={(e) => setNewModel({ ...newModel, model: e.target.value })}
                    />
                  </div>

                  <div className="model-add-input">
                    <label>MRP :</label>
                    <input
                      type="number"
                      value={newModel.mrp}
                      onChange={(e) => setNewModel({ ...newModel, mrp: e.target.value })}
                    />
                  </div>

                  <div className="model-add-input">
                    <label>Retail Price :</label>
                    <input
                      type="number"
                      value={newModel.retail_price}
                      onChange={(e) => setNewModel({ ...newModel, retail_price: e.target.value })}
                    />
                  </div>
                  <div className="model-add-input-tax">
                    <div className="sgst tax">
                      <label>SGST:</label>
                      <input
                        type="number"
                        value={newModel.sgst}
                        onChange={(e) => setNewModel({ ...newModel, sgst: e.target.value })}
                      />
                    </div>
                    <div className="cgst tax">
                      <label>CGST:</label>
                      <input
                        type="number"
                        value={newModel.cgst}
                        onChange={(e) => setNewModel({ ...newModel, cgst: e.target.value })}
                      />
                    </div>
                    <div className="igst tax">
                      <label>IGST:</label>
                      <input
                        type="number"
                        value={newModel.igst}
                        onChange={(e) => setNewModel({ ...newModel, igst: e.target.value })}
                      />
                    </div>
                  </div>



                  <div className="model-add-input">
                    <label>Discount :</label>
                    <input
                      type="number"
                      value={newModel.discount}
                      onChange={(e) => setNewModel({ ...newModel, discount: e.target.value })}
                    />
                  </div>

                  <div className="model-add-input">
                    <label>Warranty Period :</label>
                    <input
                      type="text"
                      placeholder="e.g., 6 months, 1 year"
                      value={newModel.warranty_period}
                      onChange={(e) => setNewModel({ ...newModel, warranty_period: e.target.value })}
                    />
                  </div>

                </form>
                <button className="model-popup-save" onClick={handleAddNewModel}>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
        <DataTable columns={columns} data={devices} fixedHeader pagination />



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
          <div className="model-edit-popup-overlay">
            <div className="model-edit-popup-content">
              <button className="model-edit-popup-close" type="button" onClick={() => setShowPopup(false)}>
                <i className="fa-solid fa-x"></i>
              </button>
              <form className="model-edit-popup-input">
                <div>
                  <label>MRP :</label> <br />
                  <input
                    type="text"
                    value={editData?.mrp || ""}
                    onChange={(e) => setEditData({ ...editData, mrp: e.target.value })}
                  />
                </div>
                <div>
                  <label>Retail Price :</label> <br />
                  <input
                    type="text"
                    value={editData?.retail_price || ""}
                    onChange={(e) => setEditData({ ...editData, retail_price: e.target.value })}
                  />
                </div>
                <div>
                  <label>Warranty :</label> <br />
                  <input
                    type="text"
                    placeholder="e.g., 6 months / 2 years"
                    value={editData?.warranty_period || ""}
                    onChange={(e) => setEditData({ ...editData, warranty_period: e.target.value })}
                  />

                </div>
              </form>
              <button
                type="button"
                className="model-edit-popup-save"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {editPopup && (
          <div className="model-edit-popup-overlay">
            <div className="model-edit-popup-content">
              <button
                className="model-edit-popup-close"
                type="button"
                onClick={() => setEditPopup(false)}
              >
                <i className="fa-solid fa-x"></i>
              </button>
              <div className="model-raw-details-main">
                <DataTable
                  columns={[
                    {
                      name: 'ID',
                      selector: (row, index) => index + 1, sortable: true
                    },
                    {
                      name: "Image",
                      selector: (row) => row.image,
                      cell: (row) => (
                        <img
                          src={row.image}
                          alt={row.name || "Raw Material"}
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      ),
                      sortable: false,
                    },
                    { name: "Component", selector: (row) => row.component, sortable: true },
                    { name: "Required Quantity", selector: (row) => row.required_qty, sortable: true },
                  ]}
                  data={rawMaterials}
                  fixedHeader
                />
              </div>
              <div className="model-raw-add-main">
  <div className="model-raw-add-head">
    <p>Add Raw Material</p>
  </div>
  <div className="model-raw-inputs">
    <input
      type="text"
      placeholder="Raw Material ID"
      value={newRawMaterial.component}
      onChange={(e) => setNewRawMaterial({ ...newRawMaterial, component: e.target.value })}
    />
    <input
      type="number"
      placeholder="Required Qty"
      value={newRawMaterial.required_qty}
      onChange={(e) => setNewRawMaterial({ ...newRawMaterial, required_qty: e.target.value })}
    />
    <button onClick={handleAddRawMaterial}>ADD</button>
  </div>
</div>

            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default Devices;
