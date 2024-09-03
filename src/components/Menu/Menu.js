import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../MenuItem/MenuItem';
import './Menu.css';
import { FaExchangeAlt, FaFileInvoice, FaListAlt, FaBullseye, FaCog, FaWallet } from 'react-icons/fa'; // Import FaWallet for Balances
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';

const Menu = () => {
    const [activeField, setActiveField] = useState('Overview');

    return (
        <div className="menu">
            

            <Link to="/" className="line-none" onClick={() => setActiveField("Overview")}>
                <MenuItem title="Overview" icon={<SummarizeOutlinedIcon />}  activeField={activeField} />
            </Link>
            <Link to="/balance" className="line-none" onClick={() => setActiveField("Balances")}>
                <MenuItem title="Balances" icon={<FaWallet />} activeField={activeField} />
            </Link>
            <Link to="/transactions" className="line-none" onClick={() => setActiveField("Transactions")}>
                <MenuItem title="Transactions" icon={<FaExchangeAlt />} activeField={activeField} />
            </Link>
            <Link to="/bills" className="line-none" onClick={() => setActiveField("Bills")}>
                <MenuItem title="Bills" icon={<FaFileInvoice />} activeField={activeField} />
            </Link>
            <Link to="/expenses" className="line-none" onClick={() => setActiveField("Expenses")}>
                <MenuItem title="Expenses" icon={<FaListAlt />} activeField={activeField} />
            </Link>
            <Link to="/goals" className="line-none" onClick={() => setActiveField("Goals")}>
                <MenuItem title="Goals" icon={<FaBullseye />} activeField={activeField} />
            </Link>
            
        </div>
    );
};

export default Menu;
