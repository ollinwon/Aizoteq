import React, { useCallback, useEffect, useState } from 'react';
import './Nav.css';
import Cropper from 'react-easy-crop';
import defaultUserImg from './nav-img/user.jpg';
import logo1 from './nav-img/logo_black.png';
import logo2 from './nav-img/logo_white.png';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { getCroppedImg } from '../../getCroppedImg';


const Nav = ({ toggleSidebar }) => {
    const { theme } = useTheme();
    const [showPopup, setShowPopup] = useState(false);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const [barcancel, setbarcancel] = useState(false);
    const [logo, setLogo] = useState(logo1);
    const [showProfile, setShowProfile] = useState(false);
    const [editData, setEditData] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const handleEdit = (row) => {
        // setEditData(row);
        setShowProfile(true);
    };

    const handleClosePopup = () => {
        setShowProfile(false);
        setEditData(null);
    };

    useEffect(() => {
        setLogo(theme === 'dark' ? logo2 : logo1);
        fetchUserData();  // Load user data on component mount
    }, [theme]);

    const fetchUserData = async () => {
        try {
            const response = await fetch("/api/display/user?userid=2", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                console.error("Failed to fetch user data.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
                setShowCropper(true); // Show cropper modal
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCropSave = async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            const formData = new FormData();
            formData.append('profilepic', croppedImage);

            const response = await fetch('/api/users/2/profile-pic', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                const updatedUserData = await response.json();
                setUserData(updatedUserData);
            } else {
                console.error('Failed to update profile picture.');
            }
            setShowCropper(false); // Close cropper modal
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    };

    const handlePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleBar = () => {
        setbarcancel(!barcancel);
    };

    return (
        <>
            <div className={`nav-main ${theme}-theme`}>
                <div className="nav-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="nav-content-main">
                    <div className="nav-content-bar" onClick={toggleSidebar}>
                        <i className={`fa-solid ${barcancel ? "fa-x" : "fa-bars"}`}></i>
                    </div>
                    <div className="nav-content-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="nav-content">
                        <i className="fa-solid fa-bell"></i>
                        <div className="nav-profile" onClick={handlePopup}>
                            <img
                                src={userData.profilepic || defaultUserImg}
                                alt="User Profile"
                                onError={(e) => e.target.src = defaultUserImg}
                            />
                        </div>
                    </div>
                    {showPopup && (
                        <div className="nav-popup-menu">
                            <div className="nav-popup-profile1">
                                <p>{userData.name || "User"}</p>
                            </div>
                            <div className="nav-popup-profile2">
                                <img
                                    src={userData.profilepic || defaultUserImg}
                                    alt="User Popup Profile"
                                    onError={(e) => e.target.src = defaultUserImg}
                                />
                            </div>
                            <div className="nav-popup-profile-details">
                                <p>{userData.userrole || "Role"}</p>
                                <span>{userData.username || "email@example.com"}</span>
                            </div>
                            <div className="nav-popup-item-main">
                                <div className="nav-popup-item">
                                    <i class="fa-solid fa-user-pen" onClick={() => handleEdit()}></i>
                                    <span onClick={() => handleEdit()}>Edit Profile</span>
                                </div>
                                {showProfile && (
                                    <div className="nav-popup-overlay">
                                        <div className="nav-popup-content">
                                            <button className="nav-popup-close" onClick={handleClosePopup}>
                                                <i className="fa-solid fa-x"></i>
                                            </button>
                                            <div className="nav-popup-items">
                                                <div className="nav-popup-edit-profile">
                                                    <div className="nav-edit-profile">
                                                        <img
                                                            src={userData.profilepic || defaultUserImg}
                                                            alt="User Popup Profile"
                                                            onError={(e) => e.target.src = defaultUserImg}
                                                        />
                                                        <span>{userData.name || "User"}</span>
                                                    </div>
                                                    <div className="nav-change-profile-btn">
                                                        <label htmlFor="profilePicUpload">Change Photo</label>
                                                        <input
                                                            type="file"
                                                            id="profilePicUpload"
                                                            accept="image/*"
                                                            onChange={handleProfilePicChange}
                                                            style={{ display: 'none' }}
                                                        />
                                                    </div>
                                                    {showCropper && (
                                                        <div className="cropper-modal">
                                                            <div className="cropper-container">
                                                                <Cropper
                                                                    image={imageSrc}
                                                                    crop={crop}
                                                                    zoom={zoom}
                                                                    aspect={1}
                                                                    onCropChange={setCrop}
                                                                    onZoomChange={setZoom}
                                                                    onCropComplete={onCropComplete}
                                                                />
                                                                <div className="cropper-btn"> 
                                                                <button className="cropper-close" onClick={() => setShowCropper(false)}><i class="fa-solid fa-xmark"></i></button>
                                                                <button className="cropper-save" onClick={handleCropSave}>Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                            {/* <button
                                                className="popup-save"
                                                onClick={() => {
                                                    console.log("Updated Data: ", editData);
                                                    handleClosePopup();
                                                }}
                                            >
                                                Save
                                            </button> */}
                                        </div>
                                    </div>
                                )}
                                <div className="nav-popup-item">
                                    <i class="fa-solid fa-headset"></i>
                                    <span>Help</span>
                                </div>
                                <div className="nav-popup-item">
                                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                    <span>Logout</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Nav;
