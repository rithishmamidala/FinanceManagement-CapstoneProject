import React from 'react';
import './Header.css';
import { FaSearch, FaBell } from 'react-icons/fa';

const Header = () => (
    <div className=" header" >
        <div>
            <h2>Hello Tanzir</h2>
            <p>May 19, 2023</p>
        </div>
        <div className= "headerIcons">
            <FaBell className="headerIcon" />
            <div className="searchBar">
                <FaSearch />
                <input type="text" placeholder="Search here" className="searchInput" />
            </div>
        </div>
    </div>
);

export default Header;
