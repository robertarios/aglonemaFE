import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import EditProfile from './pages/EditProfile';
import '@fontsource/sora';
import DashboardPage from './pages/DashboardPage';
import LaporanPage from './pages/LaporanPage';
import Warehouse from './pages/Gudang';
import Kedaluarsa from './pages/PengaturanKedaluarsa';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/laporan" element={<LaporanPage />} />
        <Route path="/gudang" element={<Warehouse />} />
        <Route path="/kedaluarsa" element={<Kedaluarsa />} />
      </Routes>
    </div>
  );
}

export default App;
