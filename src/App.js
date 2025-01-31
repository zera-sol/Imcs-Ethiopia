import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import Navbar
import Footer from './components/Footer';  // Import Footer
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FarewellBookPage from './pages/FarewellBookPage';
import BlogPage from './pages/BlogPage';
import TermsCondition from './pages/TermsCondition';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />  {/* Navbar will be displayed on all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/farewell-book" element={<FarewellBookPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/terms-conditions" element={<TermsCondition />} />          
        </Routes>
        <Footer />  {/* Footer will be displayed on all pages */}
      </Router>
    </div>
  );
}

export default App;
