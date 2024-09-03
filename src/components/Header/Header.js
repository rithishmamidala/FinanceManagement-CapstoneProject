import React, { Component } from 'react';
import './Header.css';
import { FaSearch, FaBell } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                let extractedUsername = decodedToken.username;

                // Capitalize the first letter of the username
                extractedUsername = extractedUsername.charAt(0).toUpperCase() + extractedUsername.slice(1);

                this.setState({ username: extractedUsername });
                console.log(extractedUsername);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }

    render() {
        const { username } = this.state;
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        return (
            <div className="header">
                <div>
                    <h2>Hi,{username}</h2>
                    <p>{today}</p>
                </div>
                <div className="headerIcons">
                    <FaBell className="headerIcon" />
                    <div className="searchBar">
                        <FaSearch />
                        <input type="text" placeholder="Search here" className="searchInput" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
