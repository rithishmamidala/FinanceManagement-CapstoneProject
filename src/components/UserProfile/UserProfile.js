import React from 'react';
import './UserProfile.css';
import { FaSignOutAlt } from 'react-icons/fa';

const UserProfile = () => (
    <div className="profileSection">
        <div className="styles.menuItem">
            <FaSignOutAlt className="icon" />
            <span>Logout</span>
        </div>
        <div className=" styles.profile">
            <img src="path_to_profile_image" alt="Profile" className="profileImg" />
            <div>
                <p className="profileName">Ritish Mamidala</p>
                <a href="profile_link" className="profileLink">View profile</a>
            </div>
        </div>
    </div>
);

export default UserProfile;
