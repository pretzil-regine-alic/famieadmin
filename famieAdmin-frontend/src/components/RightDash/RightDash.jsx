import React from 'react';
import './RightDash.css';
import UserTheme from '../UserTheme/UserTheme';

const RightDash = () => {
    return (
        <div className="RightDash">
            <h1 className="theme-title">Theme Management</h1>
            <UserTheme />
        </div>
    );
};

export default RightDash;
