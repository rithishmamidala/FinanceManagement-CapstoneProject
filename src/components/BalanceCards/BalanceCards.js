import React, { useState, useEffect } from 'react';
import './BalanceCard.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BalanceCards = () => {
    const [showModal, setShowModal] = useState(false);
    const [cardData, setCardData] = useState([]);

    const [accountTitle, setAccountTitle] = useState('');
    const [accountNumber, setAccountNumber] = useState(''); 
    const [accountType, setAccountType] = useState(''); 
    const [accountCVV, setAccountCVV] = useState('');
    const [amount, setAmount] = useState('');

    // Fetch data from the backend using a GET request
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9099/api'); // Adjust the URL as needed
                setCardData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);  // Empty dependency array means this runs once when the component mounts

    const add = async () => {
        try {
            await axios.post('http://localhost:9099/api', {
                id: cardData.length + 1,  // Incremental ID (you might want to let the backend handle this)
                accountName: accountTitle,
                accountNumber: accountNumber,
                cardType: accountType,
                cvv: accountCVV,
                balance: amount
            });

            toast.success("Data posted successfully!");

            // Option 1: Re-fetch data from backend after adding a new account
            const updatedData = await axios.get('http://localhost:9099/api');
            setCardData(updatedData.data);

            setShowModal(false);  
        } catch (error) {
            console.error("Something went wrong while posting data:", error);
            toast.error("Failed to post data.");
        }
    };

    function deleteById(id) {
        axios.delete(`http://localhost:9099/api/${id}`)
            .then(() => {
                setCardData(cardData.filter(card => card.id !== id));
                toast.success("Account removed successfully!");
            })
            .catch(error => {
                console.error("Error deleting account:", error);
                toast.error("Failed to delete the account.");
            });
    }

    return (
        <>   
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
                        <button className="removeButton" onClick={() => deleteById(card.id)}>Remove</button>
                        <button className="detailsButton">Details</button>
                    </div>
                </div>
            ))}
            <div className="card">
                <button className="addAccountButton" onClick={() => setShowModal(true)}>Add Accounts</button>
                <p className="editAccountLink">Edit Accounts</p>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Add Account</h2>
                        <form onSubmit={(e) => {e.preventDefault(); add();}}>
                            <div className="form-group">
                                <label>Account Title:</label>
                                <input
                                    type="text"
                                    placeholder="Enter account title"
                                    value={accountTitle}
                                    onChange={(e) => setAccountTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Account Number:</label>
                                <input
                                    type="text"
                                    placeholder="Enter account number"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Account Type:</label>
                                <input
                                    type="text"
                                    placeholder="Select Account Type"
                                    value={accountType}
                                    onChange={(e) => setAccountType(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>CVV:</label>
                                <input
                                    type="text"
                                    placeholder="Enter CVV number"
                                    value={accountCVV}
                                    onChange={(e) => setAccountCVV(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Amount:</label>
                                <input
                                    type="text"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
        <ToastContainer />
        </>
    );
};

export default BalanceCards;
