import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../imgs/logo.png';
import { Link } from 'react-router-dom';
import './style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // For displaying login errors
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Attempting login with:', { email, password });
  
    try {
      const response = await axios.post('http://localhost:6192/api/admin/login', {
        email,
        password,
      });
  
      // If the request is successful and we have a token
      if (response.status === 200 && response.data.success) {
        // Store the token in local storage
        localStorage.setItem('token', response.data.token);
        
        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        // If login fails for any reason
        setErrorMessage(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      
      // Handle different error scenarios
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else if (error.response && error.response.status === 500) {
        setErrorMessage('Server error. Please try again later.');
      } else {
        setErrorMessage('An error occurred during login. Please try again.');
      }
    }
  };  


  return (
    <div className="login-container">
      <div className="left-content">
        <p className="main-text"> Welcome, Admin!</p>
        <p className="sub-text">Experience the best in free parental control. Our advanced tools and expertise ensure your children&apos;s online activities are secure and educational.</p>
      </div>
      <div className="box-form">
        <div className="logo">
          <img src={Logo} alt="Famie Logo" />
        </div>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="button" id="loginButton">Log In</button>
          <div className="log-in-link">
            <p className="link">Don&apos;t have an account yet?&nbsp;&nbsp;
              <Link to="/register">Create Account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
