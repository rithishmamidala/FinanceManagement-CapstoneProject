import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import BalanceCards from './components/BalanceCards/BalanceCards';
import './App.css';  

const App = () => {
    return (
        <div className="appContainer">
            <Sidebar />
            <div className="mainContent">
                <Header />
                <BalanceCards />
            </div>
        </div>
    );
}

export default App;
