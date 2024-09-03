import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExpenseBreakdown.css';

function ExpenseBreakdown() {
    const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
    const [previousMonthTotal, setPreviousMonthTotal] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);
    const [categoryData, setCategoryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const extractedUsername = decodedToken.username;
                setUsername(extractedUsername);
                setNewTransaction(prevState => ({
                    ...prevState,
                    userName: extractedUsername,
                }));
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }

        const fetchAndCalculateTotals = async () => {
            try {
                const response = await axios.get('http://localhost:2002/TransactionHistory', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                calculateMonthlyTotals(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        fetchAndCalculateTotals();
    }, []);

    const calculateMonthlyTotals = (transactions) => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const currentYear = today.getFullYear();
        const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        const currentMonthCategoryTotals = {};
        const previousMonthCategoryTotals = {};

        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            const month = transactionDate.getMonth();
            const year = transactionDate.getFullYear();
            const category = transaction.goal; 
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

        for (const category in previousMonthCategoryTotals) {
            if (!currentMonthCategoryTotals.hasOwnProperty(category)) {
                categoryPercentageChange.push({
                    category,
                    currentMonthTotal: '0.00',
                    previousMonthTotal: previousMonthCategoryTotals[category].toFixed(2),
                    percentageChange: '-100.00'
                });
            }
        }

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

        setCategoryData(categoryPercentageChange);
    };

    const getArrow = (percentageChange) => {
        return percentageChange > 0 ? '▲' : '▼';
    };

    const totalPages = Math.ceil(categoryData.length / itemsPerPage);

    const paginatedData = categoryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="expense-container">
            <div className="category-summary">
                {paginatedData.map(({ category, currentMonthTotal, previousMonthTotal, percentageChange }) => (
                    <div className="category-box" key={category}>
                        <div className="category-header">
                            <span className="category-name">{category}</span>
                            <span className={`percentage-arrow ${percentageChange > 0 ? 'up' : 'down'}`}>
                                {Math.abs(percentageChange)}%{getArrow(percentageChange)}
                            </span>
                        </div>
                        <div className="category-body">
                            <p>${currentMonthTotal}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {totalPages > 1 && (
                    Array.from({ length: totalPages }, (_, index) => (
                        <span
                            key={index}
                            className={`pagination-dot ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        ></span>
                    ))
                )}
            </div>
        </div>
    );
}

export default ExpenseBreakdown;
