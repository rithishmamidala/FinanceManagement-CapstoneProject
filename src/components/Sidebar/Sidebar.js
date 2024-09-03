import React from 'react';
import Menu from '../Menu/Menu';
import UserProfile from '../UserProfile/UserProfile';
import './Sidebar.css';

const Sidebar = () => (
    <div className="sidebar">
       
        <div className="name">
        <h1>FinTrack.Io</h1>
        </div>

        <Menu />

        {/* <UserProfile /> */}
    </div>
);

export default Sidebar;
