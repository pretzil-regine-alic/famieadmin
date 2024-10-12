import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SketchPicker } from 'react-color'; // Import color picker component
import './UserTheme.css';

const UserTheme = () => {
  const [appBarColor, setAppBarColor] = useState('#CCE747');
  const [textColor, setTextColor] = useState('#CCE747');
  const [fontStyle, setFontStyle] = useState('Georgia');
  const [backgroundColor, setBackgroundColor] = useState('#AFE1AF');
  const [buttonColor, setButtonColor] = useState('#4F7942');
  
  // State for showing/hiding color pickers
  const [showPicker, setShowPicker] = useState({ background: false, appBar: false, button: false, text: false });
  const [tempColor, setTempColor] = useState(''); // Temporary color to apply changes only on OK

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get('http://localhost:6160/api/usertheme');
        if (response.data) {
          const { background_color, font_style, app_bar_color, button_color, text_color } = response.data;
          setBackgroundColor(background_color);
          setFontStyle(font_style);
          setAppBarColor(app_bar_color);
          setButtonColor(button_color);
          setTextColor(text_color);
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };
    fetchTheme();
  }, []);

  const updateSystem = async () => {
    try {
      const response = await axios.put('http://localhost:6192/api/usertheme', {
        background_color: backgroundColor,
        font_style: fontStyle,
        app_bar_color: appBarColor,
        button_color: buttonColor,
        text_color: textColor,
      });
      if (response.status === 200) {
        alert('Theme updated successfully!');
      } else {
        alert('Failed to update theme.');
      }
    } catch (error) {
      console.error('Error updating theme:', error);
      alert('Failed to update theme. Please try again.');
    }
  };

  const handleOpenPicker = (color, type) => {
    setTempColor(color);
    setShowPicker({ ...showPicker, [type]: true });
  };

  const handleCancel = (type) => {
    setShowPicker({ ...showPicker, [type]: false }); // Close the picker without changes
  };

  const handleOk = (setter, type) => {
    setter(tempColor); // Apply the selected color
    setShowPicker({ ...showPicker, [type]: false }); // Close the picker
  };

  const handleColorChange = (color) => {
    setTempColor(color.hex); // Set the temporary color
  };

  return (
    <div className="user-theme-container">
      <h2>Customize Your Theme</h2>
      <div className="theme-options">
        
        {/* Background Color */}
        <div className="theme-item">
          <label>Background Color</label>
          <div className="color-selector">
            <button onClick={() => handleOpenPicker(backgroundColor, 'background')}>
              Select
            </button>
            {/* Circle button to display selected color */}
            <div className="color-circle" style={{ backgroundColor: backgroundColor }}></div>
          </div>
          {showPicker.background && (
            <div className="color-picker-overlay">
              <div className="color-picker-modal">
                <SketchPicker color={tempColor} onChange={handleColorChange} />
                <div className="picker-buttons">
                  <button onClick={() => handleCancel('background')}>CANCEL</button>
                  <button onClick={() => handleOk(setBackgroundColor, 'background')}>OK</button>
                  
                </div>
              </div>
            </div>
          )}
        </div>

        {/* App Bar Color */}
        <div className="theme-item">
          <label>App Bar Color</label>
          <div className="color-selector">
            <button onClick={() => handleOpenPicker(appBarColor, 'appBar')}>
              Select
            </button>
            {/* Circle button to display selected color */}
            <div className="color-circle" style={{ backgroundColor: appBarColor }}></div>
          </div>
          {showPicker.appBar && (
            <div className="color-picker-overlay">
              <div className="color-picker-modal">
                <SketchPicker color={tempColor} onChange={handleColorChange} />
                <div className="picker-buttons">
                  <button onClick={() => handleCancel('appBar')}>CANCEL</button>
                  <button onClick={() => handleOk(setAppBarColor, 'appBar')}>OK</button>

                </div>
              </div>
            </div>
          )}
        </div>

        {/* Button Color */}
        <div className="theme-item">
          <label>Button Color</label>
          <div className="color-selector">
            <button onClick={() => handleOpenPicker(buttonColor, 'button')}>
              Select
            </button>
            {/* Circle button to display selected color */}
            <div className="color-circle" style={{ backgroundColor: buttonColor }}></div>
          </div>
          {showPicker.button && (
            <div className="color-picker-overlay">
              <div className="color-picker-modal">
                <SketchPicker color={tempColor} onChange={handleColorChange} />
                <div className="picker-buttons">
                  <button onClick={() => handleCancel('button')}>CANCEL</button>
                  <button onClick={() => handleOk(setButtonColor, 'button')}>OK</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Font Style */}
        <div className="theme-item">
          <label htmlFor="fontStyle">Font Style:</label>
          <select
            id="fontStyle"
            value={fontStyle}
            onChange={(e) => setFontStyle(e.target.value)}
            className="font-style-select"
          >
            {/* Font style options */}
            <option value="Arial, sans-serif">Arial</option>
              <option value="'Arial Black', Gadget, sans-serif">Arial Black</option>
              <option value="'Comic Sans MS', cursive, sans-serif">Comic Sans MS</option>
              <option value="'Courier New', Courier, monospace">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Impact, Charcoal, sans-serif">Impact</option>
              <option value="'Lucida Sans Unicode', 'Lucida Grande', sans-serif">Lucida Sans Unicode</option>
              <option value="'Palatino Linotype', 'Book Antiqua', Palatino, serif">Palatino Linotype</option>
              <option value="Tahoma, Geneva, sans-serif">Tahoma</option>
              <option value="'Times New Roman', Times, serif">Times New Roman</option>
              <option value="'Trebuchet MS', Helvetica, sans-serif">Trebuchet MS</option>
              <option value="Verdana, Geneva, sans-serif">Verdana</option>
              <option value="'Brush Script MT', cursive">Brush Script MT</option>
              <option value="'Lucida Console', Monaco, monospace">Lucida Console</option>
              <option value="Helvetica, sans-serif">Helvetica</option>
              <option value="'Gill Sans', 'Gill Sans MT', Calibri, sans-serif">Gill Sans</option>
              <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">Segoe UI</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="'Lato', sans-serif">Lato</option>
              <option value="'Oswald', sans-serif">Oswald</option>
              <option value="'Raleway', sans-serif">Raleway</option>
              <option value="'Merriweather', serif">Merriweather</option>
              </select>
        </div>

        {/* Text Color */}
        <div className="theme-item">
          <label>Text Color</label>
          <div className="color-selector">
            <button onClick={() => handleOpenPicker(textColor, 'text')}>
              Select
            </button>
            {/* Circle button to display selected color */}
            <div className="color-circle" style={{ backgroundColor: textColor }}></div>
          </div>
          {showPicker.text && (
            <div className="color-picker-overlay">
              <div className="color-picker-modal">
                <SketchPicker color={tempColor} onChange={handleColorChange} />
                <div className="picker-buttons">
                  <button onClick={() => handleCancel('text')}>CANCEL</button>
                  <button onClick={() => handleOk(setTextColor, 'text')}>OK</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Update Button */}
      <div className="button-container">
        <button className="update-button" onClick={updateSystem}>
          Update Theme
        </button>
      </div>
    </div>
  );
};

export default UserTheme;
