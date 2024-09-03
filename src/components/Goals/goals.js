import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {jwtDecode} from 'jwt-decode';
import TrackMeter from './TrackMeter';
import './goals.css';

function Goals() {
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [goal, setGoal] = useState("");
    const [target, setTarget] = useState(0);
    const [expenseGoals, setExpenseGoals] = useState([]);
    const [error, setError] = useState(""); // State to store error messages
    
    const handleCloseGoalModal = () => setShowGoalModal(false);
    const handleShowGoalModal = () => {
        setShowGoalModal(true);
        setGoal(""); // Reset goal name on modal open
        setTarget(0); // Reset target amount on modal open
    };

    const add = async () => {
        
        try {
            // Validate input
            if (!goal || target <= 0) {
                setError("Please enter a valid goal name and target amount.");
                return;
            }

            const token = localStorage.getItem('authToken');
            const decodedToken = jwtDecode(token);
            const extractedUsername = decodedToken.username;
            
            await axios.post('http://localhost:2003/expense', {
                goalName: goal,
                goalDescription: "Food Expenses",
                amount: target,
                userName:extractedUsername 
            });

            // Option 1: Re-fetch data from backend after adding a new account
            const updatedData = await axios.get('http://localhost:2003/expense', {
                headers: {
                'Authorization': `Bearer ${token}`,
              } , } );
            setExpenseGoals(updatedData.data);

            handleCloseGoalModal();
            setError(""); // Clear error on successful save
        } catch (error) {
            setError("Something went wrong while posting data.");
            console.error("Error posting data:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
           
            
            
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:2003/expense', {
                    headers: {
                    'Authorization': `Bearer ${token}`,
                  } , } ); // Adjust the URL as needed
                setExpenseGoals(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("Error fetching expense goals.");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-5 goals-container">
           
            
            {/* <div className="trackmeter-container trackmeter-goals"> */}
            {/* <h1 style={{"text-align":"center" ,"font-size":"20px"}}>Trackmeter</h1>
            <div className="trackmeter-container">
            
            <TrackMeter />
            </div> */}
            {/* </div> */}
            

            <div className="card mb-3">
                <div className="card-body">
                    <h5 style={{"text-align":"center" ,"font-size":"20px"}}>Expenses Goals by Category</h5>
                    <div className="row">
                        {expenseGoals.map((goal, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <h6>{goal.goalName}</h6>
                                        <h4>${goal.amount.toFixed(2)}</h4>
                                        <Button variant="outline-primary" onClick={() => alert('Adjust Goal')}>
                                            Adjust
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body text-center">
                                    <Button className="addAccountButton" onClick={handleShowGoalModal}>Add Goal</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Adding Goal */}
            {showGoalModal && (
                <div className="popup-overlay">
                    <div className="popup-form">
                        <div className="popup-form-content">
                            <h2>Set New Goal</h2>
                            <Form>
                                <Form.Group controlId="goalNameInput">
                                    <Form.Label>Goal Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Your Goal"
                                        value={goal}
                                        onChange={(e) => setGoal(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="targetAmountInput" className="mt-3">
                                    <Form.Label>Enter Goal Target</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Your Target Amount"
                                        value={target}
                                        onChange={(e) => setTarget(parseFloat(e.target.value))}
                                    />
                                </Form.Group>
                                {error && <p className="text-danger mt-2">{error}</p>}
                            </Form>
                            <Button variant="secondary" onClick={handleCloseGoalModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={add}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Goals;