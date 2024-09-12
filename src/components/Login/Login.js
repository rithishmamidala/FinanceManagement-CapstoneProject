import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure you have axios installed for HTTP requests
import * as Components from './Components'; // Adjust path if necessary
import './Login.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading
    const [signIn, setSignIn] = useState(true); // State to manage sign-in vs. sign-up

    const navigate = useNavigate();
    const handleSignUp = async (event) => {
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
            } else {
                setError('Invalid credentials.'); // Set error message for invalid token
 
            }
        } catch (error) {
            console.error('Login failed', error);
            setError('Login failed. Please check your credentials and try again.'); // Set error message
        } finally {
            setLoading(false); 
        }
    };

    return (
        <>
        <div className="login">
            <Components.Container>
                <Components.SignUpContainer signingIn={signIn}>
                    <Components.Form onSubmit={handleSignUp}>
                        <Components.Title>Create Account</Components.Title>
                        <Components.Input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} 
                            value={username}/>
                        <Components.Input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <Components.Button>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signingIn={signIn}>
                    <Components.Form onSubmit={handleSubmit}>
                        <Components.Title>Sign In</Components.Title>
                        <Components.Input 
                            type="text" 
                            placeholder="Username" 
                            onChange={(e) => setUsername(e.target.value)} 
                            value={username}
                        />
                        <Components.Input 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password}
                        />
                        {error && <p className="error">{error}</p>}
                        <Components.Anchor href="#">Already have an account?</Components.Anchor>
                        <Components.Button type="submit" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signingIn={signIn}>
                    <Components.Overlay signingIn={signIn}>
                        <Components.LeftOverlayPanel signingIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please log in with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => setSignIn(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>
                        <Components.RightOverlayPanel signingIn={signIn}>
                            <Components.Title>Hello...!</Components.Title>
                            <Components.Paragraph>
                                
                                Enter your personal details and start your journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => setSignIn(false)}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
            
        </div>
        <ToastContainer/>
        </>
    );
};

export default Login;
