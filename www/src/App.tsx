import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/Home/Home';
import PackageCreate from './pages/Admin/Packages/PackageCreate';
import PackageDisplay from './pages/Admin/Packages/PackageDisplay';
import TrekkingTour from './pages/TrekkingTour/TrekkingTour';
import BlogCreate from './pages/Admin/Blog/blogCreate';
import Admin from './pages/Admin/Admin/Admin';
import PackageDelete from './pages/Admin/Packages/PackageDelete';
import BlogDisplay from './pages/Admin/Blog/BlogDisplay';
import BlogDelete from './pages/Admin/Blog/BlogDelete';
import Blog from './pages/Blog/Blog';
import BlogById from './pages/Blog/BlogById';
import AdminGallery from './pages/Admin/Gallery/gallery';
import Photo from './pages/Gallery/Gallery';
import GallerDelete from './pages/Admin/Gallery/gallerDelete';
import CustomizeTrip from './pages/CustomizeTrip/customizeTrip';
import Booking from './pages/Booking/Booking';
import BookingList from './pages/Admin/Booking/BookingDisplay';
import Footer from './pages/Footer/Footer';
import AdminCustomizeTrip from "./pages/Admin/customizeTrip/customizeTrip.tsx";
import AdminMessage from "./pages/Admin/Message/message.tsx";
import React from "react";
import LoginForm from "./pages/Admin/Login/Register.tsx";
import RegisterForm from "./pages/Admin/Login/Login.tsx";




const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Apackage" element={<PackageCreate />} />
                    <Route path="/admin/itemdisplay" element={<PackageDisplay />} />
                    <Route path="/admin/packageDelete" element={<PackageDelete />} />
                    <Route path="/trekkingTour/:id" element={<TrekkingTour />} />
                    <Route path="/blogById/:id" element={<BlogById />} />
                    {/*<Route path="/admin" element={<Admin />} />*/}
                    <Route path="/admin/uploadPackages" element={<PackageCreate />} />
                    <Route path="/admin/managePackages" element={<PackageDisplay />} />
                    <Route path="/admin/blogCreate" element={<BlogCreate />} />
                    <Route path="/admin/blogDisplay" element={<BlogDisplay />} />
                    <Route path="/admin/blogDelete" element={<BlogDelete />} />
                    <Route path="/admin/gallery" element={<AdminGallery />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/photo" element={<Photo />} />
                    <Route path="/admin/galleryDelete" element={<GallerDelete />} />
                    <Route path="/customizeTrip" element={<CustomizeTrip />} />
                    <Route path="/booking/:id" element={<Booking />} />
                    <Route path="/booking/admin" element={<BookingList />} />
                    <Route path="/footer" element={<Footer />} />
                    <Route path="/admin/customizetrip" element={<AdminCustomizeTrip />} />
                    <Route path="/admin/askquestion" element={<AdminMessage />} />
                    <Route path="/login" element={<RegisterForm />} />
                    <Route path="/admin/register" element={<LoginForm />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
