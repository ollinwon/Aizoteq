import React, { useState } from 'react';
import './Home.css';
import logo from './home-img/main.png';
import teq from './home-img/logo_black.png';
import plug from './home-img/logo2.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const handleTeq = () => {
        navigate('/aizoteq');
    };

    const handleProfile = () => {
        navigate('/profile')
    }

    const togglePopup = () => {
        setShowPopup((prev) => !prev);
    };

    return (
        <div className="home-main">
            <div className="home-nav">
                <img src={logo} alt="" />
                <div className="home-nav-profile" onClick={togglePopup}>
                    <i className="fa-solid fa-user"></i>
                </div>
                {showPopup && (
                    <div className="popup-menu">
                        <div className="popup-item" onClick={handleProfile}>
                            <i className="fa-solid fa-user-circle"></i>
                            <span>Profile</span>
                        </div>
                        <div className="popup-item">
                        <i class="fa-solid fa-headset"></i>
                            <span>Support</span>
                        </div>
                        <div className="popup-item">
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <span>Logout</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="home-content-main">
                <div className="home-content-element" onClick={handleTeq}>
                    <img className="aizo-teq" src={teq} alt="" />
                </div>
                <div className="home-content-element">
                    <img className="aizo-plug" src={plug} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Home;
