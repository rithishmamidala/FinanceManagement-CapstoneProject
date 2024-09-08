import React, { useState, useEffect } from 'react';
import './Header.css';
import { FaSearch, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Importing jwt-decode correctly

const Header = () => {
    const [username, setUsername] = useState('');
    const [chatInput, setChatInput] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [upcomingBills, setUpcomingBills] = useState([]);
    const [showBillsPopup, setShowBillsPopup] = useState(false);
    const navigate = useNavigate();
    const availableSuggestions = ['balance', 'transactions', 'bills', 'expenses', 'goals', 'overview'];
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                let extractedUsername = decodedToken.username;
                extractedUsername = extractedUsername.charAt(0).toUpperCase() + extractedUsername.slice(1);
                setUsername(extractedUsername);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }

        // Initial fetch of upcoming bills
        fetchUpcomingBills();

        // Polling: Fetch bills every 30 seconds
        const interval = setInterval(fetchUpcomingBills, 100); // Fetch bills every 30 seconds

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const fetchUpcomingBills = async () => {
        try {
            const response = await axios.get('http://localhost:9007/bills/getbills');
            const bills = response.data;

            const now = new Date();
            const upcoming = bills.filter(bill => {
                const dueDate = new Date(bill.duedate);
                const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
                return diffDays <= 7 && diffDays >= 0; // Show bills due within the next 9 days
            });
            setUpcomingBills(upcoming);
        } catch (error) {
            console.error('Error fetching upcoming bills:', error);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setChatInput(input);

        if (input.length > 1) {
            const filteredSuggestions = availableSuggestions.filter((suggestion) =>
                suggestion.toLowerCase().startsWith(input.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            setSuggestions([]);
            switch (chatInput.toLowerCase()) {
                case 'balance':
                    navigate('/balance');
                    break;
                case 'transactions':
                    navigate('/transactions');
                    break;
                case 'bills':
                    navigate('/bills');
                    break;
                case 'expenses':
                    navigate('/expenses');
                    break;
                case 'goals':
                    navigate('/goals');
                    break;
                case 'dashboard':
                    navigate('/overview');
                    break;
                default:
                    try {
                        const response = await fetch('http://localhost:8888/api/chat', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ query: chatInput })
                        });
                        const data = await response.json();
                        setChatResponse(data.answer || 'Sorry, I didn’t understand that.');
                    } catch (error) {
                        console.error('Error in chatbot API:', error);
                        setChatResponse('not found');
                    }
                    break;
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setChatInput(suggestion);
        setSuggestions([]);
        navigate(`/${suggestion.toLowerCase()}`);
    };

    const toggleBillsPopup = (state) => {
        setShowBillsPopup(state);
    };

    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="header">
            <div>
                <h2>Hi, {username}</h2>
                <p>{today}</p>
            </div>
            <div className="headerIcons">
                <div
                    className="bell-container"
                    onMouseEnter={() => toggleBillsPopup(true)}  // Show popup on hover
                    onMouseLeave={() => toggleBillsPopup(false)}  // Hide popup when hover ends
                >
                    <FaBell className="headerIcon" />
                    {upcomingBills.length > 0 && <span className="bell-badge">{upcomingBills.length}</span>}
                    {showBillsPopup && (
                        <div className={`bills-popup ${showBillsPopup ? 'show' : ''}`}>
                            <ul className="bills-list">
                                {upcomingBills.map((bill, index) => {
                                    const dueDate = new Date(bill.duedate);
                                    const month = dueDate.toLocaleString('default', { month: 'short' });
                                    const day = dueDate.getDate();
                                    return (
                                        <li key={index}>
                                            {bill.billname}: {month} {day}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="searchBar">
                    <FaSearch />
                    <input 
                        type="text" 
                        placeholder="Search here or ask me something" 
                        className="searchInput"
                        value={chatInput}
                        onChange={handleInputChange}
                        onKeyPress={handleSearch}
                    />
                    {suggestions.length > 0 && (
                        <ul className="suggestionsList">
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                    {chatResponse && (
                        <div className="chatbotResponse">
                            <p>{chatResponse}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
