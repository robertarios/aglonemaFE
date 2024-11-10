import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Nav from './components/Nav';
import Footer from './components/Footer';
import EditProfile from './pages/EditProfile';
import '@fontsource/sora';
import DashboardPage from './pages/DashboardPage';
import LaporanPage from './pages/LaporanPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/laporan" element={<LaporanPage />} />
      </Routes>
    </div>
  );
}

export default App;
