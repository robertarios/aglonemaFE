import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import EditProfile from './pages/EditProfile';
import '@fontsource/sora';
import DashboardPage from './pages/DashboardPage';
import LaporanPage from './pages/LaporanPage';
import Warehouse from './pages/Gudang';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/laporan" element={<LaporanPage />} />
        <Route path="/gudang" element={<Warehouse />} />
      </Routes>
    </div>
  );
}

export default App;
