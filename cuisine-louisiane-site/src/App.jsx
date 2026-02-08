import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import OurVenue from "./pages/OurVenue";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Menus from "./pages/Menus";
import ThankYou from "./pages/ThankYou";

export default function App() {
  return (
    <Router>
      <NavBar />
      <div className="pt-28">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ourvenue" element={<OurVenue />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      </div>
    </Router>
  );
}