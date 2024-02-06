import {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import './Admin.css';
import {SiYourtraveldottv} from "react-icons/si";
import {useQuery} from "react-query";
import axios from "axios";

function Admin() {
    const [showBlogSubButtons, setShowBlogSubButtons] = useState(false);
    const [showGallerySubButtons, setShowGallerySubButtons]=useState(false);
    const [showPackageSubButtons, setShowPackageSubButtons]=useState(false);
    const toggleBlogSubButtons = () => {
        setShowBlogSubButtons(!showBlogSubButtons);


    };
    const { id } = useParams();   console.log('Current ID:', id);

    // Fetch package details based on the provided ID
    const { data: packageData } = useQuery({
        queryKey: ['GET_PACKAGE_BY_ID', id],
        queryFn: () => axios.get(`http://localhost:8081/package/getById/${id}`),
    });

    useEffect(() => {
        if (packageData) {
            // Do something with the package details if needed
            console.log("Package Details:", packageData.data);
        }
    }, [packageData]);
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

                        <div className={'logoDiv'}>
                            <SiYourtraveldottv className={'main-icon'}/>

                            <span className={'voyago'}>VOYAGO</span>
                        </div>
                        <div className={'buttons'}>
                            <div className={'package'}>
                                <Link  onClick={toggleBlogSubButtons}>Packages</Link>
                                {showBlogSubButtons && (
                                    <div className={'sub-buttons'}>
                                        <Link to={'/admin/uploadPackages'}>- Post Packages</Link>
                                        <Link to={'/admin/managePackages'}>- Edit Packages</Link>
                                        <Link to={'/admin/packageDelete'}>- Delete Packages</Link>

                                    </div>
                                )}
                            </div>
                            <div className={'blog'}>
                                <Link onClick={togglePackageSubButtons} >Blog</Link>
                                {showPackageSubButtons && (
                                    <div className={'sub-buttons'}>
                                        <Link to={'/admin/blogCreate'}>- Post Blogs</Link>
                                        <Link to={'/admin/blogDisplay'}>- Edit Blogs</Link>
                                        <Link to={'/admin/blogDelete'}>- Delete Blogs</Link>

                                    </div>
                                    )}
                            </div>
                            <div className={'gallery'}>
                                <Link onClick={toggleGallerySubButtons} >Gallery</Link>
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
                        </div>


                    </div>
                </div>
            </div>


        </>
    );
}

export default Admin;
