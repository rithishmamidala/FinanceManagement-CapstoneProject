import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../MenuItem/MenuItem';
import './Menu.css';
import { FaExchangeAlt, FaFileInvoice, FaListAlt, FaBullseye, FaCog } from 'react-icons/fa';

const Menu = () => (
    <div className="menu">
        <Link to="/" className='line-none'>
            <MenuItem title="Overview" />
        </Link>
        <Link to="/" className='line-none'>
            <MenuItem title="Balances" active />
        </Link>
        <Link to="/transactions" className='line-none'>
            <MenuItem title="Transactions" icon={<FaExchangeAlt />} />
        </Link>
        <Link to="/bills" className='line-none'>
            <MenuItem title="Bills" icon={<FaFileInvoice />} />
        </Link>
        <Link to="/expenses" className='line-none'>
            <MenuItem title="Expenses" icon={<FaListAlt />} />
        </Link>
        <Link to="/goals" className='line-none'>
            <MenuItem title="Goals" icon={<FaBullseye />} />
        </Link>
        <Link to="/settings" className='line-none'>
            <MenuItem title="Settings" icon={<FaCog />} />
        </Link>
    </div>
);

export default Menu;
