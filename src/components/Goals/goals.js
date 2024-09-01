import React, { useState,useEffect } from 'react';
import axios from 'axios';


import { Modal, Button, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TrackMeter from './TrackMeter';
import './goals.css';

function Goals() {
    const [showGoalModal, setShowGoalModal] = useState(false);
   
  
    const [goal,setGoal] = useState("");
 
    const [target,setTarget] = useState(0);
    const [expenseGoals, setExpenseGoals] = useState([]);

    const handleCloseGoalModal = () => setShowGoalModal(false);
    const handleShowGoalModal = () => {
        setShowGoalModal(true);
    };

    const handleSaveGoal = async () => {
        
        handleCloseGoalModal();
        
    };
    // console.log(expenseGoals);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2003/expense'); // Adjust the URL as needed
                setExpenseGoals(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        };

        fetchData();
    }, []); 
   
    const add = async () => {
        try {
                await axios.post('http://localhost:2003/expense', {
               goalName: goal,
                goalDescription: "Food Expenses",
                amount: target
            });

            console.log("Data posted!");
            

            // Option 1: Re-fetch data from backend after adding a new account
            const updatedData = await axios.get('http://localhost:2003/expense');
            setExpenseGoals(updatedData.data);

            handleCloseGoalModal();
        } catch (error) {
            console.error("Something went wrong while posting data:", error);
        }
    };

    return (
        <div className="container mt-5 goals-container">
            <TrackMeter/>

            <div className="card mb-3">
                <div className="card-body">
                    <h5>Expenses Goals by Category</h5>
                    <div className="row">
                        {expenseGoals.map((goal, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <h6>{goal.goalName}</h6>
                                    
                                        {/* <p>{goal.goalDescription}</p> */}
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
                            <button className="addAccountButton" onClick={handleShowGoalModal}> Add Goal </button>
                        </div>
                        </div>
                        </div>
                        

                    
                </div>

                
                </div>
                
            </div>

            {/* Modal for Adjust Goal */}
            <Modal show={showGoalModal} onHide={handleCloseGoalModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Set New Goal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="targetAchievedInput">
                            <Form.Label>Goal Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Goal"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="thisMonthTargetInput" className="mt-3">
                            <Form.Label>Enter Goal Target</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Your Target Amount"
                                onChange={(e) => setTarget(parseFloat(e.target.value))}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseGoalModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={add}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Goals;
