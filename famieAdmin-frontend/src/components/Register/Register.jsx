import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../imgs/logo.png';
import { Link } from 'react-router-dom';
import './registerstyle.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:6192/api/admin/register', {
        name,
        email,
        username,
        password,
      });
  
      if (response.data.success) {
        // Navigate to login page immediately after successful registration
        navigate('/login');
      } else {
        setErrorMessage(response.data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        setErrorMessage(`An error occurred: ${error.response.data.message}`);
      } else {
        setErrorMessage('An error occurred during registration.');
      }
    }
  };
  
  return (
    <div className="login-container">
      <div className="left-content">
        <p className="main-text">Welcome, Admin!</p>
        <p className="sub-text">Experience the best in free parental control. Our advanced tools and expertise ensure your children's online activities are secure and educational.</p>
      </div>
      <div className="box-forms">
        <div className="logo">
          <img src={Logo} alt="Famie Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="button" id="createButton">Sign Up</button>
          <div className="log-in-link">
            <p className="link">Already using Famie?&nbsp;&nbsp;
              <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
