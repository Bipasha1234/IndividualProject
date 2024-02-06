// // Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
//
// const Login = () => {
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
//             const response = await axios.post('/authenticate', formData);
//             localStorage.setItem('token', response.data.token);
//             history('/admin');
//         } catch (error) {
//             console.error('Login failed:', error.response.data);
//         }
//     };
//
//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
//                 <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };
//
// export default Login;
