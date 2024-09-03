import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecentTransaction.css'; // Assume you have a corresponding CSS file
import {jwtDecode} from 'jwt-decode';
const ITEMS_PER_PAGE = 5; // Number of transactions per page

const RecentTransaction = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [recentDebits, setRecentDebits] = useState([]);
  const [recentCredits, setRecentCredits] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
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
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:2002/TransactionHistory',  {
          headers: {
          'Authorization': `Bearer ${token}`,
        } , });
        const transactions = response.data;

        // Sort transactions by date
        const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        setAllTransactions(sortedTransactions);
        setRecentDebits(sortedTransactions.filter(transaction => transaction.transactionType === 'Debit'));
        setRecentCredits(sortedTransactions.filter(transaction => transaction.transactionType === 'Credit'));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }
  }, []);

  const totalPages = Math.ceil(
    (selectedTab === 'all' ? allTransactions.length :
     selectedTab === 'revenue' ? recentCredits.length : recentDebits.length) / ITEMS_PER_PAGE
  );

  const getPaginatedTransactions = () => {
    const transactions = selectedTab === 'all' ? allTransactions :
                          selectedTab === 'revenue' ? recentCredits : recentDebits;
    return transactions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  };

  const renderTransactions = (transactions) => {
    return transactions.map((transaction, index) => (
      <tr key={index}>
        <td>{transaction.goal}</td>
        <td>${transaction.amount}</td>
      </tr>
    ));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="recent-transactions">
      <div className="tabs">
        <span onClick={() => setSelectedTab('all')} className={selectedTab === 'all' ? 'active' : ''}>All</span>
        {/* <span onClick={() => setSelectedTab('revenue')} className={selectedTab === 'revenue' ? 'active' : ''}>Revenue</span>
        <span onClick={() => setSelectedTab('expense')} className={selectedTab === 'expense' ? 'active' : ''}>Expense</span> */}
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Goal</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {renderTransactions(getPaginatedTransactions())}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <span
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={currentPage === index + 1 ? 'dot active' : 'dot'}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default RecentTransaction;
