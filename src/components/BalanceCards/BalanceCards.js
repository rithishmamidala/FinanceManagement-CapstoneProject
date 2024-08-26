import React, { useState, useEffect } from 'react';
import './BalanceCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const BalanceCards = () => {
    const [showModal, setShowModal] = useState(false);
    const [cardData, setCardData] = useState([]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [accountTitle, setAccountTitle] = useState('');
    const [accountNumber, setAccountNumber] = useState(''); 
    const [accountType, setAccountType] = useState(''); 
    const [accountCVV, setAccountCVV] = useState('');
    const [amount, setAmount] = useState('');

    // Fetch data from the backend using a GET request
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2008/api'); // Adjust the URL as needed
                setCardData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);  // Empty dependency array means this runs once when the component mounts

    const add = async () => {
        try {
            const response = await axios.post('http://localhost:2008/api', {
                id: cardData.length + 1,  // Incremental ID (you might want to let the backend handle this)
                accountName: accountTitle,
                accountNumber: accountNumber,
                cardType: accountType,
                cvv: accountCVV,
                balance: amount
            });

            console.log("Data posted!");

            // Option 1: Re-fetch data from backend after adding a new account
            const updatedData = await axios.get('http://localhost:2008/api');
            setCardData(updatedData.data);

            // Option 2: Alternatively, you could update the state directly without re-fetching
            // const newCard = {
            //     title: accountTitle,
            //     logo: 'path_to_logo',  // Replace with actual logo path
            //     accountNumber: accountNumber,
            //     amount: `$${parseFloat(amount).toFixed(2)}`  // Format amount as currency
            // };
            // setCardData([...cardData, newCard]);

            handleClose();  // Close the modal after submission
        } catch (error) {
            console.error("Something went wrong while posting data:", error);
        }
    };

    function deleteById(id) {
        axios.delete(id)
    }

    return (
        <div className="cardsContainer">
            {cardData.map((card, index) => (
                <div className="card" key={index}>
                    <div className="cardHeader">
                        <h4>{card.accountName}</h4>
                        <img src={card.logo} alt="Bank Logo" className="cardLogo" />
                    </div>
                    <p>{card.accountNumber}</p>
                    <h3>{`$${parseFloat(card.balance).toFixed(2)}`}</h3>
                    <div className="cardActions">
                        <button className="removeButton" onClick={(e)=>{deleteById(card.id)}}>Remove</button>
                        <button className="detailsButton">Details</button>
                    </div>
                </div>
            ))}
            <div className="card">
                <button className="addAccountButton" onClick={handleShow}>Add Accounts</button>
                <p className="editAccountLink">Edit Accounts</p>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formAccountTitle">
                            <Form.Label>Account Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter account title"
                                value={accountTitle}
                                onChange={(e) => setAccountTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAccountNumber">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter account number"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAccountType">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Select Account Type"
                                value={accountType}
                                onChange={(e) => setAccountType(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAccountCVV">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter CVV number"
                                value={accountCVV}
                                onChange={(e) => setAccountCVV(e.target.value)}
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
                        <Button variant="primary" type="button" onClick={add}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default BalanceCards;
