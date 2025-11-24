import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Download, Info, Mail, ShieldCheck, Table, GitCompareArrows, FileClock, FileSearch } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/consulta-notas', icon: FileSearch, label: 'Consulta de Notas' },
    { href: '/download', icon: Download, label: 'Download XML' },
    { href: '/validacao', icon: ShieldCheck, label: 'Validação XML' },
    { href: '/conversor', icon: GitCompareArrows, label: 'Conversor XML' },
    { href: '/relatorio-xmls', icon: FileClock, label: 'Relatório XMLs' },
    { href: '/tabela-ibptax', icon: Table, label: 'Tabela IBPTax' },
    { href: '/sobre', icon: Info, label: 'Sobre' },
    { href: '/contato', icon: Mail, label: 'Contato' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center">
          <img src="/logomarcarXMLProton.png" alt="XMLProton Logo" className="h-16" />
        </Link>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center px-4 py-2 my-1 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                  location.pathname === item.href ? 'bg-blue-100 text-blue-700 font-semibold' : ''
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>vr1.0.0</p>
        <p>Desenvolvido por XMLProton</p>
      </div>
    </aside>
  );
};

export default Sidebar;