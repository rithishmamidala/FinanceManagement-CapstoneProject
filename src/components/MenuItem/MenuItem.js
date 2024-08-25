import React from 'react';
import './MenuItem.css';

const MenuItem = ({ title, icon, active }) => (
    <div className={`menuItem ${active ? 'active' : ''}`}>
        {icon && <span className="icon">{icon}</span>}
        <span>{title}</span>
    </div>
);

export default MenuItem;
