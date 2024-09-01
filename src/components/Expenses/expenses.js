import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarGraph from '../BarGraph/barGraph';
import './expenses.css';

function Expenses() {
    const [targetAmounts, setTargetAmounts] = useState([]);
    const [achievedAmounts, setAchievedAmounts] = useState([]);
    const [monthlyData, setMonthlyData] = useState({ months: [], creditAmounts: [], debitAmounts: [] });
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
    const [previousMonthTotal, setPreviousMonthTotal] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);
    const [dateRange, setDateRange] = useState([null, null]);
    const [expenseGoals, setExpenseGoals] = useState([
        { category: 'Housing', amount: 0 },
        { category: 'Food', amount: 0 },
        { category: 'Transportation', amount: 0 },
        { category: 'Entertainment', amount: 0 },
        { category: 'Shopping', amount: 0 },
        { category: 'Others', amount: 250 },
    ]);

    // New state to hold category-wise data
    const [categoryData, setCategoryData] = useState([]);

    // Fetch transactions and aggregate monthly data
    useEffect(() => {
        const fetchMonthlyData = async () => {
            try {
                const response = await axios.get('http://localhost:2002/TransactionHistory');
                const transactions = response.data;
                aggregateMonthlyData(transactions);
                calculateMonthlyTotals(transactions); // Calculate totals for current and previous months
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchMonthlyData();
    }, []);

    const aggregateMonthlyData = (transactions) => {
        const monthlyTotals = {};
        const currentDate = new Date();
        const last12Months = [];

        // Generate an array of the last 12 months with year
        for (let i = 11; i >= 0; i--) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const monthYear = date.toLocaleString('default', { month: 'short' }) + '-' + date.getFullYear();
            last12Months.push(monthYear);
            monthlyTotals[monthYear] = { credit: 0, debit: 0 };
        }

        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            const monthYear = transactionDate.toLocaleString('default', { month: 'short' }) + '-' + transactionDate.getFullYear();

            // Check if the transaction falls within the last 12 months
            if (last12Months.includes(monthYear) && transactionDate >= new Date(currentDate.getFullYear(), currentDate.getMonth() - 11, 1)) {
                if (transaction.transactionType === 'Credit') {
                    monthlyTotals[monthYear].credit += parseFloat(transaction.amount);
                } else if (transaction.transactionType === 'Debit') {
                    monthlyTotals[monthYear].debit += parseFloat(transaction.amount);
                }
            }
        });

        const months = last12Months; // Already ordered correctly from the last 12 months
        const creditAmounts = months.map(monthYear => monthlyTotals[monthYear].credit);
        const debitAmounts = months.map(monthYear => monthlyTotals[monthYear].debit);

        setMonthlyData({
            months,
            creditAmounts,
            debitAmounts
        });
    };

    const calculateMonthlyTotals = (transactions) => {
        const today = new Date();
        const currentMonth = today.getMonth(); // 0-indexed (January is 0)
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Handle December case
        const currentYear = today.getFullYear();
        const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        // Initialize objects to hold totals by category
        const currentMonthCategoryTotals = {};
        const previousMonthCategoryTotals = {};

        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            const month = transactionDate.getMonth();
            const year = transactionDate.getFullYear();
            const category = transaction.goal; // Assuming 'goal' is the category field
            const amount = parseFloat(transaction.amount);

            if (transaction.transactionType === 'Debit') {
                if (month === currentMonth && year === currentYear) {
                    currentMonthCategoryTotals[category] = (currentMonthCategoryTotals[category] || 0) + amount;
                }

                if (month === previousMonth && year === previousYear) {
                    previousMonthCategoryTotals[category] = (previousMonthCategoryTotals[category] || 0) + amount;
                }
            }
        });

        // Calculate percentage changes for each category
        const categoryPercentageChange = [];
        for (const category in currentMonthCategoryTotals) {
            const currentAmount = currentMonthCategoryTotals[category];
            const previousAmount = previousMonthCategoryTotals[category] || 0;
            const percentageChange = previousAmount === 0
                ? (currentAmount > 0 ? 100 : 0)
                : ((currentAmount - previousAmount) / previousAmount) * 100;
            categoryPercentageChange.push({
                category,
                currentMonthTotal: currentAmount.toFixed(2),
                previousMonthTotal: previousAmount.toFixed(2),
                percentageChange: Math.floor(percentageChange)
            });
        }

        // Handle categories that exist in previousMonth but not in currentMonth
        for (const category in previousMonthCategoryTotals) {
            if (!currentMonthCategoryTotals.hasOwnProperty(category)) {
                categoryPercentageChange.push({
                    category,
                    currentMonthTotal: '0.00',
                    previousMonthTotal: previousMonthCategoryTotals[category].toFixed(2),
                    percentageChange: '-100.00' // Indicates 100% decrease
                });
            }
        }
        

        // Calculate total amounts for current and previous months (overall)
        const currentMonthTotalAmount = Object.values(currentMonthCategoryTotals).reduce((sum, amount) => sum + amount, 0);
        const previousMonthTotalAmount = Object.values(previousMonthCategoryTotals).reduce((sum, amount) => sum + amount, 0);

        setCurrentMonthTotal(currentMonthTotalAmount);
        setPreviousMonthTotal(previousMonthTotalAmount);

        if (previousMonthTotalAmount !== 0) {
            const change = ((currentMonthTotalAmount - previousMonthTotalAmount) / previousMonthTotalAmount) * 100;
            setPercentageChange(change.toFixed(2));
        } else {
            setPercentageChange('N/A');
        }

        // Set category-wise data
        setCategoryData(categoryPercentageChange);
    };
    const getArrow = (percentage) => {
        if (percentage > 0) return '↑'; // Upward arrow for positive change
        if (percentage < 0) return '↓'; // Downward arrow for negative change
        return ''; // No arrow for zero change
    };

    const handleCloseGoalModal = () => setShowGoalModal(false);
    const handleShowGoalModal = () => {
        setShowGoalModal(true);
    };

    const formatDateToLocal = (date) => {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // Adjust to local timezone
        return d.toISOString().slice(0, 10); // Return date in yyyy-mm-dd format
    };

    return (
        <div className="container mt-5 goals-container">
            <div className="card mb-3">
                <h5>Monthly Bar Graph Example</h5>
                <BarGraph 
                    months={monthlyData.months} 
                    creditAmounts={monthlyData.creditAmounts} 
                    debitAmounts={monthlyData.debitAmounts} 
                />
            </div>

             <div className="expense-container">
               
             <div className="category-summary">
                    {categoryData.map(({ category, currentMonthTotal, previousMonthTotal, percentageChange }) => (
                        <div className="category-box" key={category}>
                            <div className="category-header">
                                <span className="category-name">{category}</span>
                                <span className={`percentage-arrow ${percentageChange > 0 ? 'up' : 'down'}`}>
                                    {Math.abs(percentageChange)}%{getArrow(percentageChange)}
                                </span>
                            </div>
                            <div className="category-body">
                                <p> ${currentMonthTotal}</p>
                                {/* <p>Previous Month Total: ${previousMonthTotal}</p>
                                <p>Percentage Change: {percentageChange}%</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

           
        </div>
    );
}

export default Expenses;
