import './BlogDisplay.css';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import Admin from '../Admin/Admin.tsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogDisplay() {
    const queryClient = useQueryClient();
    const [editingBlog, setEditingBlog] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const { data } = useQuery({
        queryKey: ['GET_BLOG_ALL'],
        queryFn() {
            return axios.get('http://localhost:8081/blog/getAll', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        },
    });


    const updateBlog = useMutation({
        mutationKey: ['UPDATE_BLOG'],
        mutationFn: (updatedBlog) => {
            const formData = new FormData();
            formData.append('blogName', updatedBlog.blogName);

            formData.append('blogDescription', updatedBlog.blogDescription);

            // Check if a new image is selected
            if (imageFile) {
                formData.append('blogImage', imageFile);
            }

            return axios.put(`http://localhost:8081/blog/update/${updatedBlog.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('GET_BLOG_ALL');
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

    return (
        <div className="parent">
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th className={'blogNamee'}>Blog Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.data.map((blog) => (
                        <tr key={blog.id}>
                            <td onClick={() => handleEdit(blog)}>{blog.blogName}</td>
                            <td className="actionstd">
                                {editingBlog && editingBlog.id === blog.id ? (
                                    <div className="edit-form">
                                        <label>Blog Name:</label>
                                        <input
                                            type="text"
                                            value={editingBlog.blogName}
                                            onChange={(e) =>
                                                setEditingBlog({
                                                    ...editingBlog,
                                                    blogName: e.target.value,
                                                })
                                            }
                                        />

                                        <label>Blog Description:</label>
                                        <ReactQuill
                                            theme="snow"
                                            value={editingBlog.blogDescription}
                                            onChange={(value) =>
                                                setEditingBlog({
                                                    ...editingBlog,
                                                    blogDescription: value,
                                                })
                                            }
                                        />

                                        <label>Blog Image:</label>
                                        <input type="file" onChange={(e) => handleImageChange(e)} />
                                        {editingBlog.blogImage && (
                                            <img
                                                src={`data:image/png;base64,${editingBlog.blogImage}`} // Use the correct content type
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
                                        <button className={'edit-btn'} onClick={() => handleEdit(blog)}>
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
    );
}

export default BlogDisplay;
