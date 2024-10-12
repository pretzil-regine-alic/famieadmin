import React from 'react';
import './UsersDash.css';
import Users from '../Users/Users'

const UsersDash = () => {
    return (
        <div className="UsersDash">
            <h1 className="theme-title">Users Registration Report</h1>
            <Users />
        </div>
    );
};

export default UsersDash;
