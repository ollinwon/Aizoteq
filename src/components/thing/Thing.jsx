import React, { useEffect, useState } from "react";
import "./Thing.css";
import { useTheme } from "../theme/ThemeContext";
import DataTable from "react-data-table-component";

const Thing = () => {
    const { theme } = useTheme();
    const [visibleKeyId, setVisibleKeyId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [editData, setEditData] = useState(null);
    const [showSlide, setShowSlide] = useState(false);
    const [thingsData, setThingsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fetchUrl, setFetchUrl] = useState("/api/searchThings/working/rework");

    const handleEdit = (row) => {
        setEditData(row);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setEditData(null);
    };

    const handleSlide = () => {
        setShowSlide((prev) => !prev);
    };

    useEffect(() => {
        fetchThingsData(fetchUrl);
    }, [fetchUrl]);

    const fetchThingsData = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Fetched data:", data);
            setThingsData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filterType) => {
        const newUrl = `/api/searchThings/working/${filterType}`;
        setFetchUrl(newUrl);
    };

    const columns = [
        { name: 'ID',
            selector: (row, index) => index + 1, sortable: true },
        { name: "Thing Name", selector: (row) => row.thingname || "null", sortable: true },
        { name: "Created By", selector: (row) => row.createdby || "null", sortable: true },
        { name: "Batch ID", selector: (row) => row.batchid || "null", sortable: true },
        { name: "Model", selector: (row) => row.model || "null", sortable: true },
        { name: "Serial No", selector: (row) => row.serialno || "null", sortable: true },
        {
            name: "Security Key",
            cell: (row) => (
                <div
                    onMouseEnter={() => setVisibleKeyId(row.securitykey)}
                    onMouseLeave={() => setVisibleKeyId(null)}
                    style={{ cursor: "pointer" }}
                >
                    {visibleKeyId === row.securitykey ? row.securitykey : "**********"}
                </div>
            ),
            sortable: true,
        },
        { name: "Status", selector: (row) => row.admin_stock_status || "null", sortable: true },
        { name: "Added At", selector: (row) => row.addedat || "null", sortable: true },
        { name: "Added By", selector: (row) => row.addedby || "null", sortable: true },
        { name: "Failure Reason", selector: (row) => row.failurereason || "null", sortable: true },
        { name: "Fixed By", selector: (row) => row.fixed_by || "null", sortable: true },
        { name: "Logged At", selector: (row) => row.loggedat || "null", sortable: true },
        {
            name: "Test",
            cell: (row) => (
                <button className="test-button" onClick={() => handleEdit(row)}>
                    <i className="fa-regular fa-eye"></i>
                </button>
            ),
        },
    ];

    return (
        <div className={`thing-main ${theme}-theme`}>
            <div className="dash-dummy"></div>
            <div className="thing-content-main">
                <div className="thing-content">
                    <div className="thing-content-head">
                        <p>Thing Details</p>
                    </div>
                    <div className="thing-content-items">
                        <div className="device-search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="search" placeholder="search..." />
                        </div>

                        <div style={{ position: "relative" }}>
                            <i className="fa-solid fa-sliders" onClick={handleSlide}></i>
                            {showSlide && (
                                <div className="thing-slide-menu show">
                                    {["rework", "new", "returned", "exchange"].map(
                                        (filter) => (
                                            <div
                                                key={filter}
                                                className="thing-slide-item"
                                                onClick={() => handleFilterChange(filter)}
                                            >
                                                <span>{filter}</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <DataTable columns={columns} data={thingsData} fixedHeader pagination />
                )}

                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <button className="popup-close" onClick={handleClosePopup}>
                                <i className="fa-solid fa-x"></i>
                            </button>

                            <button
                                className="popup-save"
                                onClick={() => {
                                    console.log("Updated Data: ", editData);
                                    handleClosePopup();
                                }}
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

export default Thing;
