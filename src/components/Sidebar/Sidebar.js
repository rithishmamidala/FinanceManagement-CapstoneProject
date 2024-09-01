import React from 'react';
import Menu from '../Menu/Menu';
import UserProfile from '../UserProfile/UserProfile';
import './Sidebar.css';

const Sidebar = () => (
    <div className="sidebar">
        <h2 className="logo">SavvyTrack</h2>

        <Menu />

        <UserProfile />
    </div>
);

export default Sidebar;
