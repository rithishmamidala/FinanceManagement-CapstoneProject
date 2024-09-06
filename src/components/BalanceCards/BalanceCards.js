import React, { useState, useEffect } from 'react';
import './BalanceCard.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import {jwtDecode} from 'jwt-decode';

const BalanceCards = ({ showFirstCardOnly = false, currentCardIndex = 0 }) => {
    const [showModal, setShowModal] = useState(false);
    const [cardData, setCardData] = useState([]);
    const [amount, setAmount] = useState('');
    const [username, setUsername] = useState('');

    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const extractedUsername = decodedToken.username;
                setUsername(extractedUsername);
                console.log(extractedUsername);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }

        const fetchData = async () => {
            
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:2001/api',  {
                    headers: {
                    'Authorization': `Bearer ${token}`,
                  } , });
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
            const response = await axios.post('http://localhost:2001/api', {
                id: cardData.length + 1,
                accountName: username,
                accountNumber: state.number,
                cardType: "savings",
                cvv: state.cvc,
                balance: amount,
                userName: state.name
            });
    
            if (response.status === 201) {
                toast.success("Data posted successfully!");
                const token = localStorage.getItem('authToken');
                const updatedData = await axios.get('http://localhost:2001/api', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setCardData(updatedData.data);
                setShowModal(false);
            } else if (response.status === 409) {
                toast.error("Data Duplication");
            } else {
                toast.error("Oops .... Something Went Wrong!");
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error("Data Duplication");
            } else {
                toast.error("Oops .... Something Went Wrong!");
            }
        }
    };
    
    // const deleteById = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:9099/api/${id}`);
    //         setCardData(cardData.filter(card => card.id !== id));
    //         toast.success("Account removed successfully!");
    //     } catch (error) {
    //         console.error("Error deleting account:", error);
    //         toast.error("Failed to delete the account.");
    //     }
    // };

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    };
    const currentCard = cardData[showFirstCardOnly ? currentCardIndex : 0] || {};

    return (
        <>   
        <div className="cardsContainer">
            {showFirstCardOnly ? (
                cardData.length > 0 && (
                    <div className="card">
                        <div className="cardContent">
                            <Cards
                                number={currentCard.accountNumber || ""}
                                expiry={currentCard.expiry || "12/24"}
                                cvc={currentCard.cvv || ""}
                                name={currentCard.accountName || ""}
                                focused={state.focus}
                            />
                        </div>
                    </div>
                )
            ) : (
                <>
                    {cardData.map((card) => (
                        <div className="card" key={card.id}>
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
                    
                    <div >
                        <button className="addAccountButton" onClick={() => setShowModal(true)}>Add Account</button>
                    </div>
                    
                    </>
            )}

            {showFirstCardOnly && cardData.length > 1 && (
                <div>
                    {cardData.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentCardIndex ? 'active' : ''}`}
                        ></span>
                    ))}
                </div>
            )}

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
                                        placeholder="CVV"
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