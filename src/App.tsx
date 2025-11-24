import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Sobre from './pages/Sobre';
import Download from './pages/Download';
import Contato from './pages/Contato';
import Validacao from './pages/Validacao';
import TabelaIbptax from './pages/TabelaIbptax';
import Conversor from './pages/Conversor';
import RelatorioXmls from './pages/RelatorioXmls';
import ConsultaNotas from './pages/ConsultaNotas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/download" element={<Download />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/validacao" element={<Validacao />} />
          <Route path="/tabela-ibptax" element={<TabelaIbptax />} />
          <Route path="/conversor" element={<Conversor />} />
          <Route path="/relatorio-xmls" element={<RelatorioXmls />} />
          <Route path="/consulta-notas" element={<ConsultaNotas />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
