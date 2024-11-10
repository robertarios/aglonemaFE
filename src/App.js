import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
