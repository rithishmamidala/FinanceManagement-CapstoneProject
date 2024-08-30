import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import BalanceCards from './components/BalanceCards/BalanceCards';
import Transaction from './components/Transaction/Transaction';
import Goals from './components/Goals/goals';
import Bills from './components/Bills/Bills'
// import Bills from './components/Bills/Bills';  // Example component
import Expenses from './components/Expenses/expenses';  // Example component

// import Settings from './components/Settings/Settings';  // Example component
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="appContainer">
                <Sidebar />
                <div className="mainContent">
                    <Header />
                    <Routes>
                        <Route path="/" element={<BalanceCards />} />
                        <Route path="/transactions" element={<Transaction />} />
                        <Route path="/bills" element={<Bills />} /> 
                        <Route path="/expenses" element={<Expenses />} />
                        <Route path="/goals" element={<Goals />} />
                        {/* <Route path="/settings" element={<Settings />} />  */}
                       
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
