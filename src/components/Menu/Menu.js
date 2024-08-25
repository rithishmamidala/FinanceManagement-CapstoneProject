import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import  './Menu.css';
import { FaExchangeAlt, FaFileInvoice, FaListAlt, FaBullseye, FaCog } from 'react-icons/fa';

const Menu = () => (
    <div className= "menu">
        <MenuItem title="Overview" />
        <MenuItem title="Balances" active />
        <MenuItem title="Transactions" icon={<FaExchangeAlt />} />
        <MenuItem title="Bills" icon={<FaFileInvoice />} />
        <MenuItem title="Expenses" icon={<FaListAlt />} />
        <MenuItem title="Goals" icon={<FaBullseye />} />
        <MenuItem title="Settings" icon={<FaCog />} />
    </div>
);

export default Menu;
