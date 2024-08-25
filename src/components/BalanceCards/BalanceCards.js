import React from 'react';
import './BalanceCard.css';

const BalanceCards = () => (
    <div className="cardsContainer">
        {cardData.map((card, index) => (
            <div className="card" key={index}>
                <div className="cardHeader">
                    <h4>{card.title}</h4>
                    <img src={card.logo} alt="Bank Logo" className= "cardLogo" />
                </div>
                <p>{card.accountNumber}</p>
                <h3>{card.amount}</h3>
                <div className="cardActions">
                    <button className="removeButton">Remove</button>
                    <button className="detailsButton">Details</button>
                </div>
            </div>
        ))}
        <div className="card">
            <button className="addAccountButton">Add Accounts</button>
            <p className="editAccountLink">Edit Accounts</p>
        </div>
    </div>
);

const cardData = [
    { title: 'Credit Card', logo: 'path_to_mastercard_logo', accountNumber: '3388 4556 8860 8***', amount: '$25000' },
    { title: 'Checking', logo: 'path_to_visa_logo', accountNumber: '693 456 69 9****', amount: '$25000' },
    { title: 'Savings', logo: 'path_to_brac_bank_logo', accountNumber: '133 456 886 8****', amount: '$25000' },
    { title: 'Investment', logo: 'path_to_ab_bank_logo', accountNumber: '698 456 866 2****', amount: '$25000' },
    { title: 'Loan', logo: 'path_to_city_bank_logo', accountNumber: '363 456 896 6****', amount: '$25000' },
];

export default BalanceCards;
