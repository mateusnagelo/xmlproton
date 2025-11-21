const Footer = () => {
  return (
    <footer className="bg-[#003366] text-white mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">XMLProton</h3>
            <p className="text-gray-400">Consulte e baixe XML de NF-e de forma rápida e segura, sem a necessidade de certificado digital.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li><a href="/sobre" className="hover:text-[#0066FF]">Sobre Nós</a></li>
              <li><a href="/contato" className="hover:text-[#0066FF]">Contato</a></li>
              <li><a href="#" className="hover:text-[#0066FF]">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-[#0066FF]">Política de Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contato@xmlproton.com</li>
              <li>WhatsApp: (XX) XXXXX-XXXX</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} XMLProton. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;