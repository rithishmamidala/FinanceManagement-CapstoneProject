import React, { useState, useEffect } from 'react';
import './BalanceCard.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const BalanceCards = () => {
    const [showModal, setShowModal] = useState(false);
    const [cardData, setCardData] = useState([]);
    const [amount, setAmount] = useState('');
    
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api');
                setCardData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const add = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:9000/api', {
                id: cardData.length + 1,
                accountName: state.name,
                accountNumber: state.number,
                cardType: "savings",
                cvv: state.cvc,
                balance: amount
            });

            toast.success("Data posted successfully!");

            const updatedData = await axios.get('http://localhost:9000/api');
            setCardData(updatedData.data);

            setShowModal(false);  
        } catch (error) {
            console.error("Something went wrong while posting data:", error);
            toast.error("Failed to post data.");
        }
    };

    const deleteById = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/api/${id}`);
            setCardData(cardData.filter(card => card.id !== id));
            toast.success("Account removed successfully!");
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error("Failed to delete the account.");
        }
    };

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    };

    return (
        <>   
        <div className="cardsContainer">
            {cardData.map((card, index) => (
                <div className="card" key={index}>
                    <div className="cardContent">
                        <Cards
                            number={card.accountNumber}
                            expiry={card.expiry || "12/24"}
                            cvc={card.cvv}
                            name={card.accountName}
                            focused={state.focus}
                        />
                        
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
                        <div id="PaymentForm">
                            <Cards
                                number={state.number}
                                expiry={state.expiry}
                                cvc={state.cvc}
                                name={state.name}
                                focused={state.focus}
                            />
                            <form onSubmit={add}>
                                <div>
                                    <input
                                        type="tel"
                                        name="number"
                                        placeholder="Card Number"
                                        value={state.number}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        maxLength="19"
                                        pattern="\d{16}"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Card name"
                                        value={state.name}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        name="expiry"
                                        placeholder="Expiry Date (MM/YY)"
                                        value={state.expiry}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        pattern="\d\d/\d\d"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        name="cvc"
                                        placeholder="CVC"
                                        value={state.cvc}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        maxLength="4"
                                        pattern="\d{3,4}"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        name="amount"
                                        placeholder="Amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
        <ToastContainer />
        </>
    );
};

export default BalanceCards;
