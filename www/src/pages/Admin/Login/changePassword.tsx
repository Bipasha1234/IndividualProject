import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
function ChangePasswordForm() {
    const [formData, setFormData] = useState({
        email: '',
        currentPassword: '',
        newPassword: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/change-password', formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="change-password-container">
            <h2 className="form-title">Change Password</h2>
            <form onSubmit={handleSubmit} className="password-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password:</label>
                    <input type="password" id="currentPassword" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password:</label>
                    <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                </div>
                <div className={'cp-div'}>
                    <button type="submit" className="submit-btn-cp">Change Password</button>
                </div>

            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
}

export default ChangePasswordForm;
