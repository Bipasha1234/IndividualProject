import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import Navbar from "../Navbar/Navbar.tsx";
import './Blog.css';
import Footer from "../Footer/Footer.tsx";

function BlogList() {


    const { data, isLoading, isError } = useQuery('GET_BLOG_ALL', async () => {
        const response = await axios.get('http://localhost:8081/blog/getAll', {

        });
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

                            <a style={{color:'black'}} href={`/blogById/${blog.id}`}>
                                {blog.blogImage && (
                                    <img
                                        src={`data:image/png;base64,${blog.blogImage}`}
                                        alt="Blog Image"
                                        style={{ maxWidth: '400px', maxHeight: '240px' }}
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
