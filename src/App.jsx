import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ProductPage from "./pages/ProductPage";
import ProjectPage from "./pages/ProjectPage";



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/about-us" element={<AboutUs/>}/>
            <Route path="/contact-us" element={<ContactUs/>}/>
            <Route path="/project/:id" element={<ProjectPage/>}/>
            <Route path="/products/:id" element={<ProductPage/>}/>
        </Routes>
        <Footer/>
    </Router>
  );
}

export default App;
