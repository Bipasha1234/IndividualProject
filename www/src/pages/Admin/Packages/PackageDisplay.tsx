import './packageDisplay.css';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import Admin from '../Admin/Admin.tsx';
import ReactQuill from "react-quill";

function PackageDisplay() {
    const queryClient = useQueryClient();
    const [editingPackage, setEditingPackage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const token = localStorage.getItem('token');

    const { data } = useQuery({
        queryKey: ['GET_PACKAGE_ALL'],
        queryFn() {
            return axios.get('http://localhost:8081/package/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        },
    });

    const updatePackage = useMutation({
        mutationKey: ['UPDATE_PACKAGE'],
        mutationFn: (updatedPackage) => {
            const formData = new FormData();
            formData.append('packageName', updatedPackage.packageName);
            formData.append('packageDifficulty', updatedPackage.packageDifficulty);
            formData.append('packageDescription', updatedPackage.packageDescription);
            formData.append('packagePerPrice', updatedPackage.packagePerPrice);
            formData.append('packageMaxAltitude', updatedPackage.packageMaxAltitude);
            formData.append('packageBestTime', updatedPackage.packageBestTime);
            formData.append('packageItinerary', updatedPackage.packageItinerary);
            formData.append('packageFaq', updatedPackage.packageFaq);
            formData.append('packageDuration', updatedPackage.packageDuration);

            if (imageFile) {
                formData.append('packageImage', imageFile);
            }

            return axios.put(`http://localhost:8081/package/update/${updatedPackage.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('GET_PACKAGE_ALL');
            setEditingPackage(null);
        },
    });

    const handleEdit = (pkg) => {
        setEditingPackage(pkg);
    };

    const handleUpdate = () => {
        updatePackage.mutate(editingPackage);
    };

    const handleCancelEdit = () => {
        setEditingPackage(null);
    };
    const handleQuillChange = (field, value) => {
        setEditingPackage({
            ...editingPackage,
            [field]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };
    return (
        <>
            <div className={'parent'}>
                <table>
                    <thead>
                    <tr>
                        <th>Package Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.data.map((pkg) => (
                        <tr key={pkg.id}>
                            <td onClick={() => handleEdit(pkg)}>{pkg.packageName}</td>
                            {/*{pkg.packageImage && (*/}
                            {/*    <img*/}
                            {/*        src={`data:image/png;base64,${pkg.packageImage}`}
                            {/*        alt="Package Image"*/}
                            {/*        style={{ maxWidth: '100px' }}*/}
                            {/*    />*/}
                            {/*)}*/}
                            <td>
                                {editingPackage && editingPackage.id === pkg.id ? (
                                    <div className="edit-form">
                                        {/* Edit Form Elements */}
                                        <label>Package Name:</label>
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

                                        <label>Package Difficulty:</label>
                                        <textarea value={editingPackage.packageDifficulty} onChange={(e) => setEditingPackage({ ...editingPackage, packageDifficulty: e.target.value, }) } />
                                         <label>Package Per Price:</label>
                                        <textarea value={editingPackage.packagePerPrice} onChange={(e) => setEditingPackage({ ...editingPackage, packagePerPrice: e.target.value, }) } />
                                        <label>Package Max Altitude:</label>
                                        <textarea value={editingPackage.packageMaxAltitude} onChange={(e) => setEditingPackage({ ...editingPackage, packageMaxAltitude: e.target.value, }) } />

                                        <label>Package Image:</label>
                                        <input type="file" onChange={(e) => handleImageChange(e)} />
                                        {editingPackage.packageImage && (
                                            <img
                                                src={`data:image/png;base64,${editingPackage.packageImage}`}
                                                alt="Package Image"
                                                style={{ maxWidth: '100px' }}
                                            />
                                        )}


                                        <label>Package Best Time:</label> <textarea value={editingPackage.packageBestTime} onChange={(e) => setEditingPackage({ ...editingPackage, packageBestTime: e.target.value, }) } />

                                        <label>Package Description:</label>
                                        <ReactQuill
                                            theme="snow"
                                            value={editingPackage.packageDescription}
                                            onChange={(value) => handleQuillChange('packageDescription', value)}
                                        />

                                        <label>Package Faq:</label>
                                        <ReactQuill
                                            theme="snow"
                                            value={editingPackage.packageFaq}
                                            onChange={(value) => handleQuillChange('packageFaq', value)}
                                        />

                                        <label>Package Itinerary:</label>
                                        <ReactQuill
                                            theme="snow"
                                            value={editingPackage.packageItinerary}
                                            onChange={(value) => handleQuillChange('packageItinerary', value)}
                                        />
                                        <label>Package Duration:</label> <textarea value={editingPackage.packageDuration} onChange={(e) => setEditingPackage({ ...editingPackage, packageDuration: e.target.value, }) } />
                                        {/* ... (add other fields for editing) */}
                                        <button onClick={handleUpdate}>Save</button>
                                        <button className="cancel" onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <>

                                        <button className={'edit-btn'} onClick={() => handleEdit(pkg)}>Edit</button>
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

export default PackageDisplay;