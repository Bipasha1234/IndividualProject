import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Admin from "../Admin/Admin.tsx";

function GalleryDelete() {
    const queryClient = useQueryClient();
    const [editingBlog, setEditingBlog] = useState(null);

    const { data } = useQuery({
        queryKey: ["GET_GALLERY_ALL"],
        queryFn() {
            return axios.get("http://localhost:8081/gallery/getAll", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        },
    });

    const deleteBlog = useMutation({
        mutationKey: ["DELETE_BLOG"],
        mutationFn: (blogId) => {
            return axios.delete(`http://localhost:8081/gallery/deleteById/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        },
        onSuccess: () => {
            // Invalidate and refetch data after successful deletion
            queryClient.invalidateQueries("GET_GALLERY_ALL");
        },
    });

    const handleDelete = (blogId) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete?`);

        if (confirmDelete) {
            deleteBlog.mutate(blogId);
        }
    };

    return (
        <>
            <div className={"parent"}>
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>Gallery Image</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.data.map((pkg) => (
                        <tr key={pkg.id}>
                            <td>
                                {editingBlog && editingBlog.id === pkg.id ? (
                                    <>
                                        {/* Edit Form */}
                                        <input
                                            type="text"
                                            value={editingBlog.galleryImage}
                                            onChange={(e) =>
                                                setEditingBlog({
                                                    ...editingBlog,
                                                    galleryImage: e.target.value,
                                                })
                                            }
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* Display Package Information */}
                                        {pkg.galleryImage && (
                                            <img
                                                src={`data:image/png;base64,${pkg.galleryImage}`}
                                                alt="Gallery Image"
                                                style={{ maxWidth: '100px' }}
                                            />
                                        )}
                                    </>
                                )}
                            </td>
                            <td>
                                {editingBlog && editingBlog.id === pkg.id ? (
                                    <>
                                        {/* Include other fields for editing */}
                                        {/*<button onClick={handleUpdate}>Save</button>*/}
                                        {/*<button onClick={handleCancelEdit}>Cancel</button>*/}
                                    </>
                                ) : (
                                    <>
                                        {/* Action buttons */}
                                        {/*<button onClick={() => handleEdit(pkg)}>Edit</button>*/}
                                        <div className={'delete-btn'}>
                                            <button
                                                className={'del'}
                                                onClick={() => handleDelete(pkg.id, pkg.galleryImage)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
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
        </>
    );
}

export default GalleryDelete;
