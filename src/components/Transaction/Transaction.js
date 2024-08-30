import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Transaction.css';
import { Modal, Button, Form } from 'react-bootstrap';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [goal, setGoal] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [accountName, setAccountName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [uniqueAccountNames, setUniqueAccountNames] = useState([]);
    const [goalsData, setGoalsData] = useState([]);
    
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    // Fetch transactions and set unique account names
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2002/TransactionHistory');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:9099/api'); // Adjust the URL as needed
                const fetchedTransactions = response.data;
                const accountNames = fetchedTransactions.map(transaction => transaction.accountName);
                const uniqueNames = [...new Set(accountNames)];
                setUniqueAccountNames(uniqueNames);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        const fetchGoalsData = async () => {
            try {
                const response = await axios.get('http://localhost:2003/expense'); // Adjust the URL as needed
                const tempGoals = response.data;
                const gNames = tempGoals.map(goal => goal.goalName);
                const uniqueGoals = [...new Set(gNames)];
                setGoalsData(uniqueGoals);
            } catch (error) {
                console.error('Error fetching goals:', error);
            } 
        };

        fetchData();
        fetchAccounts();
        fetchGoalsData();
    }, []);

    const addTransaction = async () => {
        try {
            await axios.post('http://localhost:2002/TransactionHistory', {
                accountName: accountName,
                itemId: 1,
                goal: goal,
                transactionType: paymentType,
                date: "2024-08-28",
                amount: amount
            });

            console.log("Posted Successfully");

            // Fetch updated transaction list after adding
            const updatedData = await axios.get('http://localhost:2002/TransactionHistory');
            setTransactions(updatedData.data);

            const accountNames = updatedData.data.map(transaction => transaction.accountName);
            const uniqueNames = [...new Set(accountNames)];
            setUniqueAccountNames(uniqueNames);

            console.log('Unique Account Names after update:', uniqueNames);

            handleClose();
        } catch (error) {
            console.error("Something went wrong while posting data:", error);
        }
    };

    return (
        <div className="container mt-5">
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
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
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
                <button className="addAccounts" onClick={handleShow}> Add Transaction</button>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formAccountName">
                            <Form.Label>Account Name</Form.Label>
                            <div className="custom-dropdown">
                                <Form.Control
                                    as="select"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                >
                                    <option value="">Select Account Name</option>
                                    {uniqueAccountNames.map((name, index) => (
                                        <option key={index} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formGoal">
                            <Form.Label>Goal</Form.Label>
                            <div className="custom-dropdown">
                                <Form.Control
                                    as="select"
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                >
                                    <option value="">Select Your Goal</option>
                                    {goalsData.map((name, index) => (
                                        <option key={index} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formPaymentType">
                            <Form.Label>Payment Type</Form.Label>
                            <div className="custom-dropdown">
                                <Form.Control
                                    as="select"
                                    value={paymentType}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                >
                                    <option value="">Select Payment Type</option>
                                    <option value="Credit">Credit</option>
                                    <option value="Debit">Debit</option>
                                </Form.Control>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date Of Payment</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={addTransaction}>
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Transaction;
