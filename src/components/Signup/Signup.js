import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9099/person/register', {
        username,
        password,
      });

      console.log('Sign-up successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('There was an error signing up!', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image"></div>
      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Personal Finance Management System</h2>
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn">
            Sign Up
          </button>
          <p className="forgot-password">
            Already registered? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
