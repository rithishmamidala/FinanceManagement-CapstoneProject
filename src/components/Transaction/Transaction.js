import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transaction.css'; // Assume you have a corresponding CSS file
import {jwtDecode} from 'jwt-decode'; // Correct import
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [newTransaction, setNewTransaction] = useState({
    accountName: '',
    goal: '',
    transactionType: '',
    date: '',
    amount: '',
    userName: '', // Add userName to the state
  });

  const [uniqueAccountNames, setUniqueAccountNames] = useState([]);
  const [goalsData, setGoalsData] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

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
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2002/TransactionHistory', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchAccounts = async () => {
      const token = localStorage.getItem('authToken'); // Make sure token is available here
      try {
        const response = await axios.get('http://localhost:2001/api', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const accountNames = [...new Set(response.data.map(transaction => transaction.accountName))];
        setUniqueAccountNames(accountNames);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    const fetchGoalsData = async () => {
      try {
        const response = await axios.get('http://localhost:2003/expense', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }); // Adjust the URL as needed
        const goals = [...new Set(response.data.map(goal => goal.goalName))];
        setGoalsData(goals);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchData();
    fetchAccounts();
    fetchGoalsData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:2002/TransactionHistory', newTransaction);
      toast.success('Transaction added successfully!'); // Show success toast

      // Fetch updated transaction list after adding
      const updatedData = await axios.get('http://localhost:2002/TransactionHistory', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setTransactions(updatedData.data);

      setShowModal(false); // Close the modal after success
      setNewTransaction({
        accountName: '',
        goal: '',
        transactionType: '',
        date: '',
        amount: '',
        userName: username, // Ensure userName is included
      });
    } catch (error) {
      toast.error('Something went wrong while posting data.'); // Show error toast
      console.error('Something went wrong while posting data:', error);
    }
  };

  // Get paginated transactions
  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(transactions.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <ToastContainer /> {/* Add ToastContainer for displaying toast messages */}
      <h2 className="mb-4">Transaction Table</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Goal</th>
              <th scope="col">Account Name</th>
              <th scope="col">Date of Payment</th>
              <th scope="col">Payment Type</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr key={index}>
                <th>{indexOfFirstTransaction + index + 1}</th>
                <td>{transaction.goal}</td>
                <td>{transaction.accountName}</td>
                <td>{transaction.date}</td>
                <td>{transaction.transactionType}</td>
                <td>${transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="history">
        <button className="addAccounts" onClick={() => setShowModal(true)}>Add Transaction</button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Account Name:</label>
                <select
                  name="accountName"
                  value={newTransaction.accountName}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Account Name</option>
                  {uniqueAccountNames.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Goal:</label>
                <select
                  name="goal"
                  value={newTransaction.goal}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Your Goal</option>
                  {goalsData.map((goal, index) => (
                    <option key={index} value={goal}>{goal}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Payment Type:</label>
                <select
                  name="transactionType"
                  value={newTransaction.transactionType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Payment Type</option>
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Payment:</label>
                <input
                  type="date"
                  name="date"
                  value={newTransaction.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Amount:</label>
                <input
                  type="number"
                  name="amount"
                  value={newTransaction.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => paginate(number)}
                className="page-link"
                href="#!"
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Transaction;