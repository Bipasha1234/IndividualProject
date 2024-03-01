
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
            return axios.get("http://localhost:8081/blog/getAll", {
                headers: {
                  authorization: "Bearer " + localStorage.getItem("token")  // Include the token
                }
            });
        },
    });

    const deleteBlog = useMutation({
        mutationKey: ["DELETE_BLOG"],
        mutationFn: (blogId) => {
            return axios.delete(`http://localhost:8081/blog/deleteById/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        },
        onSuccess: () => {

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

                                        {pkg.blogName}
                                    </>
                                )}
                            </td>
                            <td>
                                {editingBlog && editingBlog.id === pkg.id ? (
                                    <>

                                        {/*<button onClick={handleUpdate}>Save</button>*/}
                                        {/*<button onClick={handleCancelEdit}>Cancel</button>*/}
                                    </>
                                ) : (
                                    <>

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
