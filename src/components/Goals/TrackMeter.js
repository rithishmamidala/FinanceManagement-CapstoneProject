import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GaugeChart from 'react-gauge-chart';

const TrackMeter = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [currentMonthSpent, setCurrentMonthSpent] = useState(0);
  const [previousMonthBalance, setPreviousMonthBalance] = useState(0);

  useEffect(() => {
    const fetchAccountsData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:2001/api',  {
          headers: {
          'Authorization': `Bearer ${token}`,
        } , });
        const accounts = response.data;
        const total = accounts.reduce((sum, account) => sum + account.balance, 0);
        setTotalBalance(total);
      } catch (error) {
        console.error('Error fetching accounts data:', error);
      }
    };

    const fetchTransactionData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:2002/TransactionHistory',  {
          headers: {
          'Authorization': `Bearer ${token}`,
        } , });
        const transactions = response.data;

        // Extracting month and year from the transaction date
        const getMonthAndYear = (date) => {
          const parsedDate = new Date(date);
          return `${parsedDate.getFullYear()}-${parsedDate.getMonth() + 1}`;
        };

        // Grouping transactions by month
        const transactionsByMonth = transactions.reduce((acc, transaction) => {
          const monthYear = getMonthAndYear(transaction.date);
          if (!acc[monthYear]) acc[monthYear] = [];
          acc[monthYear].push(transaction);
          return acc;
        }, {});

        // Get most recent month and previous month
        const months = Object.keys(transactionsByMonth).sort((a, b) => new Date(b) - new Date(a));
        const currentMonth = months[0];
        const previousMonth = months[1];

        // Calculate sum of credits and debits for the current month
        const currentMonthTransactions = transactionsByMonth[currentMonth] || [];
        const currentMonthTotal = currentMonthTransactions.reduce((sum, transaction) => {
          return sum + (transaction.transactionType === 'Debit' ? transaction.amount : -transaction.amount);
        }, 0);
        setCurrentMonthSpent(currentMonthTotal);

        // Calculate balance up to the end of the previous month
        let previousBalance = totalBalance;
        if (previousMonth) {
          const previousMonthTransactions = transactionsByMonth[previousMonth];
          previousBalance = previousMonthTransactions.reduce((sum, transaction) => {
            return sum + (transaction.transactionType === 'Credit' ? transaction.amount : -transaction.amount);
          }, previousBalance);
        }
        setPreviousMonthBalance(previousBalance);
      } catch (error) {
        console.error('Error fetching transactions data:', error);
      }
    };

    fetchAccountsData();
    fetchTransactionData();
  }, [totalBalance]);

  const gaugeValue = currentMonthSpent / totalBalance ;

  return (
    <div>
      <h2>Track Meter</h2>
      <GaugeChart
        id="gauge-chart1"
        nrOfLevels={10}
        percent={gaugeValue}
        textColor="#000"
        formatTextValue={() => `${currentMonthSpent} / ${totalBalance}`}
      />
    </div>
  );
};

export default TrackMeter;
