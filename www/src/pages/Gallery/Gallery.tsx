// Photo.tsx

import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import axios from 'axios';

import './galler.css';
import Navbar from "../Navbar/Navbar.tsx";
import Footer from "../Footer/Footer.tsx";

interface Photo {
    id: number;
    galleryImage: string; // Assuming galleryImage is a base64-encoded string
}

const Photo: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        // Assuming you have a token stored in localStorage
        // const token = localStorage.getItem('token');

        // Check if token exists

        axios.get('http://localhost:8081/gallery/getAll', {
            // headers: {
            //     Authorization: `Bearer ${token}` // Assuming it's a bearer token
            // }
        })
            .then((response) => {
                setPhotos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching photos:', error);
            });
    });


    const handleIncrement = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const handleDecrement = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <>
            <Navbar/>
        <div className='gallery-container'>
            <div className={'Gname-container'}>


                <p className={'name-tt'}>Gallery</p>
            </div>



            <div className='gallery-content'>

                {/* Left Arrow */}
                <div className='arrow-container left-arrow' onClick={handleDecrement}>
                    <BsChevronCompactLeft className='text-2xl' />
                </div>

                {/* Image */}
                {photos.length > 0 && (
                    <img
                        src={`data:image/jpeg;base64,${photos[currentIndex]?.galleryImage}`}
                        alt="Screenshot"
                        className='image-gallery'
                    />
                )}

                {/* Right Arrow */}
                <div className='arrow-container right-arrow' onClick={handleIncrement}>
                    <BsChevronCompactRight className='text-2xl' />
                </div>

                {/* Dot Navigation */}
                <div className='dot'>
                    {photos.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className={`dot-item ${currentIndex === slideIndex ? 'text-blue-500' : 'text-gray-300'}`}
                        >
                            <RxDotFilled />
                        </div>
                    ))}
                </div>
            </div>



        </div>

            <Footer/>
        </>
    );
};

export default Photo;
