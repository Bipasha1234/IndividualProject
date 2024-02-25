import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from "../Admin/Admin.tsx";
import './customizeTrip.css'; // Import the CSS file

const AdminCustomizeTrip = () => {
    const [customizeTrips, setCustomizeTrips] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('http://localhost:8081/customize/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCustomizeTrips(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this plan trip?');

        if (confirmed) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:8081/customize/deleteById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // After deletion, you might want to update the UI by fetching data again or removing the deleted item from the state
                setCustomizeTrips(customizeTrips.filter(trip => trip.id !== id));
            } catch (error) {
                console.error('Error deleting customize trip:', error);
            }
        }
    };
    return (
        <div>
            <Admin />
            <div className="table-container-customizeTrip">
                <h2>Customize Trip Form</h2>
                <table className="customize-trip-table">
                    <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Email Address</th>
                        <th>Select Trip</th>
                        <th>Approx Date</th>
                        <th>Trip Length</th>
                        <th>Number of Adults</th>
                        <th>Number of Children</th>
                        <th>Tour Type</th>
                        <th>Hotel Type</th>
                        <th>Estimated Budget</th>
                        <th>Guide Language</th>
                        <th>More Info</th>
                        <th>Where Did You Find Us</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customizeTrips.map((trip) => (
                        <tr key={trip.id}>
                            <td>{trip.fullName}</td>
                            <td>{trip.phoneNumber}</td>
                            <td>{trip.emailAddress}</td>
                            <td>{trip.selectTrip}</td>
                            <td>{trip.approxDate}</td>
                            <td>{trip.tripLength}</td>
                            <td>{trip.numberOfAdults}</td>
                            <td>{trip.numberOfChildren}</td>
                            <td>{trip.tourType}</td>
                            <td>{trip.hotelType}</td>
                            <td>{trip.estimatedBudget}</td>
                            <td>{trip.guideLanguage}</td>
                            <td>{trip.moreInfo}</td>
                            <td>{trip.whereDidYouFindUs}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(trip.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCustomizeTrip;
