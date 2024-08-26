// Transaction.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Transaction.css'; // Optional: Add additional CSS for table styling if needed

const Transaction = () => {
    // Define the transactions data directly in this file
    const transactions = [
        { id: 1, shopName: 'Store A', dateOfPayment: '2024-08-01', paymentType: 'Credit Card', amount: 150.00 },
        { id: 2, shopName: 'Store B', dateOfPayment: '2024-08-05', paymentType: 'Cash', amount: 50.00 },
        { id: 3, shopName: 'Store C', dateOfPayment: '2024-08-10', paymentType: 'Debit Card', amount: 75.00 },
        // Add more transactions as needed
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Transaction Table</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Shop Name</th>
                            <th scope="col">Date of Payment</th>
                            <th scope="col">Payment Type</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <th>{transaction.id}</th>
                                <td>{transaction.shopName}</td>
                                <td>{transaction.dateOfPayment}</td>
                                <td>{transaction.paymentType}</td>
                                <td>${transaction.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transaction;
