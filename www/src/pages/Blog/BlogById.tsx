// TrekkingTour.jsx
// import React, { useState, useEffect } from 'react';

import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.tsx';

import DOMPurify from 'dompurify';
function BlogById() {
    const { id } = useParams();

    // Fetch package details based on the provided ID
    const { data: packageDetails, isLoading, isError } = useQuery({
        queryKey: ['GET_BLOG_BY_ID', id],
        queryFn: () => axios.get(`http://localhost:8081/blog/getById/${id}`),
    });


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading package details</p>;
    }

    return (
        <>
            <Navbar />
                <div className={'blogId-container'}>
                    <div className={'name-container'}>
                        <p className={'name-id'}>{packageDetails.data.blogName}</p>
                    </div>


                <div className={'img-box'}>
                    {packageDetails.data.blogImage && (
                        <img
                            src={`data:image/png;base64,${packageDetails.data.blogImage}`}

                            style={{ maxWidth: '100%', borderRadius: '5px', marginTop: '20px' }}
                        />
                    )}
                </div>

                    <div className={'blog-id-desc'}>
                        <strong style={{ fontSize: '23px' }}>{packageDetails.data.blogName}</strong>
                        {/* Sanitize package description */}
                        <p
                            style={{ maxWidth: '90%', overflow: 'hidden', fontSize: '16px', fontFamily: 'Yu Gothic UI' }}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(packageDetails.data.blogDescription) }}
                        />
                    </div>


                </div>
        </>
    );
}

export default BlogById;
