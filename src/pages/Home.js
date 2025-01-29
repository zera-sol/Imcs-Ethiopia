import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import StatsBoxes from "../components/StatsBoxes";
import History from "../components/History";
import Annual from "../components/Annual";
import Leadership from "../components/Leadership";
import RecentBlog from "../components/RecentBlog";

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
      {/* Other components */}
    </div>
  );
}

export default Home;
