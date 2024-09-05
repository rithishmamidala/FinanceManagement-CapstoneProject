import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Overview from './components/Overview/overview';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import BalanceCards from './components/BalanceCards/BalanceCards';
import Transaction from './components/Transaction/Transaction';
import Goals from './components/Goals/goals';

import Login from './components/Login/Login';
import Bills from './components/Bills/Bills';
import Expenses from './components/Expenses/expenses';
import Landing from './Landing Page/Landing';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if the user is logged in by checking for a token in localStorage
        localStorage.clear(); // Clear localStorage for testing purposes
        const token = localStorage.getItem('authToken');
        
        if (token) {
            setIsLoggedIn(true);
        }
        

        setIsLoading(false); // Set loading to false after check is complete
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    if (isLoading) {
        return <div>Loading...</div>; // Optional: Add a loading spinner or message
    }

    return (
        <Router>
            {isLoggedIn ? (
                <div className='total'>
                    <div className="appContainer">
                        <Sidebar />
                        <div className="mainContent">
                            <Header />
                            <Routes>
                                {/* Protected routes */}
                                <Route path="/overview" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Overview /></ProtectedRoute>} />
                                <Route path="/balance" element={<ProtectedRoute isLoggedIn={isLoggedIn}><BalanceCards /></ProtectedRoute>} />
                                <Route path="/transactions" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Transaction /></ProtectedRoute>} />
                                <Route path="/bills" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Bills /></ProtectedRoute>} />
                                <Route path="/expenses" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Expenses /></ProtectedRoute>} />
                                <Route path="/goals" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Goals /></ProtectedRoute>} />
                                {/* Redirect to overview or login based on isLoggedIn */}
                                <Route path="*" element={<Navigate to={isLoggedIn ? "/overview" : "/landing"} replace />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="App">
                    <Routes>
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    
                        <Route path="*" element={<Navigate to="/landing" replace />} />
                    </Routes>
                </div>
            )}
        </Router>
    );
};

export default App;
