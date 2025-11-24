import { Link } from 'react-router-dom';
import { Search, Download, FileText, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-[#0d1117] text-white">
      {/* Hero Section */}
      <section className="text-center py-24 md:py-32 bg-gradient-to-b from-[#161b22] to-[#0d1117]">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">A Solução Definitiva para suas Notas Fiscais</h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">Consulte, baixe o XML e visualize o DANFE de qualquer NF-e de forma instantânea, sem complicações e sem a necessidade de certificado digital.</p>
          <Link to="/download">
            <button className="mt-10 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
              Consultar NF-e Agora <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Tudo que você precisa em um só lugar</h2>
            <p className="mt-4 text-gray-400 text-lg">Simplificamos a gestão de notas fiscais para você.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#161b22] p-8 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-600/10 p-3 rounded-lg w-max mb-4">
                <Search className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold">Consulta Rápida</h3>
              <p className="mt-2 text-gray-400">Acesse os dados da NF-e em segundos informando apenas a chave de acesso.</p>
            </div>
            <div className="bg-[#161b22] p-8 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-600/10 p-3 rounded-lg w-max mb-4">
                <Download className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold">Download de XML</h3>
              <p className="mt-2 text-gray-400">Baixe o arquivo XML original da nota fiscal com validade jurídica.</p>
            </div>
            <div className="bg-[#161b22] p-8 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-600/10 p-3 rounded-lg w-max mb-4">
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold">Visualização do DANFE</h3>
              <p className="mt-2 text-gray-400">Visualize e imprima o DANFE em PDF diretamente no seu navegador.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-[#161b22]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Como Funciona?</h2>
            <p className="mt-4 text-gray-400 text-lg">Em três passos simples, você resolve tudo.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-700/50" style={{ transform: 'translateY(-50%)' }}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-800 border-2 border-blue-500 rounded-full text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold">Insira a Chave</h3>
              <p className="mt-2 text-gray-400">Cole os 44 dígitos da chave de acesso da sua NF-e no campo indicado.</p>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-800 border-2 border-blue-500 rounded-full text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold">Consulte</h3>
              <p className="mt-2 text-gray-400">Clique em consultar e aguarde nosso sistema buscar as informações para você.</p>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-800 border-2 border-blue-500 rounded-full text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold">Baixe e Visualize</h3>
              <p className="mt-2 text-gray-400">Acesse o XML e o DANFE com os botões de download e visualização.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold">Pronto para Simplificar?</h2>
          <p className="mt-4 text-gray-400">Chega de burocracia. Comece a usar o XMLProton agora mesmo e tenha controle total sobre suas notas fiscais.</p>
          <Link to="/download">
            <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
              Ir para a Consulta
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;