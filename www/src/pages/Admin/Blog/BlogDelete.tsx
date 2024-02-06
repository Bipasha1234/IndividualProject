
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Admin from "../Admin/Admin.tsx";

function BlogDelete() {
    const queryClient = useQueryClient();
    const [editingBlog, setEditingBlog] = useState(null);

    const { data } = useQuery({
        queryKey: ["GET_BLOG_ALL"],
        queryFn() {
            return axios.get("http://localhost:8081/blog/getAll");
        },
    });

    const deleteBlog = useMutation({
        mutationKey: ["DELETE_BLOG"],
        mutationFn: (blogId) => {
            return axios.delete(`http://localhost:8081/blog/deleteById/${blogId}`);
        },
        onSuccess: () => {
            // Invalidate and refetch data after successful deletion
            queryClient.invalidateQueries("GET_BLOG_ALL");
        },
    });

    const handleDelete = (blogId, blogName) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${blogName}?`);

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
                        <th>BlogName</th>
                        {/* Add more table headers as needed */}
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
                                            value={editingBlog.blogName}
                                            onChange={(e) =>
                                                setEditingBlog({
                                                    ...editingBlog,
                                                    blogName: e.target.value,
                                                })
                                            }
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* Display Package Information */}
                                        {pkg.blogName}
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
                                            <button className={'del'} onClick={() => handleDelete(pkg.id, pkg.blogName)}>Delete</button>
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

export default BlogDelete;
