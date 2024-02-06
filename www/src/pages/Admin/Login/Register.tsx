// // Register.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
//
// const Register = () => {
//     const [formData, setFormData] = useState({ username: '', password: '' });
//     const history = useNavigate();
//
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('/user/save', formData);
//             history('/admin/login');
//         } catch (error) {
//             console.error('Registration failed:', error.response.data);
//         }
//     };
//
//     return (
//         <div>
//             <h2>Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
//                 <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };
//
// export default Register;
