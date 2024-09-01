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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by checking for a token in localStorage
        const token = localStorage.getItem('authToken');
        
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div >
                {/* Render Login if not logged in */}
                {!isLoggedIn ? (
                    <Routes>
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirect to login */}
                    </Routes>
                ) : (
                    
                    <div className="appContainer">
                        {isLoggedIn && <Sidebar />}
                        <div className="mainContent">
                        <Header/>
                        
                        <Routes>
                       

                        {/* Protected routes */}
                        <Route path="/overview" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Overview />
                            </ProtectedRoute>
                        } />
                        <Route path="/balance" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <BalanceCards />
                            </ProtectedRoute>
                        } />
                        <Route path="/transactions" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Transaction />
                            </ProtectedRoute>
                        } />
                        <Route path="/bills" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Bills />
                            </ProtectedRoute>
                        } />
                        <Route path="/expenses" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Expenses />
                            </ProtectedRoute>
                        } />
                        <Route path="/goals" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Goals />
                            </ProtectedRoute>
                        } />

                        {/* Redirect to login if route is not found */}
                        <Route path="*" element={<Navigate to={isLoggedIn ? "/overview" : "/login"} replace />} />
                    </Routes>
                        </div>
                        </div>
                    
                )}
            </div>
        </Router>
    );
};

export default App;
