import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure you have axios installed for HTTP requests

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        setLoading(true); // Start loading
        setError(''); // Clear previous errors

        try {
            const response = await axios.post('http://localhost:9099/person/login', { username, password });
            console.log(response); // Debugging statement
            if (response.data.token) {
                console.log(response.data); // Debugging statement
                localStorage.setItem('authToken', response.data.token);
                onLogin(); // Notify parent about successful login
                navigate('/overview'); 
            }
            else{
              console.log("problem");
            }
        } catch (error) {
            console.error('Login failed', error);
            setError('Login failed. Please check your credentials and try again.'); // Set error message
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="loginContainer">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>} {/* Display error message */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'} {/* Loading state */}
                </button>
            </form>
        </div>
    );
};

export default Login;
