import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Add other routes as needed */}
      </Routes>
      <Footer /> {/* Footer includes NewsletterCard, so only Footer is added here */}
    </div>
  );
}

export default App;
