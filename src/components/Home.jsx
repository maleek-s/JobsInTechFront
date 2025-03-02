import React from 'react'
import MegaMenuDefault from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import BackgroundWrapper from './shared/BackgroundWrapper'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { Helmet } from 'react-helmet-async'
import useFetchCategories from '@/hooks/useFetchCategories'
import { useLocation } from 'react-router-dom';


const Home = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
 
  return (
    <div className="bg-[#F5F5F5] dark:bg-[#141718] h-screen flex flex-col overflow-scroll	">
      <Helmet>
        <title>R for Remote</title>
        <meta name="description" content="Search for your next remote online job in tech, work from anywhere" />
        <link rel="canonical" href="/" />
      </Helmet>
      <BackgroundWrapper/>
      <MegaMenuDefault isHomePage={isHomePage} />
      <HeroSection />
      <CategoryCarousel />
      <Footer />
    </div>
  )
}

export default Home