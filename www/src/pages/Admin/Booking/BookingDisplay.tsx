// BookingList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from "../Admin/Admin.tsx";
import  './BookingDisplay.css'
const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/booking/getAll', {
                    headers: { authorization: "Bearer " + localStorage.getItem("token") }
                });
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this booking?');

        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8081/booking/deleteById/${id}`, {
                    headers: { authorization: "Bearer " + localStorage.getItem("token") }
                });
                setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
            } catch (error) {
                console.error('Error deleting booking:', error);
            } finally {
                setSelectedBookingId(null);
            }
        }
    };

    return (
        <>
        <div  style={{marginLeft:'250px',marginTop:'40px',display:'flex',flexDirection:"column",}}>
            <h2>Booking Form</h2>
            {Array.isArray(bookings) && bookings.length > 0 ? (
                <table className="booking-table">
                    <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>No. Of Travellers</th>
                        <th>Trip Date</th>
                        <th>Extra Requirements</th>
                        <th>Package Name</th>
                        <th>Package Duration</th>
                        <th>Per Price</th>
                        <th>Total Cost</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.bookingName}</td>
                            <td>{booking.bookingPhoneNumber}</td>
                            <td>
                                <a
                                    href={`mailto:${booking.bookingEmail}`}
                                    style={{ textDecoration: 'underline', color: 'blue' }}
                                >
                                    {booking.bookingEmail}
                                </a>
                            </td>
                            <td>{booking.bookingTravellers}</td>
                            <td>{booking.bookingTripDate}</td>
                            <td>{booking.bookingExtra}</td>
                            <td>{booking.pkg.packageName}</td>
                            <td>{booking.pkg.packageDuration}</td>
                            <td>{booking.pkg.packagePerPrice}</td>
                            <td>{parseFloat(booking.bookingTravellers) * parseFloat(booking.pkg.packagePerPrice)}</td>
                            <td>
                                <button className={'delete-button'}
                                   onClick={() => handleDelete(booking.id)}>Delete</button>


                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No bookings available.</p>
            )}
        </div>

            <div>
                <Admin />
            </div>
        </>
    );
};

export default BookingList;
