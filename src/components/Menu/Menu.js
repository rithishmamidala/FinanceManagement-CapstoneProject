import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaExchangeAlt, FaFileInvoice, FaListAlt, FaBullseye, FaWallet } from 'react-icons/fa';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';

const Menu = () => {
    const [activeField, setActiveField] = useState('Dashboard');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/landing');  
       
    
    };

    return (
        <div className="flex flex-1 bg-gray-50">
            <div className="hidden md:flex md:w-64 md:flex-col">
                <div className="flex flex-col flex-grow pt-4 justify-between overflow-hidden bg-white sidebar">
                    <div className="flex items-center flex-shrink-0 px-8 py-4">
                        <img className="w-auto h-8" src="Logo.png" alt="Logo" />
                    </div>

                    <div className="flex flex-col flex-1 px-3 pt-5 mb-6">
                        <div className="space-y-4">
                            <nav className="flex-1 space-y-2">
                                <Link 
                                    to="/" 
                                    className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 no-underline ${activeField === 'Dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-300'} rounded-lg`} 
                                    onClick={() => setActiveField('Dashboard')}
                                >
                                    <SummarizeOutlinedIcon className="flex-shrink-0 w-5 h-5 mr-4" />
                                    Dashboard
                                </Link>
                                <Link 
                                    to="/balance" 
                                    className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 no-underline ${activeField === 'Balances' ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-300'} rounded-lg`} 
                                    onClick={() => setActiveField('Balances')}
                                >
                                    <FaWallet className="flex-shrink-0 w-5 h-5 mr-4" />
                                    Balances
                                </Link>
                                <Link 
                                    to="/transactions" 
                                    className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 no-underline ${activeField === 'Transactions' ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-300'} rounded-lg`} 
                                    onClick={() => setActiveField('Transactions')}
                                >
                                    <FaExchangeAlt className="flex-shrink-0 w-5 h-5 mr-4" />
                                    Transactions
                                </Link>
                                <Link 
                                    to="/bills" 
                                    className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 no-underline ${activeField === 'Bills' ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-300'} rounded-lg`} 
                                    onClick={() => setActiveField('Bills')}
                                >
                                    <FaFileInvoice className="flex-shrink-0 w-5 h-5 mr-4" />
                                    Bills
                                </Link>
                                <Link 
                                    to="/expenses" 
                                    className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 no-underline ${activeField === 'Expenses' ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-300'} rounded-lg`} 
                                    onClick={() => setActiveField('Expenses')}
                                >
                                    <FaListAlt className="flex-shrink-0 w-5 h-5 mr-4" />
                                    Expenses
                                </Link>
                                <Link 
                                    to="/goals" 
                                    className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 no-underline ${activeField === 'Goals' ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-300'} rounded-lg`} 
                                    onClick={() => setActiveField('Goals')}
                                >
                                    <FaBullseye className="flex-shrink-0 w-5 h-5 mr-4" />
                                    Goals
                                </Link>
                            </nav>

                            <hr className="border-gray-200" />
                        </div>

                        <div className="pb-1 mt-auto">
                            <button 
                                type="button" 
                                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-sky-600 transition-transform duration-300 transform hover:scale-105 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                                onClick={handleLogout} // Call handleLogout instead of Logout
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <main>
                    <div className="py-6">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                            {/* Main content goes here */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Menu;
