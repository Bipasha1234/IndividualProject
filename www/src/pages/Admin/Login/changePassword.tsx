import React, { useState } from 'react';
import axios from 'axios';

function ChangePasswordForm() {
    const [formData, setFormData] = useState({
        email: '', // Change username to email
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
        <div>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label> {/* Change username to email */}
                    <input type="text" name="email" value={formData.email} onChange={handleChange} /> {/* Change username to email */}
                </div>
                <div>
                    <label>Current Password:</label>
                    <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
                </div>
                <div>
                    <label>New Password:</label>
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                </div>
                <button type="submit">Change Password</button>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
}

export default ChangePasswordForm;
