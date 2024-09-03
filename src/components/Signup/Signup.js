import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      toast.error('All fields must be filled!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9099/person/register', {
        username,
        password,
      });
      
      if (response.status === 201) {
        toast.success('Signed up successfully! Logging in...');
      }
      
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('User already exists!');
      } else {
        toast.error('There was an error signing up!');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image"></div>
      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <h1>Fin.Track</h1>
          <h3> Sign Up</h3>
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
      <ToastContainer/>
    </div>
  );
};

export default SignUp;
