import './packageDelete.css'
import { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Admin from "../Admin/Admin.tsx";

function ItemDisplay() {
    const queryClient = useQueryClient();
    const [editingPackage, setEditingPackage] = useState(null);

    const { data } = useQuery({
        queryKey: ["GET_PACKAGE_ALL"],
        queryFn() {
            return axios.get("http://localhost:8081/package/getAll", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        },
    });

    const deletePackage = useMutation({
        mutationKey: ["DELETE_PACKAGE"],
        mutationFn: (packageId) => {
            return axios.delete(`http://localhost:8081/package/deleteById/${packageId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        },
        onSuccess: () => {
            // Invalidate and refetch data after successful deletion
            queryClient.invalidateQueries("GET_PACKAGE_ALL");
        },
    });
    const handleDelete = (packageId, packageName) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${packageName}?`);

        if (confirmDelete) {
            deletePackage.mutate(packageId);
        }
    };

    return (
        <>
            <div className={"parent"}>
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>Package Name</th>
                        {/* Add more table headers as needed */}
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.data.map((pkg) => (
                        <tr key={pkg.id}>
                            <td>
                                {editingPackage && editingPackage.id === pkg.id ? (
                                    <>
                                        {/* Edit Form */}
                                        <input
                                            type="text"
                                            value={editingPackage.packageName}
                                            onChange={(e) =>
                                                setEditingPackage({
                                                    ...editingPackage,
                                                    packageName: e.target.value,
                                                })
                                            }
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* Display Package Information */}
                                        {pkg.packageName}
                                    </>
                                )}
                            </td>
                            <td>
                                {editingPackage && editingPackage.id === pkg.id ? (
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
                                            <button className={'del'} onClick={() => handleDelete(pkg.id, pkg.packageName)}>Delete</button>
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

export default ItemDisplay;
