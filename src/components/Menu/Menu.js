import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaExchangeAlt, FaFileInvoice, FaListAlt, FaBullseye, FaCog, FaWallet } from 'react-icons/fa';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { MenuOpenOutlined } from '@mui/icons-material';

const Menu = () => {
    const [activeField, setActiveField] = useState('Dashboard');

    return (
        <div className="flex flex-1 bg-gray-50">
            <div className="hidden md:flex md:w-64 md:flex-col">
                <div className="flex flex-col flex-grow pt-4 justify-between overflow-hidden bg-white sidebar">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <img className="w-auto h-8" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg" alt="Logo" />
                    </div>

                  


                    <div className="flex flex-col flex-1 px-3 pt-5 mb-6">
                        <div className="space-y-4">
                            <nav className="flex-1 space-y-2">
                                <Link to="/" className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 no-underline ${activeField === 'Dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-300'} rounded-lg group`} onClick={() => setActiveField('Dashboard')}>
                                    <SummarizeOutlinedIcon className="flex-shrink-0 w-5 h-5 mr-4" />
                                    Dashboard
                                </Link>
                                <Link to="/balance" className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all no-underline duration-200 ${activeField === 'Balances' ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-300'} rounded-lg group`} onClick={() => setActiveField('Balances')}>
                                    <FaWallet className="flex-shrink-0 w-5 h-5 mr-4" />
                                    Balances
                                </Link>
                                <Link to="/transactions" className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all  no-underline duration-200 ${activeField === 'Transactions' ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-300'} rounded-lg group`} onClick={() => setActiveField('Transactions')}>
                                    <FaExchangeAlt className="flex-shrink-0 w-5 h-5 mr-4" />
                                    Transactions
                                </Link>
                                <Link to="/bills" className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all no-underline duration-200 ${activeField === 'Bills' ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-300'} rounded-lg group`} onClick={() => setActiveField('Bills')}>
                                    <FaFileInvoice className="flex-shrink-0 w-5 h-5 mr-4" />
                                    Bills
                                </Link>
                                <Link to="/expenses" className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all  no-underline duration-200 ${activeField === 'Expenses' ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-300'} rounded-lg group`} onClick={() => setActiveField('Expenses')}>
                                    <FaListAlt className="flex-shrink-0 w-5 h-5 mr-4" />
                                    Expenses
                                </Link>
                                <Link to="/goals" className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all no-underline duration-200 ${activeField === 'Goals' ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-300'} rounded-lg group`} onClick={() => setActiveField('Goals')}>
                                    <FaBullseye className="flex-shrink-0 w-5 h-5 mr-4" />
                                    Goals
                                </Link>
                            </nav>

                            <hr className="border-gray-200" />
                        </div>

                        <div className="pb-1 mt-auto">
                            <button type="button" className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100">
                                <img className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png" alt="User Avatar" />
                                Jacob Jones
                                <svg className="w-5 h-5 ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
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
