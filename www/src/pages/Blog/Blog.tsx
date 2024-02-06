import React, { ReactNode } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import Navbar from "../Navbar/Navbar.tsx";
import './Blog.css';
import Footer from "../Footer/Footer.tsx";

function BlogList() {
    const { data, isLoading, isError } = useQuery('GET_BLOG_ALL', async () => {
        const response = await axios.get('http://localhost:8081/blog/getAll');
        return response.data;
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading blogs</p>;
    }

    return (
        <>
            <Navbar />
            <div className={'main-div'}>
                <div className={'blog-container'} style={{width:'100%'}}>
                    <p >Blogs</p>
                </div>
                <div className={'next-div'}>
                    {data && data.map((blog) => (
                        <div className={'name-img-blog'} key={blog.id}>
                            {/* Use Link to create a link to the individual blog */}
                            <a style={{color:'black'}} href={`/blogById/${blog.id}`}>
                                {blog.blogImage && (
                                    <img
                                        src={`data:image/png;base64,${blog.blogImage}`} // Use the correct content type
                                        alt="Blog Image"
                                        style={{ maxWidth: '400px', maxHeight: '300px' }}
                                    />
                                )}
                                <div className={'blog-name'}>
                                    <p>{blog.blogName}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default BlogList;
