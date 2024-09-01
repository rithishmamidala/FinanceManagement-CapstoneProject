import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import axios from 'axios';


export default function TrackMeter() {
    const [sumOfCreditsandDebits, setSumOfCreditsandDebits] = useState(0);
    const [total, setTotal] = useState(0);

    const calculateGaugeValue = (current, max) => {
        return current / max; // This will return a value between 0 and 1
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:2002/TransactionHistory');
                const transactionData = response.data;

                // Find the most recent month
                const recentMonth = transactionData.reduce((latest, transaction) => {
                    const transactionDate = new Date(transaction.date);
                    return transactionDate > latest ? transactionDate : latest;
                }, new Date(0));

                // Filter transactions for the most recent month
                const filteredTransactions = transactionData.filter(transaction => {
                    const transactionDate = new Date(transaction.date);
                    return transactionDate.getMonth() === recentMonth.getMonth() &&
                        transactionDate.getFullYear() === recentMonth.getFullYear();
                });

                // Calculate the sum of credits and debits for the recent month
                let totalSum = 0;
                filteredTransactions.forEach(transaction => {
                    if (transaction.transactionType === "Credit") {
                        totalSum += transaction.amount;
                    } else if (transaction.transactionType === "Debit") {
                        totalSum -= transaction.amount;
                    }
                });

                // Update state
                setSumOfCreditsandDebits(totalSum);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        const fetchTotal = async () => {
            try {
                const response = await axios.get('http://localhost:9099/api');
                const totalData = response.data.reduce((sum, account) => sum + account.balance, 0);
                setTotal(totalData);
            } catch (error) {
                console.error('Error fetching total data:', error);
            }
        };

        fetchTotal();
        fetchTransactions();
    }, []);

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5>Budget Mapper</h5>
                <div className="d-flex justify-content-between">
                    <div>
                        <h6>Target Achieved</h6>
                        <GaugeChart
                            id="gauge-chart1"
                            nrOfLevels={1}
                            colors={['#00BFFF', '#1E90FF', '#4169E1']}
                            percent={calculateGaugeValue(total - sumOfCreditsandDebits, total)}
                            arcWidth={0.3}
                            arcPadding={0.02}
                            textColor="#000000"
                            formatTextValue={() => `$${(total - sumOfCreditsandDebits).toLocaleString()}`}
                        />
                        <p className="text-center">${sumOfCreditsandDebits.toLocaleString()}</p>

                        
                    </div>
                </div>
            </div>
        </div>
    );
}
