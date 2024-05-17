import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Home from './pages/Home';
import OurVenue from './pages/OurVenue';
import Menus from './pages/Menus';
import Gallery from './pages/Gallery';
import DesignYourMenu from './pages/DesignYourMenu';
import NavBar from './components/NavBar';



function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ourvenue" element={<OurVenue />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/designyourmenu" element={<DesignYourMenu />} />
        </Routes>
      </div>
      <p className="read-the-docs">
        Kristen
      </p>
    </Router>
    </ThemeProvider>
  );
}

export default App;