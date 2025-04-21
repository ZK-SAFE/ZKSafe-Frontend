import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import ZkLogin from './components/ZkLogin';
import Wallet from './components/Wallet';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/zklogin" element={<ZkLogin />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
