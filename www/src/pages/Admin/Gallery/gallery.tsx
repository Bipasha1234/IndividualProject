import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import { useForm } from 'react-hook-form';
// import './blogCreate.css'
import Admin from '../Admin/Admin.tsx';
// import BlogDisplay from './BlogDisplay'; // Import the BlogDisplay component

import './PhotoUpload.css';
function AdminGallery() {
    const queryClient = useQueryClient();
    const [editingBlog, setEditingBlog] = useState(null);
    const [imageFile, setImageFile] = useState(null); //


    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const { data } = useQuery({
        queryKey: ['GET_GALLERY_ALL'],
        queryFn() {
            return axios.get('http://localhost:8081/gallery/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
            });
        },
    });

    const apiCall = useMutation({
        mutationKey: ['POST_ITEM'],
        mutationFn: async (formData) => {
            try {
                console.log(formData);

                // Make the POST request with FormData
                const response = await axios.post('http://localhost:8081/gallery/save', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Do something with the response if needed
                console.log(response.data);

                // Display success message using alert
                alert('Blog created successfully!');

                return response.data;
            } catch (error) {
                // Handle errors
                console.error('Error:', error);
                throw error; // Rethrow the error to propagate it to the component
            }
        },
    });

    const { register, handleSubmit } = useForm();
    // const [blogDescription, setBlogDescription] = useState('');

    // const handleDescriptionChange = (value) => {
    //     setBlogDescription(value);
    // };
    const updateBlog = useMutation({
        mutationKey: ['UPDATE_BLOG'],
        mutationFn: (updatedBlog) => {
            const formData = new FormData();

            // Check if a new image is selected
            if (imageFile) {
                formData.append('galleryImage', imageFile);
            }

            return axios.put(`http://localhost:8081/gallery/update/${updatedBlog.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('GET_GALLERY_ALL');
            setEditingBlog(null);
        },
    });

    const handleEdit = (pkg) => {
        setEditingBlog(pkg);
    };

    const handleUpdate = () => {
        updateBlog.mutate(editingBlog);
    };

    const handleCancelEdit = () => {
        setEditingBlog(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };


    const onSubmit = (data) => {
        const formData = new FormData();
        // formData.append('blogName', data.blogName);
        // formData.append('blogDescription', blogDescription); // Use the state for blogDescription

        // Append the blogImage file
        formData.append('galleryImage', data.galleryImage[0]); // Assuming blogImage is a file input

        apiCall.mutate(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'gallery-admin'}>


                        <label className={'gallery-label'} htmlFor="galleryImage">Gallery Image Upload:</label>
                        <input className={'file'} type="file" {...register('galleryImage')} />

                        <div className={'button-gallery-admin'}>
                            <button className={'blog-submit'} type="submit">
                                Submit
                            </button>
                        </div>
                    </div>

            </form>

            <div className="parent">
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th className={'blogNamee'}>Gallery Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.data.map((gallery) => (
                            <tr key={gallery.id}>
                                <td>

                                {gallery.galleryImage && (
                                    <img
                                        src={`data:image/png;base64,${gallery.galleryImage}`} // Use the correct content type
                                        alt="Gallery Image"
                                        style={{ width: '200px',height:'200px' }}
                                    />
                                )}
                                </td>

                                <td className="actionstd">
                                    {editingBlog && editingBlog.id === gallery.id ? (
                                        <div className="edit-form">


                                            <label>Gallery Image:</label>
                                            <input type="file" onChange={(e) => handleImageChange(e)} />
                                            {editingBlog.galleryImage && (
                                                <img
                                                    src={`data:image/png;base64,${editingBlog.galleryImage}`} // Use the correct content type
                                                    alt="Blog Image"
                                                    style={{ maxWidth: '100px' }}
                                                />
                                            )}
                                            {/* Add other fields for editing */}
                                            <div className="actions">
                                                <button onClick={handleUpdate}>Save</button>
                                                <button className="cancel" onClick={handleCancelEdit}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="actions">
                                            <button className={'edit-btn'} onClick={() => handleEdit(gallery)}>
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <Admin />
                </div>
            </div>

        </>
    );
}

export default AdminGallery;



    // ... (previous code)



