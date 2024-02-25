import React, { useState } from 'react';
import axios from 'axios';


import './login.css';
const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        userName: '',
        password: ''
    });

    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/authenticate', credentials);
            const token = response.data.token;
            localStorage.setItem('token', token);
            alert('Login successful');
            // Redirect to user form or any other authenticated route
            window.location.href = '/admin';
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed');
        }
    };

    return (
        <div className="login-form-container">
            <h2 className={'login-account'}>Login to your account</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={credentials.userName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
