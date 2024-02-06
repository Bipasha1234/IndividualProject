// TrekkingTour.jsx
import React, { useState, useEffect } from 'react';
import './TrekkingTour.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.tsx';
import { GiBackPain, GiDuration } from 'react-icons/gi';
import { IoIosTime } from 'react-icons/io';
import { FaTextHeight } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import PlanTrip from "./AskQuestion.tsx";
import Footer from "../Footer/Footer.tsx";
function TrekkingTour() {

    const { id } = useParams();

    // Fetch package details based on the provided ID
    const { data: packageDetails, isLoading, isError } = useQuery({
        queryKey: ['GET_PACKAGE_BY_ID', id],
        queryFn: () => axios.get(`http://localhost:8081/package/getById/${id}`),
    });

    const [totalAmount, setTotalAmount] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isBoxTTFixed, setIsBoxTTFixed] = useState(false);

    useEffect(() => {
        // Set initial totalAmount once packageDetails is loaded
        if (packageDetails && packageDetails.data) {
            setTotalAmount(0);
        }
    }, [packageDetails]);

    useEffect(() => {
        const handleScroll = () => {
            // Adjust the scroll threshold as needed
            const scrollThreshold = 700;

            if (window.scrollY > scrollThreshold && !isBoxTTFixed) {
                setIsBoxTTFixed(true);
            } else if (window.scrollY <= scrollThreshold && isBoxTTFixed) {
                setIsBoxTTFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isBoxTTFixed]);

    const handlePlusClick = () => {
        setTotalAmount((prevTotalAmount) => prevTotalAmount + parseInt(packageDetails.data.packagePerPrice));

        setClickCount((prevClickCount) => prevClickCount + 1);
    };

    const handleMinusClick = () => {
        setTotalAmount((prevTotalAmount) => Math.max(prevTotalAmount - packageDetails.data.packagePerPrice, 0));
        setClickCount((prevClickCount) => Math.max(prevClickCount - 1, 0));
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading package details</p>;
    }

    return (
        <>
            <Navbar />

            <div className={'tt-container' }>


                <div className={'name-container'}>


                    <p className={'name-tt'}>{packageDetails.data.packageName}</p>
                </div>
                <div className={'img-box'}>
                    {packageDetails.data.packageImage && (
                        <img
                            src={`data:image/png;base64,${packageDetails.data.packageImage}`}
                            alt="Package Image"
                            style={{ maxWidth: '70%', borderRadius: '5px', marginTop: '20px' }}
                        />
                    )}

                    <div className={`box-tt ${isBoxTTFixed ? 'box-tt-fixed' : ''}`}>
                        <strong className={'perPrice'}> Price Per Person: ${packageDetails.data.packagePerPrice}</strong>

                        <div className={'click'}>
                            <strong className={'total'}>Total Amount: ${totalAmount}</strong>
                            <div style={{display:'flex',gap:'10px'}}>
                                <button onClick={handlePlusClick}>+ </button>
                                <p style={{ fontWeight: 'bold', fontSize: '20px' ,padding:'10px',display:'flex',justifyContent:'center',alignItems:'center'}}>{clickCount}</p>
                                <button onClick={handleMinusClick}>-</button>
                            </div>

                        </div>
                        <div className={'why'} >
                            <div className={'why-bookk'}>
                                <p>________________________________</p>
                            </div>
                            <div className={'book-div'}>
                                <strong className={'book'}>Why book with us</strong>
                                <div className={'points'}>
                                    <p>- Customized Trip</p>
                                    <p>- Instant Online Booking</p>
                                    <p>- Guranteed Departure</p>
                                    <p>- Experienced Staff</p>
                                    <p>- Well-Trained Guide</p>
                                </div>
                                <p>________________________________</p>
                            </div>

                        </div>

                        <div className={'qn-booking'}>
                            <button className="ask-question-button" onClick={openPopup}>
                                Ask a Question
                            </button>

                            {/* Instant Booking Button */}
                            <button className="instant-booking-button" >
                                <a className={'instant-booking-button'} href={`/booking/${id}`}>Instant Booking</a>

                            </button>

                        </div>


                    </div>

                    {isPopupOpen && (
                        <div className="question-popup">
                            <div className="popup-content">
                                {/*<button className="close-popup-button" onClick={closePopup}>*/}
                                {/*    Close*/}
                                {/*</button>*/}
                                <button className="close-popup-button" onClick={closePopup}>
                                    &#10005; {/* Unicode for the "x" character */}
                                </button>

                                <PlanTrip/>
                            </div>
                        </div>
                    )}


                </div>


                <div className={'trip-facts-container'}>
                    <div className={'trip-facts'}>
                        <div className={'h'}>
                            <h2 className={'h1'}>Trip Facts</h2>
                        </div>

                        <div className={'dd-tt'}>
                            <div className={'pic'}>
                                <div className={'pain'}>
                                    <GiBackPain />
                                </div>
                                <p>
                                    <strong>Package Difficulty:</strong> {packageDetails.data.packageDifficulty}
                                </p>
                            </div>
                            <div className={'pic'}>
                                <div className={'pain'}>
                                    <FaTextHeight />
                                </div>
                                <p>
                                    <strong>Package Max-Altitude:</strong> {packageDetails.data.packageMaxAltitude}
                                </p>
                            </div>
                        </div>

                        <div className={'best-max-tt'}>
                            <div className={'pic'}>
                                <div className={'pain'}>
                                    <IoIosTime />
                                </div>
                                <p>
                                    <strong>Package Best Time:</strong> {packageDetails.data.packageBestTime}
                                </p>
                            </div>
                            <div className={'pic'}>
                                <div className={'pain'}>
                                    <GiDuration />
                                </div>
                                <p>
                                    <strong>Package Duration:</strong> {packageDetails.data.packageDuration}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'wrap-desc'}>
                    <div className={'tt-description'}>
                        <strong style={{ fontSize: '23px' }}>About {packageDetails.data.packageName}</strong>
                        {/* Sanitize package description */}
                        <p
                            style={{ maxWidth: '830px', overflow: 'hidden', fontSize: '16px', fontFamily: 'Yu Gothic UI' }}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(packageDetails.data.packageDescription) }}
                        />
                    </div>



                    <div className={'tt-description'}>
                        <strong style={{ fontSize: '23px' }}>Itinerary</strong>
                        <div
                            style={{ maxWidth: '830px', overflow: 'hidden', fontSize: '16px', fontFamily: 'Yu Gothic UI' }}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(packageDetails.data.packageItinerary) }}
                        />
                    </div>

                    <strong style={{maxWidth: '830px' ,/* Set the maximum height as needed */
                        overflow: 'hidden',marginTop:'30px',fontSize:'22px'}}> Frequently Asked Questions </strong>
                    <div className={'tt-faq'}>
                        {/* Sanitize package FAQ */}
                        <p
                            style={{
                                maxWidth: '830px',
                                overflow: 'hidden',
                                fontFamily: 'Yu Gothic UI',
                                fontSize: '16px',
                            }}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(packageDetails.data.packageFaq) }}
                        />
                    </div>
                </div>


            </div>

            <Footer/>
        </>
    );
}

export default TrekkingTour;
