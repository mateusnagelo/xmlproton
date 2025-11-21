import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#161b22] shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/logomarcarXMLProton.png" alt="XMLProton Logo" className="h-28 mr-2" />
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
            <li><Link to="/sobre" className="text-gray-300 hover:text-white">Sobre</Link></li>
            <li><Link to="/download" className="text-gray-300 hover:text-white">Download XML</Link></li>
            <li><Link to="/painel" className="text-gray-300 hover:text-white">Painel</Link></li>
            <li><Link to="/contato" className="text-gray-300 hover:text-white">Contato</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;