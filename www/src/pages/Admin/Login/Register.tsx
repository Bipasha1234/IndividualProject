import React, { useState } from 'react';
import axios from 'axios';

import './Register.css';

const RegisterForm = () => {
    const [user, setUser] = useState({
        fullName: '',
        userName: '',
        password: '',
        address: ''
    });

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8081/user/save', user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('User registered successfully!');
        } catch (error) {
            console.error('Error saving user:', error);
            alert('Failed to save user');
        }
    };

    return (
        <div className="register-form-container">
            <h2 className={'register-account'}>Register your account</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={user.fullName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={user.userName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
