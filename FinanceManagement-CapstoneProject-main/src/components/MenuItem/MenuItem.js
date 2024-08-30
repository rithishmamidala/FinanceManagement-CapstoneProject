import React from 'react';
import './MenuItem.css';

const MenuItem = ({ title, icon, active, onClick }) => (
    <div className={`menuItem ${active ? 'active' : ''}`} onClick={onClick}>
        {icon && <span className="icon">{icon}</span>}
        <span>{title}</span>
    </div>
);

export default MenuItem;
