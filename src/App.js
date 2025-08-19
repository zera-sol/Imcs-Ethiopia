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
import EditBlog from './components/EditBlog';
import Login from './components/Login';
import AddNews from './components/createNews'
import AddGraduates from ".//pages/AddGraduates"
import EditGraduate from './components/EditGraduate';
import NotFound from './pages/NotFound';
import DatabasePage from './pages/DatabasePage';
import BlogsGrid from './pages/BlogsGrid';
import BlogDetail from './pages/BlogDetail';
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
          <Route path="/news" element={<BlogPage />} />
          <Route path="/terms-conditions" element={<TermsCondition />} /> 
          <Route path="/edit-news/:id" element={<EditBlog />} />      
          <Route path="/login" element={<Login />}  />   
          <Route path="/add-news" element={<AddNews />} />
          <Route path="/add-graduates" element={<AddGraduates />} />
          <Route path="/edit-graduate/:id" element={<EditGraduate />} />
          <Route path="/blogsGrid" element={<BlogsGrid />}  /> 
          <Route path="/blog/:id" element={<BlogDetail />}  /> 
          <Route path="/database" element={<DatabasePage />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
        <Footer />  {/* Footer will be displayed on all pages */}
      </Router>
    </div>
  );
}

export default App;
