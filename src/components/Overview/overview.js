import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BalanceCards from '../BalanceCards/BalanceCards';
import TrackMeter from '../Goals/TrackMeter'; 
import BarGraph from '../BarGraph/barGraph'; 
import './overview.css'; 
import ExpenseBreakdown from './ExpenseBreakdown';
import RecentTransaction from './RecentTransaction';
import BillsList from './BillsList';
import {jwtDecode} from 'jwt-decode';

const Overview = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [monthlyData, setMonthlyData] = useState({ months: [], creditAmounts: [], debitAmounts: [] });
  const [userName,setUsername] = useState('');
  const [NewTransaction,setNewTransaction]  = useState();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const extractedUsername = decodedToken.username;
        setUsername(extractedUsername);
        setNewTransaction(prevState => ({
          ...prevState,
          userName: extractedUsername, // Set userName in state
        }));
      } catch (error) {
        console.error('Invalid token:', error);
      }
    const fetchMonthlyData = async () => {
      try {
        // const response = await axios.get('http://localhost:2002/TransactionHistory');
        const response = await axios.get('http://localhost:2002/TransactionHistory',  {
          headers: {
          'Authorization': `Bearer ${token}`,
        } , });
        const transactions = response.data;
        aggregateMonthlyData(transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const aggregateMonthlyData = (transactions) => {
      const monthlyTotals = {};
      const currentDate = new Date();
      const last12Months = [];

      for (let i = 11; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthYear = date.toLocaleString('default', { month: 'short' }) + '-' + date.getFullYear();
        last12Months.push(monthYear);
        monthlyTotals[monthYear] = { credit: 0, debit: 0 };
      }

      transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        const monthYear = transactionDate.toLocaleString('default', { month: 'short' }) + '-' + transactionDate.getFullYear();

        if (last12Months.includes(monthYear) && transactionDate >= new Date(currentDate.getFullYear(), currentDate.getMonth() - 11, 1)) {
          if (transaction.transactionType === 'Credit') {
            monthlyTotals[monthYear].credit += parseFloat(transaction.amount);
          } else if (transaction.transactionType === 'Debit') {
            monthlyTotals[monthYear].debit += parseFloat(transaction.amount);
          }
        }
      });

      const months = last12Months;
      const creditAmounts = months.map(monthYear => monthlyTotals[monthYear].credit);
      const debitAmounts = months.map(monthYear => monthlyTotals[monthYear].debit);

      setMonthlyData({
        months,
        creditAmounts,
        debitAmounts
      });
    };

    fetchMonthlyData();
  }
  }, []);

  const handleDotClick = (index) => {
    setCurrentCardIndex(index);
  };

  return (
    <div className="overview-container">
      <div className="overview-header">
        {/* Header content can go here */}
      </div>

      <div className="overview-section overview-top-section">
        <div className="overview-balance-container">
          <h1 style={{"marginBottom":"20px"}}>Total Balance</h1>
          <div className="overview-card-part">
            <BalanceCards showFirstCardOnly={true} currentCardIndex={currentCardIndex} />
          </div>
          <div className="overview-dotsContainer">
            {Array.from({ length: 3 }).map((_, index) => (
              <span
                key={index}
                className={`overview-dot ${index === currentCardIndex ? 'overview-dot active' : 'overview-dot'}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>

        <div className="overview-goals-container">
       
          <div className="track-meter">
          <TrackMeter />
          </div>
        </div>

        <div className="overview-bills-container">
          <h1>Upcoming Bills</h1>
          <BillsList />
        </div>
      </div>

      <div className="overview-section overview-middle-section">
        <div className="overview-recenttransactions-container">
          <h1>Recent Transactions</h1>
          <RecentTransaction />
        </div>

        <div className="overview-graphs-container">
          <div className="overview-bargraph-container">
            <h1>Monthly Bar Graph</h1>
            <BarGraph 
              months={monthlyData.months} 
              creditAmounts={monthlyData.creditAmounts} 
              debitAmounts={monthlyData.debitAmounts} 
            />
          </div>
          
          <div className="overview-expensebreakdown-container">
            <h1>Expense Breakdown</h1>
            <ExpenseBreakdown />
          </div>
        </div>
      </div>
    </div>
);

};

export default Overview;

