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
          <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
               type="checkbox"
               className="custom-control-input"
               id="customCheck1"
             />
            
              <label className="custom-control-label" htmlFor="customCheck1">
               Remember me
             </label>
          </div>
          <a href="/sign-up">Sign up</a>
         </div>
                {error && <div className="error">{error}</div>} {/* Display error message */}
                
                <button type="submit" className="btn btn-primary"disabled={loading}>
                     {loading ? 'Logging in...' : 'Login'} {/* Loading state */}
                 </button>
       
        </form>
      </div>
    </div>
        
        // <div className="loginContainer">
        //     <div className="login-image"></div>
        //     <form onSubmit={handleSubmit}>
        //         <h3>Sign In</h3>
        //         <div className="mb-3">
        //             <label> username</label>
        //             <input
        //                 type="text"
        //                 className='form-control'
        //                 value={username}
        //                 placeholder='enter email'
        //                 onChange={(e) => setUsername(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div className="mb-3">
        //             <label htmlFor="password">Password</label>
        //             <input
        //                 type="password"
        //                 className='form-control'
        //                 value={password}
        //                 placeholder='enter password'
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div className="mb-3">
        //   <div className="custom-control custom-checkbox">
        //     <input
        //       type="checkbox"
        //       className="custom-control-input"
        //       id="customCheck1"
        //     />
        //      <label className="custom-control-label" htmlFor="customCheck1">
        //       Remember me
        //     </label>
        //   </div>
        // </div>
        //         {error && <div className="error">{error}</div>} {/* Display error message */}
                
        //         <button type="submit" className="btn btn-primary"disabled={loading}>
        //             {loading ? 'Logging in...' : 'Login'} {/* Loading state */}
        //         </button>
        //     </form>
        // </div>
    );
};

export default Login;
