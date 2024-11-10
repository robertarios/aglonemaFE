import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import DashboardPage from './pages/DashboardPage';
import LaporanPage from './pages/LaporanPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/laporan" element={<LaporanPage />} />
      </Routes>
    </div>
  );
}

export default App;
