import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import { SiYourtraveldottv } from 'react-icons/si';
import { useQuery } from 'react-query';
import axios from 'axios';
import {useParams} from "react-router";
import {Button} from "react-query/types/devtools/styledComponents";

function Admin() {
    const [showBlogSubButtons, setShowBlogSubButtons] = useState(false);
    const [showGallerySubButtons, setShowGallerySubButtons] = useState(false);
    const [showPackageSubButtons, setShowPackageSubButtons] = useState(false);
    const { id } = useParams();


    const handleLogout = () => {

        localStorage.removeItem('token');

        window.location.href = '/login';
    };

    const { data: packageData } = useQuery({
        queryKey: ['GET_PACKAGE_BY_ID', id],
        queryFn: () =>
            axios.get(`http://localhost:8081/package/getById/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the request headers
                },
            }),
    });

    useEffect(() => {
        if (packageData) {
            console.log('Package Details:', packageData.data);
        }
    }, [packageData]);

    const toggleBlogSubButtons = () => {
        setShowBlogSubButtons(!showBlogSubButtons);
    };

    const togglePackageSubButtons = () => {
        setShowPackageSubButtons(!showPackageSubButtons);
    };

    const toggleGallerySubButtons = () => {
        setShowGallerySubButtons(!showGallerySubButtons);
    };

    return (
        <>
            <div>
                <div className={'sidebar'}>
                    <div className={'elements'}>
                        <div className={'logODiv'}>
                            <SiYourtraveldottv />
                            <span className={'Voyago'}>VOYAGO</span>
                        </div>
                        <div className={'buttons'}>
                            <div className={'package'}>
                                <div style={{color:"white",cursor:'pointer'}} onClick={toggleBlogSubButtons}>Packages</div>
                                {showBlogSubButtons && (
                                    <div className={'sub-buttons'}>
                                        <Link to={'/admin/uploadPackages'}>- Post Packages</Link>
                                        <Link to={'/admin/managePackages'}>- Edit Packages</Link>
                                        <Link to={'/admin/packageDelete'}>- Delete Packages</Link>
                                    </div>
                                )}
                            </div>
                            <div className={'blog'}>
                                <div style={{color:"white",cursor:'pointer'}} onClick={togglePackageSubButtons}>Blog</div>
                                {showPackageSubButtons && (
                                    <div className={'sub-buttons'}>
                                        <Link to={'/admin/blogCreate'}>- Post Blogs</Link>
                                        <Link to={'/admin/blogDisplay'}>- Edit Blogs</Link>
                                        <Link to={'/admin/blogDelete'}>- Delete Blogs</Link>
                                    </div>
                                )}
                            </div>
                            <div className={'gallery'}>
                                <div style={{color:"white",cursor:'pointer'}} onClick={toggleGallerySubButtons}>Gallery</div>
                                {showGallerySubButtons && (
                                    <div className={'sub-buttons'}>
                                        <Link to={'/admin/gallery'}>- Post & Edit Gallery</Link>
                                        <Link to={'/admin/galleryDelete'}>- Delete Gallery</Link>
                                    </div>
                                )}
                            </div>
                            <div className={'contact-us'}>
                                <Link to={'/booking/admin'}>Booking</Link>
                            </div>
                            <div className={'contact-us'}>
                                <Link to={'/admin/customizetrip'}>Customize Trip</Link>
                            </div>
                            <div className={'contact-us'}>
                                <Link to={'/admin/askquestion'}>Ask a question</Link>
                            </div>
                            <div className={'logout-div'}>
                                {/* Call handleLogout function on button click */}
                                <button className={'log-out-btn'} onClick={handleLogout}>
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;
