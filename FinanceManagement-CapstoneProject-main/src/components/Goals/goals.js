import React, { useState } from 'react';
import axios from 'axios';
import GaugeChart from 'react-gauge-chart';
import DatePicker from 'react-datepicker';
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiCalendar } from 'react-icons/fi';
import './goals.css';

function Goals() {
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [targetAchieved, setTargetAchieved] = useState(12500);
    const [thisMonthTarget, setThisMonthTarget] = useState(20000);
    const [newTargetAchieved, setNewTargetAchieved] = useState(targetAchieved);
    const [newThisMonthTarget, setNewThisMonthTarget] = useState(thisMonthTarget);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');

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
            {/* Saving Goals Section */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5>Saving Goals</h5>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h6>Target Achieved</h6>
                            <GaugeChart
                                id="gauge-chart1"
                                nrOfLevels={1}
                                colors={['#00BFFF', '#1E90FF', '#4169E1']}
                                percent={calculateGaugeValue(targetAchieved, thisMonthTarget)}
                                arcWidth={0.3}
                                arcPadding={0.02}
                                textColor="#000000"
                            />
                            <p className="text-center">${targetAchieved.toLocaleString()}</p>
                            <Button variant="outline-primary" onClick={handleShowGoalModal}>
                                Adjust Goal
                            </Button>
                        </div>
                        <div className="date-picker-wrapper" style={{ marginTop: '30px' }}>
                            <FiCalendar className="calendar-icon" />
                            <DatePicker
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => {
                                    setDateRange(update);
                                }}
                                isClearable={false}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Select Date Range"
                                customInput={
                                    <button className="date-picker-button">
                                        {startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : 'Select Date Range'}
                                    </button>
                                }
                            />
                        </div>
                    </div>
                </div>
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

export default Goals;
