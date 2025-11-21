import { Link } from 'react-router-dom';
import { Download, Search, FileText } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center bg-[#161b22] py-20 rounded-lg">
        <h1 className="text-5xl font-bold text-white">XMLProton</h1>
        <p className="mt-4 text-xl text-gray-400">A maneira mais fácil de consultar e baixar XML de NF-e.</p>
        <Link to="/download">
          <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
            Consultar XML Agora
          </button>
        </Link>
      </section>

      {/* Benefits Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-white">Benefícios</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#161b22] rounded-lg shadow-md text-center">
            <Download className="w-12 h-12 mx-auto text-blue-500" />
            <h3 className="mt-4 text-xl font-bold text-white">Download Rápido</h3>
            <p className="mt-2 text-gray-400">Baixe seus arquivos XML com apenas alguns cliques.</p>
          </div>
          <div className="p-6 bg-[#161b22] rounded-lg shadow-md text-center">
            <Search className="w-12 h-12 mx-auto text-blue-500" />
            <h3 className="mt-4 text-xl font-bold text-white">Consulta Fácil</h3>
            <p className="mt-2 text-gray-400">Consulte NF-e usando CNPJ e chave de acesso.</p>
          </div>
          <div className="p-6 bg-[#161b22] rounded-lg shadow-md text-center">
            <FileText className="w-12 h-12 mx-auto text-blue-500" />
            <h3 className="mt-4 text-xl font-bold text-white">Visualize o DANFE</h3>
            <p className="mt-2 text-gray-400">Visualize o DANFE diretamente no navegador.</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-[#161b22] py-16 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-white">Como Funciona</h2>
        <div className="mt-8 max-w-4xl mx-auto text-center text-gray-400">
          <p>Com o XMLProton, você informa a chave de acesso da NF-e. Nosso sistema se conecta à API do MeuDANFE e busca o XML para você, sem a necessidade de certificado digital. Simples, rápido e seguro.</p>
        </div>
      </section>

      {/* Pricing Section (Placeholder) */}
      <section>
        <h2 className="text-3xl font-bold text-center text-white">Preços</h2>
        <div className="mt-8 text-center text-gray-400">
          <p>Em breve, planos e preços para atender às suas necessidades.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;