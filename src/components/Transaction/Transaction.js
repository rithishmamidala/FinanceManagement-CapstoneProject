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

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2002/TransactionHistory');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const addTransaction = async () => {
        try {
            await axios.post('http://localhost:2002/TransactionHistory/transactions/process', {
               accountName: accountName,
                ItemId: 1,
                Goal: goal,
                transactionType: paymentType,
                date: "2024-08-28",
                amount: amount
            });

            console.log("posted Successfully");
            // Fetch updated transaction list after adding
            const updatedData = await axios.get('http://localhost:2002/TransactionHistory');
            setTransactions(updatedData.data);

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
                            <th scope="col">Shop Name</th>
                            <th scope="col">Date of Payment</th>
                            <th scope="col">Payment Type</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>Home</td>
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
                        <Form.Group controlId="formAccountTitle">
                            <Form.Label>Account Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Account Name"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formGoal">
                            <Form.Label>Goal</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Goal"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPaymentType">
                            <Form.Label>Payment Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Select Payment Type"
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                            />
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
