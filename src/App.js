import './App.css';
import { Routes, Route } from "react-router-dom"
import Landing from './pages/Landing';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </div>
  );
}

export default App;
