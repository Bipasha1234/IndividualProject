import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import './blogCreate.css'
import Admin from '../Admin/Admin.tsx';



function BlogCreate() {
    const apiCall = useMutation({
        mutationKey: ['POST_ITEM'],
        mutationFn: async (formData) => {
            try {
                console.log(formData);

                const response = await axios.post('http://localhost:8081/blog/save', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                      authorization: "Bearer " + localStorage.getItem("token")
                    },
                });

                console.log(response.data);

                alert('Blog created successfully!');

                return response.data;
            } catch (error) {
                // Handle errors
                console.error('Error:', error);
                throw error;
            }
        },
    });

    const { register, handleSubmit } = useForm();
    const [blogDescription, setBlogDescription] = useState('');

    const handleDescriptionChange = (value) => {
        setBlogDescription(value);
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('blogName', data.blogName);
        formData.append('blogDescription', blogDescription);

        // Append the blogImage file
        formData.append('blogImage', data.blogImage[0]);

        apiCall.mutate(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'blogs'}>
                    <div className={'blog-fields'}>
                        <div className={'div-name'}>
                            <div className={'name'}>
                                <label htmlFor="blogName">Blog Name:</label>
                                <input type="text" {...register('blogName')} />
                            </div>
                        </div>

                        <div className={'desc'}>
                            <label className={'desc-label'} htmlFor="blogDescription">
                                Blog Description:
                            </label>
                            <ReactQuill
                                theme="snow"
                                value={blogDescription}
                                onChange={handleDescriptionChange}
                            />
                        </div>

                        <label htmlFor="blogImage">Blog Image:</label>
                        <input type="file" {...register('blogImage')} />

                        <div className={'sub'}>
                            <button className={'blog-submit'} type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <div>
                <Admin />
            </div>

        </>
    );
}

export default BlogCreate;
