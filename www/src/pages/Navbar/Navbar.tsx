import './Navbar.css';
import { CiSearch } from "react-icons/ci";
import { SiYourtraveldottv } from "react-icons/si";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/package/getAll');
                setPackages(response.data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchData();
    }, []);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setShowDropdown((prev) => !prev);
    };

    return (
        <>

        <div className='navBar'>

            <div className={'logoDiv'}>
                <SiYourtraveldottv className={'main-icon'}/>
                <span className={'Voyago'}>VOYAGO</span>
            </div>


            <div className={'components'}>

                <div className={'destination'} onClick={(e) => toggleDropdown(e)}>
                    <div className={'tr'}>Trekking and Tour</div>
                    {showDropdown && (
                        <div className="dropdown-content">
                            {packages.map((pkg) => (
                                <Link key={pkg.id} to={`/trekkingTour/${pkg.id}`}>
                                    {pkg.packageName}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className={'Blog'}>
                    <a style={{color:'black'}} href={'/blog'}>Blog</a>
                </div>
                <div className={'aboutus'} >
                    <a  style={{color:'black'}} href={'/customizeTrip'}>
                        Customize Trip
                    </a>
                </div>
                <div className={'Gallery'}>
                    <a style={{color:'black'}} href={'/photo'}>Gallery</a>
                </div>
            </div>



        </div>
        </>
    );
};

export default Navbar;
