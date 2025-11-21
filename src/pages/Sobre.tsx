import { Briefcase, Code, Zap } from 'lucide-react';

const Sobre = () => {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <section className="text-center py-12 bg-gray-100 rounded-lg">
        <h1 className="text-4xl font-bold text-[#003366]">Sobre o XMLProton</h1>
        <p className="mt-4 text-lg text-gray-600">Entenda nossa missão e a tecnologia por trás da nossa solução.</p>
      </section>

      {/* Mission Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-[#003366]">Nossa Missão</h2>
        <div className="mt-8 max-w-3xl mx-auto text-center text-gray-600">
          <Briefcase className="w-16 h-16 mx-auto text-[#0066FF]" />
          <p className="mt-4">
            Nossa missão é simplificar o acesso a documentos fiscais eletrônicos para empresas e contadores. Acreditamos que a tecnologia pode eliminar a burocracia e tornar os processos fiscais mais eficientes e acessíveis a todos, sem a necessidade de barreiras técnicas como o certificado digital.
          </p>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-gray-100 py-16 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-[#003366]">Tecnologia</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <Code className="w-12 h-12 text-[#0066FF]" />
            <h3 className="mt-4 text-xl font-bold">Frontend Moderno</h3>
            <p className="mt-2 text-gray-600">Construído com React, Vite e Tailwind CSS, nosso frontend é rápido, responsivo e oferece uma experiência de usuário intuitiva.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <Zap className="w-12 h-12 text-[#0066FF]" />
            <h3 className="mt-4 text-xl font-bold">API Poderosa</h3>
            <p className="mt-2 text-gray-600">Utilizamos a API do MeuDANFE para garantir a consulta e o download seguro e confiável dos arquivos XML, sem a necessidade de certificado digital.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;