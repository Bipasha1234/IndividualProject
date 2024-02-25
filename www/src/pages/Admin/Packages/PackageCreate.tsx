import React, { useState } from 'react';
import './packageCreate.css';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import Admin from '../Admin/Admin.tsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function PackageCreate() {
    const apiCall = useMutation({
        mutationKey: ['POST_ITEM'],
        mutationFn: async (formData) => {
            try {
                console.log(formData);

                // Make the POST request with FormData
                const response = await axios.post('http://localhost:8081/package/save', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: "Bearer " + localStorage.getItem("token")
                    },
                });

                // Do something with the response if needed
                console.log(response.data);

                // Display success message using alert
                alert('Package created successfully!');

                return response.data;
            } catch (error) {
                // Handle errors
                console.error('Error:', error);
                throw error; // Rethrow the error to propagate it to the component
            }
        },
    });
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Use 'list' instead of 'list-ordered'
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'indent',
        'blockquote', 'code-block',
        'link', 'image',
    ];

    const { register, handleSubmit } = useForm();
    const [packageItinerary, setPackageItinerary] = useState('');
    const [packageFaq, setPackageFaq] = useState('');
    const [packageDescription, setPackageDescription] = useState('');
    const handleItineraryChange = (value) => {
        setPackageItinerary(value);
    };
    const handleFaqChange = (value) => {
        setPackageFaq(value);
    }
    const handleDescriptionChange = (value) => {
        setPackageDescription(value);
    }

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('packageName', data.packageName);
        formData.append('packageDifficulty', data.packageDifficulty);
        formData.append('packagePerPrice', data.packagePerPrice);
        formData.append('packageMaxAltitude', data.packageMaxAltitude);
        formData.append('packageBestTime', data.packageBestTime);
        formData.append('packageDuration', data.packageDuration);
        formData.append('packageItinerary', packageItinerary); // Use packageItinerary state
        formData.append('packageFaq', packageFaq);
        formData.append('packageDescription', packageDescription);

        // Append the packageImage file
        formData.append('packageImage', data.packageImage[0]); // Assuming packageImage is a file input

        apiCall.mutate(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'packages'}>
                    <div className={'package-fields'}>
                        <div className={'small-fields'}>
                            <div className={'name-diff'}>
                                <label htmlFor="packageName">Package Name:</label>
                                <input type="text" {...register('packageName')} />

                                <label htmlFor="packageDifficulty">Package Difficulty:</label>
                                <input className={'dif'} type="text" {...register('packageDifficulty')} />
                            </div>

                            <div className={'price-alt'}>
                                <label htmlFor="packagePerPrice">Package Per Price:</label>
                                <input type="text" {...register('packagePerPrice')} />

                                <label htmlFor="packageMaxAltitude">Package Max Altitude:</label>
                                <input type="text" {...register('packageMaxAltitude')} />
                            </div>

                            <div className={'time-dur'}>
                                <label htmlFor="packageBestTime">Package Best Time:</label>
                                <input type="text" {...register('packageBestTime')} />

                                <label htmlFor="packageDuration">Package Duration:</label>
                                <input type="text" {...register('packageDuration')} />
                            </div>
                        </div>

                        <label htmlFor="packageItinerary">Package Itinerary:</label>
                        <ReactQuill theme="snow" modules={modules}
                                    formats={formats} value={packageItinerary} onChange={handleItineraryChange} />

                        <label htmlFor="packageFaq">Package FAQ:</label>
                        <ReactQuill theme="snow" modules={modules}
                                    formats={formats} value={packageFaq} onChange={handleFaqChange} />

                        <label htmlFor="packageDescription">Package Description:</label>
                        <ReactQuill theme="snow" modules={modules}
                                    formats={formats} value={packageDescription} onChange={handleDescriptionChange} />

                        <label htmlFor="packageImage">Package Image:</label>
                        <input type="file" {...register('packageImage')} />

                        <div className={'btnn'}>
                            <button className={'submit-btn'} type="submit">
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

export default PackageCreate;
