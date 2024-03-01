import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from "../Admin/Admin.tsx";
import './message.css';

const AdminMessage = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/message/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');

        const confirmed = window.confirm('Are you sure you want to delete this message?');

        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8081/message/deleteById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(messages.filter(message => message.id !== id));
            } catch (error) {
                console.error('Error deleting message:', error);
            }
        }
    };

    return (
        <div className={'message-main'}>

            <Admin />
           <h1 className={'message-h1'}>Ask a message form</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Message</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {messages.map((message) => (
                    <tr key={message.id}>
                        <td>{message.messageName}</td>
                        <td>{message.messageEmail}</td>
                        <td>{message.messageNumber}</td>
                        <td>{message.messageMsg}</td>
                        <td>
                            <button className={'delete-button'} onClick={() => handleDelete(message.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminMessage;
