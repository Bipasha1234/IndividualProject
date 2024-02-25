import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

function BlogList({ searchCriteria }) {
    const { data, isLoading, isError } = useQuery('GET_PKG_ALL', async () => {
        // const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // };
        const response = await axios.get('http://localhost:8081/package/getAll');
        return response.data;
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading packages</p>;
    }

    const filteredPkgs = data.filter((pkg) => {
        return pkg.packageName.toLowerCase().includes(searchCriteria.packageName.toLowerCase());
    });


    return (
        <div className={'main-div-package'}>
            <div style={{ width: '100%', fontSize: '25px' }}>
                <strong>Trekking & Tour Packages</strong>
            </div>
            <div className={'next-div'}>
                {filteredPkgs.map((pkg) => (
                    <div className={'name-img-blog'} key={pkg.id}>
                        {/* Use Link to create a link to the individual package */}
                        <a style={{ color: 'black' }} href={`/trekkingTour/${pkg.id}`}>
                            {pkg.packageImage && (
                                <img
                                    src={`data:image/png;base64,${pkg.packageImage}`} // Use the correct content type
                                    alt="Package Image"
                                    style={{ maxWidth: '400px', maxHeight: '300px' }}
                                />
                            )}
                            <div className={'blog-name'}>
                                <p>{pkg.packageName}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogList;
