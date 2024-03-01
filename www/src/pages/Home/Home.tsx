import React, { useState } from 'react';

import Navbar from '../Navbar/Navbar.tsx';

import './Home.css'
import BlogHome from "./HomeBlog.tsx";
import Footer from "../Footer/Footer.tsx";
import { FaSearch } from 'react-icons/fa';
import PackageHome from "../Home/HomePackage.tsx";

const Home = () => {
    const [searchCriteria, setSearchCriteria] = useState({
        packageName: '',

    });



    return (
        <>
<Navbar/>

        <div className={'Home'}>
        <div className="image-container">
          <img src={'src/assets/kalen-emsley-mgJSkgIo_JI-unsplash.jpg'} alt={'image'} />
          <div className="image-overlay">
            <div className="sectionText">
              <h1 className={'h'}>Unlock your travel dreams with me</h1>
              <p className={'p1'}>Travel is the best. You should also come along with us.</p>

            </div>
          </div>
        </div>






            <div className='box'>
                <div className='box-row'>
                    <div>

                        <input
                            className={'home-Input'}
                            placeholder='What Trekking and Tour packages do you want?'

                            value={searchCriteria.packageName}


                            onChange={(e) =>
                                setSearchCriteria((prev) => ({
                                    ...prev,
                                    packageName: e.target.value,
                                }))
                            }

                        />
                    </div>
                    <div className='search-btn-home' >
                        <FaSearch />
                    </div>

                </div>
            </div>



            <div className={'blog-pkg'}>


                <PackageHome searchCriteria={searchCriteria} />
                <BlogHome />
            </div>

        </div>
            <div style={{marginTop:'2800px'}}>
                <Footer/>
            </div>

        </>
    );
};

export default Home;
