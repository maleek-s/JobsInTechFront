import React from 'react'
import MegaMenuDefault from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import BackgroundWrapper from './shared/BackgroundWrapper'
import Footer from './shared/Footer'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom';


const Home = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
 
  return (
    <div className="bg-[#F5F5F5] dark:bg-[#141718] h-screen flex flex-col overflow-scroll	">
      <Helmet>
        <title>Jobs In Tech From All Over the World</title>
        <meta name="description" content="Search for your next remote online job in tech, work from anywhere in the world. We scrape jobs, you apply and snowball your career to success!" />
        <link rel="canonical" href="https://jobsintech.live/" />
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