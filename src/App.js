import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import DashboardPage from './pages/DashboardPage';
import Login from './pages/login';
import SignUp from './pages/SignUp'; 
import ProdukPage from './pages/ProdukPage';
import LokasiPage from './pages/LokasiPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/produk" element={<ProdukPage />} />
        <Route path="/lokasi" element={<LokasiPage />} />
      </Routes>
    </div>
  );
}

export default App;
