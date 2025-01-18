import React, { useState } from 'react';
import './Setting.css';
import light from './settings-img/light.png'
import dark from './settings-img/dark.png'
import { useTheme } from '../theme/ThemeContext';

const Settings = () => {
  const { toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false);

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Trigger button */}
      <div className={`set-main ${isOpen ? 'slide' : ''}`} onClick={toggleSettings}>
        <i className="fa-solid fa-gear fa-spin"></i>
      </div>

      {/* Sliding panel */}
      <div className={`settings-panel ${isOpen ? 'open' : ''}`}>
        <div className="settings-panel-head">
          <p>Settings Panel</p>
        </div>
        <div className="settings-panel-light">
          <img src={light} alt="" onClick={() => toggleTheme('light')}/>
          <p>Light</p>
        </div>
        <div className="settings-panel-light">
          <img src={dark} alt=""  onClick={() => toggleTheme('dark')} />
          <p>Dark</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
