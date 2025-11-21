import { useState } from 'react';
import { Send, Mail, Linkedin, Github, Phone } from 'lucide-react';

const Contato = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <section className="text-center py-12 bg-[#161b22] rounded-lg">
        <h1 className="text-4xl font-bold text-white">Fale Conosco</h1>
        <p className="mt-4 text-lg text-gray-400">Estamos aqui para ajudar. Envie suas dúvidas, sugestões ou feedbacks.</p>
      </section>

      {/* Contact Layout */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Contact Info Section */}
        <section className="bg-[#0d1117] p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Informações de Contato</h2>
          <p className="text-gray-400 mb-8">Você pode nos encontrar nos seguintes canais. Responderemos o mais breve possível.</p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Email</h3>
                <a href="mailto:contato@xmlproton.com" className="text-blue-400 hover:text-blue-300">contato@xmlproton.com</a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Telefone</h3>
                <span className="text-gray-400">+55 (XX) XXXX-XXXX</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">LinkedIn</h3>
                <a href="#" className="text-blue-400 hover:text-blue-300">Siga-nos no LinkedIn</a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">GitHub</h3>
                <a href="#" className="text-blue-400 hover:text-blue-300">Veja nossos projetos</a>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-[#0d1117] p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-4 py-3 bg-[#161b22] border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-4 py-3 bg-[#161b22] border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Mensagem</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" className="mt-1 block w-full px-4 py-3 bg-[#161b22] border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"></textarea>
            </div>
            <button type="submit" className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-lg font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 transition-transform transform hover:scale-105">
              <Send className="w-5 h-5 mr-3" />
              Enviar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contato;