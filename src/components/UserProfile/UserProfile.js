import React from 'react';
import './UserProfile.css';
import { FaSignOutAlt } from 'react-icons/fa';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const UserProfile = () => (
    <div className="profileSection">
        <div className="menuItem">
            <FaSignOutAlt className="icon" />
            <span>Logout</span>
        </div>
        <div className="profile">
            <AccountCircleOutlinedIcon className="profileImg" />
            <div>
                <p className="profileName">Ritish Mamidala</p>
                <a href="profile_link" className="profileLink">View Profile</a>
            </div>
        </div>
    </div>
);

export default UserProfile;
