
import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h2>Contact Us</h2>
                    <p>Email: bbb@example.com</p>
                    <p>Phone: +097272626</p>
                </div>
                <div className="footer-section">
                    <h2>Follow Us</h2>

                    <Link to={'https://www.facebook.com/bipashalamsal.56/'}>Facebook</Link>
                    <p>Instagram</p>
                </div>
                <div className="footer-section">
                    <h2>Links</h2>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/photo'}>Photos</Link>
                    <Link to={'/blog'}>Blog</Link>

                    <Link to={'/customizeTrip'}>Customize Trip</Link>
                </div>
            </div>
            <div className="footer-bottom">
                <p className={'copyright'}>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
