// MenuItem.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const MenuItem = ({ icon: Icon, label }) => (
  <div className="menuItem">
    <div>
      <Icon />
    </div>
    <span>{label}</span>
  </div>
);

// Define prop types for the component
MenuItem.propTypes = {
  icon: PropTypes.elementType.isRequired, // Expecting a component (such as an icon component)
  label: PropTypes.string.isRequired,     // Expecting a string for the label
};

export default MenuItem;
