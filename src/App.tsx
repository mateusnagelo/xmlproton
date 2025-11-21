import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Download from './pages/Download';
import Painel from './pages/Painel';
import Contato from './pages/Contato';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#0d1117] text-gray-300">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/download" element={<Download />} />
            <Route path="/painel" element={<Painel />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
