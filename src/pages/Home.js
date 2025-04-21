import React from "react";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import StatsBoxes from "../components/StatsBoxes";
import History from "../components/History";
import Annual from "../components/Annual";
import Leadership from "../components/Leadership";
import RecentBlog from "../components/RecentBlog";
import PopeLetter from "../components/PopeLetter";
import TestimonySection from "../components/TestimonySection";
function Home() {
  return (
    <div>
      <HeroSection />
      <TestimonySection />
      <RecentBlog />
      <AboutUs />
      <StatsBoxes />
      <History />
      <Annual />
      <Leadership />
      <PopeLetter />
      {/* Other components */}
    </div>
  );
}

export default Home;
