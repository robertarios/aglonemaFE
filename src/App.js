import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Nav from './components/Nav';
import Footer from './components/Footer';
import EditProfile from './pages/EditProfile';
import '@fontsource/sora';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
      <Footer /> {/* Footer includes NewsletterCard, so only Footer is added here */}
    </div>
  );
}

export default App;
