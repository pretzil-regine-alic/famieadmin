import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../imgs/famielogo1.png'; 
import './Sidebar.css';
import { UilSignOutAlt } from "@iconscout/react-unicons"; 
import { SidebarData } from '../../Data/Data';
import { motion } from "framer-motion";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const [expanded] = useState(true);

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleClick = (index, route) => {
    setSelected(index);
    navigate(route);  // This should navigate to the route
  };

  return (
    <>
    <motion.div className="Sidebar"
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      <div className="menu">
        <div className="famielogo">
          <img src={Logo} alt="famielogo" />
        </div>
        {SidebarData.map((item, index) => (
          <div 
            className={`menuItem ${selected === index ? "active" : ""}`}
            key={index}
            onClick={() => handleClick(index, item.route)}
          >
            <item.icon />
            <span>{item.heading}</span>
          </div>
        ))}
        <div className="menuItem" onClick={handleSignOut}>
          <UilSignOutAlt />
          </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
