import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import StatsBoxes from "../components/StatsBoxes";
import History from "../components/History";
import Annual from "../components/Annual";
import Leadership from "../components/Leadership";
import RecentBlog from "../components/RecentBlog";
import PopeLetter from "../components/PopeLetter";
import TestimonySection from "../components/TestimonySection";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <StatsBoxes />
      <History />
      <Annual />
      <Leadership />
      <RecentBlog />
      <PopeLetter />
      <TestimonySection />
      <Footer />
      {/* Other components */}
    </div>
  );
}

export default Home;
