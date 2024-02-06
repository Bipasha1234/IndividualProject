import React, { useState } from 'react';
import { AiOutlineSwapRight } from 'react-icons/ai';
import Navbar from '../Navbar/Navbar.tsx';
// import HomePackage from './HomePackage.tsx';
import BlogList from '../Home/HomePackage.tsx';
import './Home.css'
import BlogHome from "./HomeBlog.tsx";
import Footer from "../Footer/Footer.tsx";

const Home = () => {
    const [searchCriteria, setSearchCriteria] = useState({
        packageName: '',

    });

    const handleSearch = () => {
        // Perform the search logic here
        // You can use the searchCriteria to filter the blogs
        // Update the state or pass the criteria to the BlogList component
    };


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
              {/*<button className={'btn'}>*/}
              {/*  Get Started*/}
              {/*  <AiOutlineSwapRight className={'icon'} />*/}
              {/*</button>*/}
            </div>
          </div>
        </div>






            <div className='box'>
                <div className='box-row'>
                    <div>

                        <input
                            className={'home-Input'}
                            placeholder='Where do you want to go?'
                            value={searchCriteria.packageName}

                            onChange={(e) =>
                                setSearchCriteria((prev) => ({
                                    ...prev,
                                    packageName: e.target.value,
                                }))
                            }
                        />
                    </div>


                    <div className='btn-search'>
                        <button className='search-btn-home' onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>



            <div className={'blog-pkg'}>


                <BlogList searchCriteria={searchCriteria} />
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
