import React, { useState } from 'react';
import axios from 'axios';

import { Modal, Button, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarGraph from '../BarGraph/barGraph';
import './expenses.css';

function Expenses() {
    const targetAmounts = [1000, 1200, 1100, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100];
    const achievedAmounts = [800, 1150, 1000, 1350, 1450, 1400, 1550, 1650, 1750, 1950, 1980, 2050];


    const [showGoalModal, setShowGoalModal] = useState(false);
    const [targetAchieved, setTargetAchieved] = useState(12500);
    const [thisMonthTarget, setThisMonthTarget] = useState(20000);
    const [newTargetAchieved, setNewTargetAchieved] = useState(targetAchieved);
    const [newThisMonthTarget, setNewThisMonthTarget] = useState(thisMonthTarget);


    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [expenseGoals, setExpenseGoals] = useState([
        { category: 'Housing', amount: 0 },
        { category: 'Food', amount: 0 },
        { category: 'Transportation', amount: 0 },
        { category: 'Entertainment', amount: 0 },
        { category: 'Shopping', amount: 0},
        { category: 'Others', amount: 250 },
    ]);

    const handleCloseGoalModal = () => setShowGoalModal(false);
    const handleShowGoalModal = () => {
        setNewTargetAchieved(targetAchieved);
        setNewThisMonthTarget(thisMonthTarget);
        setShowGoalModal(true);
    };

    const formatDateToLocal = (date) => {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // Adjust to local timezone
        return d.toISOString().slice(0, 10); // Return date in yyyy-mm-dd format
    };

    const handleSaveGoal = async () => {
        if (!isNaN(newTargetAchieved) && !isNaN(newThisMonthTarget)) {
            setTargetAchieved(newTargetAchieved);
            setThisMonthTarget(newThisMonthTarget);

            const data = {
                targetAchieved: newTargetAchieved,
                thisMonthTarget: newThisMonthTarget,
                startDate: startDate ? formatDateToLocal(startDate) : null,
                endDate: endDate ? formatDateToLocal(endDate) : null,
            };

            try {
                await axios.post('http://localhost:9004/goals/addtarget', data);
                alert('Goal updated successfully!');
            } catch (error) {
                console.error('There was an error updating the goal!', error);
                alert('Failed to update goal. Please try again.');
            }

            handleCloseGoalModal();
        } else {
            alert('Please enter valid numbers.');
        }
    };

    const calculateGaugeValue = (current, max) => {
        return current / max;
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const day = ('0' + d.getDate()).slice(-2);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        return `${day}-${month}`;
    };

    return (
        <div className="container mt-5 goals-container">
             <div className="card mb-3">
            
            <h5>Monthly Bar Graph Example</h5>
            <BarGraph targetAmounts={targetAmounts} achievedAmounts={achievedAmounts} />
            </div>
           
            {/* Expenses Goals by Category Section */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5>Expenses Goals by Category</h5>
                    <div className="row">
                        {expenseGoals.map((goal, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <h6>{goal.category}</h6>
                                        <p>${goal.amount.toFixed(2)}</p>
                                        <Button variant="outline-primary" onClick={() => alert('Adjust Goal')}>
                                            Adjust
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for Adjust Goal */}
            <Modal show={showGoalModal} onHide={handleCloseGoalModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Adjust Goal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="targetAchievedInput">
                            <Form.Label>Target Achieved</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter target achieved"
                                value={newTargetAchieved}
                                onChange={(e) => setNewTargetAchieved(parseFloat(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group controlId="thisMonthTargetInput" className="mt-3">
                            <Form.Label>This Month Target</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter this month target"
                                value={newThisMonthTarget}
                                onChange={(e) => setNewThisMonthTarget(parseFloat(e.target.value))}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseGoalModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveGoal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Expenses;
