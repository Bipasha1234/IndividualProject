import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.tsx';
import DOMPurify from 'dompurify';

function BlogById() {
    const { id } = useParams();

    const { data, isLoading, isError } = useQuery(['GET_BLOG_BY_ID', id], async () => {
        try {
            const response = await axios.get(`http://localhost:8081/blog/getById/${id}`, {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('token')}`
                // }
            });
            console.log('Data fetched:', response.data); // Log the fetched data
            return response.data;
        } catch (error) {
            console.error('Error fetching package details:', error); // Log any errors
            throw error;
        }
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !data) {
        return <p>Error loading package details</p>;
    }

    return (
        <>
            <Navbar />
            <div className={'blogId-container'}>
                <div className={'name-container'}>
                    <p className={'name-id'}>{data.blogName}</p>
                </div>

                <div className={'img-box'}>
                    {data.blogImage && (
                        <img
                            src={`data:image/png;base64,${data.blogImage}`}
                            style={{ maxWidth: '100%', borderRadius: '5px', marginTop: '20px' }}
                        />
                    )}
                </div>

                <div className={'blog-id-desc'}>
                    <strong style={{ fontSize: '23px' }}>{data.blogName}</strong>
                    {/* Sanitize package description */}
                    <p
                        style={{ maxWidth: '90%', overflow: 'hidden', fontSize: '16px', fontFamily: 'Yu Gothic UI' }}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.blogDescription) }}
                    />
                </div>
            </div>
        </>
    );
}

export default BlogById;
