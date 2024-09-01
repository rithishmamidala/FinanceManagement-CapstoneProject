import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../MenuItem/MenuItem';
import './Menu.css';
import { FaExchangeAlt, FaFileInvoice, FaListAlt, FaBullseye, FaCog } from 'react-icons/fa';

const Menu = () => {
    const [activeField,setActiveField] = useState('Overview')
    return(
        <div className="menu">
        <Link to="/" className='line-none' onClick={()=>setActiveField("Overview")}>
            <MenuItem title="Overview" activeField={activeField}/>
        </Link>
        <Link to="/balance" className='line-none' onClick={()=>setActiveField("Balances")}>
            <MenuItem title="Balances"  activeField={activeField} />
        </Link>
        <Link to="/transactions" className='line-none' onClick={()=>setActiveField("Transactions")}>
            <MenuItem title="Transactions" icon={<FaExchangeAlt />} activeField={activeField} />
        </Link>
        <Link to="/bills" className='line-none' onClick={()=>setActiveField("Bills")}>
            <MenuItem title="Bills" icon={<FaFileInvoice />} activeField={activeField} />
        </Link>
        <Link to="/expenses" className='line-none' onClick={()=>setActiveField("Expenses")}>
            <MenuItem title="Expenses" icon={<FaListAlt />} activeField={activeField} />
        </Link>
        <Link to="/goals" className='line-none' onClick={()=>setActiveField("Goals")}>
            <MenuItem title="Goals" icon={<FaBullseye />} activeField={activeField}/>
        </Link>
        <Link to="/settings" className='line-none' onClick={()=>setActiveField("Settings")}>
            <MenuItem title="Settings" icon={<FaCog />} activeField={activeField} />
        </Link>
    </div>
    )
}



export default Menu;
