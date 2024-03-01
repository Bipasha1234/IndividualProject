
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar.tsx";
import { useMutation } from "react-query";
import './Booking.css'
import { useParams } from "react-router";
import Footer from "../Footer/Footer.tsx";

interface TravelData {
    bookingName: string;
    bookingPhoneNumber: string;
    bookingEmail: string;
    bookingTripDate: string;
    bookingTravellers: string;
    bookingExtra: string;packageId: string;
}

function Booking() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [bookingName, setBookingName] = useState("");
    const [bookingPhoneNumber, setBookingPhoneNumber] = useState("");
    const [bookingEmail, setBookingEmail] = useState("");
    const [bookingTripDate, setBookingTripDate] = useState("");
    const [bookingTravellers, setBookingTravellers] = useState("");
    const [bookingExtra, setBookingExtra] = useState("");
    const [formErrors, setFormErrors] = useState({
        bookingName: "",
        bookingPhoneNumber: "",
        bookingEmail: "",
        bookingTripDate: "",
        bookingTravellers: "",
        bookingExtra: "",
     // Added field
    });
    const [packageId, setPackageId] = useState<string>("");

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...formErrors };

        if (!bookingName.trim()) {
            newErrors.bookingName = "Full Name is required.";
            valid = false;
        } else {
            newErrors.bookingName = "";
        }

        if (!bookingPhoneNumber.trim()) {
            newErrors.bookingPhoneNumber = "Phone Number is required.";
            valid = false;
        } else if (!/^\d{10}$/.test(bookingPhoneNumber)) {
            newErrors.bookingPhoneNumber =
                "Valid 10-digit phone number is required.";
            valid = false;
        } else {
            newErrors.bookingPhoneNumber = "";
        }

        if (
            !bookingEmail.trim() ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingEmail)
        ) {
            newErrors.bookingEmail = "Valid email address is required.";
            valid = false;
        } else {
            newErrors.bookingEmail = "";
        }

        if (!bookingTripDate.trim()) {
            newErrors.bookingTripDate = "Trip Date is required.";
            valid = false;
        } else {
            newErrors.bookingTripDate = "";
        }

        if (!bookingTravellers.trim()) {
            newErrors.bookingTravellers = "Number of Travelers is required.";
            valid = false;
        } else {
            newErrors.bookingTravellers = "";
        }

        if (!bookingExtra.trim()) {
            newErrors.bookingExtra =
                "Extra Requirements is required.";
            valid = false;
        } else {
            newErrors.bookingExtra = "";
        }

        setFormErrors(newErrors);
        return valid;
    };

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {

                const response = await Axios.get(`http://localhost:8081/package/getById/${id}`, {

                });
                const packageData = response.data;
                setData(packageData);
                setPackageId(packageData.id); // Set the packageId
            } catch (error) {
                console.error('Error fetching package details:', error);
            }
        };

        fetchPackageDetails();
    }, [id]);


    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        if (data && bookingTravellers.trim() !== "") {
            const total = parseInt(bookingTravellers) * parseFloat(data.packagePerPrice);
            setTotalCost(total);
        }
    }, [data, bookingTravellers]);




    const mutation = useMutation(
        (formData: TravelData) =>
            Axios.post("http://localhost:8081/booking/save", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }),
        {
            onSuccess: (data) => {
                console.log("Trip saved successfully:", data);
            },
            onError: (error) => {
                console.error("Error saving trip:", error);
            },
        }
    );
    const submit = () => {
        if (validateForm()) {
            mutation.mutate({
                bookingName,
                bookingPhoneNumber,
                bookingEmail,
                bookingTripDate,
                bookingTravellers,
                bookingExtra,packageId
            });


            setBookingName("");
            setBookingPhoneNumber("");
            setBookingEmail("");
            setBookingTripDate("");
            setBookingTravellers("");
            setBookingExtra("");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-booking">
                <div className="col-lg">
                    <div className="standard-form-planTrip">
                        <h3 className="details">Book Your Trip</h3>
                        <div className="inner-box">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="required">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                formErrors.bookingName &&
                                                "border-red-500"
                                            }`}
                                            value={bookingName}
                                            required
                                            onChange={(e) =>
                                                setBookingName(e.target.value)
                                            }
                                        />
                                        {formErrors.bookingName && (
                                            <p className="error-message">
                                                {formErrors.bookingName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="required">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                formErrors.bookingPhoneNumber &&
                                                "border-red-500"
                                            }`}
                                            value={bookingPhoneNumber}
                                            required
                                            onChange={(e) =>
                                                setBookingPhoneNumber(e.target.value)
                                            }
                                        />
                                        {formErrors.bookingPhoneNumber && (
                                            <p className="error-message">
                                                {formErrors.bookingPhoneNumber}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="required">
                                            Email Address
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                formErrors.bookingEmail &&
                                                "border-red-500"
                                            }`}
                                            value={bookingEmail}
                                            required
                                            onChange={(e) =>
                                                setBookingEmail(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {formErrors.bookingEmail && (
                                            <p className="error-message">
                                                {formErrors.bookingEmail}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="required">
                                            Trip Date
                                        </label>
                                        <input
                                            type="date"
                                            className={`form-control ${
                                                formErrors.bookingTripDate &&
                                                "border-red-500"
                                            }`}
                                            value={bookingTripDate}
                                            required
                                            onChange={(e) =>
                                                setBookingTripDate(e.target.value)
                                            }
                                        />
                                        {formErrors.bookingTripDate && (
                                            <p className="error-message">
                                                {formErrors.bookingTripDate}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                                    <div className="form-group">
                                        <label className="required">
                                            Number of Travelers
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${
                                                formErrors.bookingTravellers &&
                                                "border-red-500"
                                            }`}
                                            min="1"
                                            value={bookingTravellers}
                                            required
                                            onChange={(e) =>
                                                setBookingTravellers(e.target.value)
                                            }
                                        />
                                        {formErrors.bookingTravellers && (
                                            <p className="error-message">
                                                {formErrors.bookingTravellers}
                                            </p>
                                        )}
                                    </div>



                                    <div className="form-group">
                                        <label className="required">
                                            Extra Requirements
                                        </label>
                                        <textarea
                                            type="text"
                                            className={`form-control ${
                                                formErrors.bookingExtra &&
                                                "border-red-500"
                                            }`}
                                            value={bookingExtra}
                                            required
                                            onChange={(e) =>
                                                setBookingExtra(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {formErrors.bookingExtra&& (
                                            <p className="error-message">
                                                {formErrors.bookingExtra}
                                            </p>
                                        )}
                                    </div>




                                <div className="button-submit">
                                    <button className="btn" onClick={submit}>
                                        Book
                                    </button>
                                </div>

                        </div>
                    </div>
                </div>
                <div className={'side'}>
                    {data && (
                        <div>
                            {data.packageImage && (
                                <img
                                    src={`data:image/png;base64,${data.packageImage}`}
                                    alt="Package Image"
                                    style={{ height:'250px',borderRadius:'5px' }}
                                />
                            )}
                            <div className={'n-p'}>
                                <h1 style={{fontSize:'26px'}}>{data.packageName}</h1>
                                <p style={{fontSize:'18px',fontWeight:'bold'}}>Trip Duration: {data.packageDuration}</p>
                                <p style={{fontSize:'18px',fontWeight:'bold'}}>Per Person: Rs. {data.packagePerPrice}</p>
                                <p style={{fontSize:'18px',fontWeight:'bold'}}>Total Person: {bookingTravellers} person(s)</p>
                                <div className={'bochure'}>
                                    <div className={'price-row'}>
                                        <p style={{fontSize:'18px',fontWeight:'bold'}}>Total Price:  </p>
                                        <p style={{fontSize:'18px',fontWeight:'bold',color:'darkblue'}}>Rs. {totalCost}</p>
                                    </div>
                                    <p style={{lineHeight:'2px',fontSize:'14px'}}>  Rs. {data.packagePerPrice} * {bookingTravellers} person (s)</p>
                                </div>

                                <div className={'pay'}>
                                    <strong >Pay upon arrival - Cash on visit</strong>
                                </div>


                            </div>



                        </div>
                    )}
                </div>


            </div>
            <Footer/>

        </>
    );
}

export default Booking;
