import React from 'react';
import './MenuItem.css';

const MenuItem = ({ title, icon, active, onClick,activeField }) => (
    <div className={`menuItem ${ activeField === title ? 'active' : ''}`} onClick={onClick}>
        {icon && <span className="icon">{icon}</span>}
        <span>{title}</span>
    </div>
);

export default MenuItem;
