import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';


function BlogHome() {
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

            <div className={'main-div-home'}>
                <div style={{ width: '100%', fontSize: '25px' }}>
                    <strong>Blogs</strong>
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
        </>
    );
}

export default BlogHome;
