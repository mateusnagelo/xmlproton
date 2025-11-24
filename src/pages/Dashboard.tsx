import { Download, Search, FileCheck, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getStats } from '../services/statsService';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  value: number;
  progress: number;
  lastUpdate: string;
  buttonText: string;
}

const StatCard = ({ icon, title, subtitle, value, progress, lastUpdate, buttonText }: StatCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
    <div className="flex-grow">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="text-xs text-gray-500 mt-1 flex justify-between">
        <span>Última: {lastUpdate}</span>
        <span>{progress}%</span>
      </div>
    </div>
    <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold">
      {buttonText}
    </button>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState<StatCardProps[]>([]);

  useEffect(() => {
    const fetchStats = () => {
      const data = getStats();
      const formattedStats: StatCardProps[] = [
        {
          icon: <Search size={24} className="text-blue-600" />,
          title: 'Consultas Realizadas',
          subtitle: 'Total de buscas no sistema',
          value: data.consultas,
          progress: (data.consultas / 100) * 100, // Exemplo de meta
          lastUpdate: 'Agora',
          buttonText: 'NOVA CONSULTA',
        },
        {
          icon: <FileCheck size={24} className="text-green-600" />,
          title: 'Validações de XML',
          subtitle: 'Verificações de conformidade',
          value: data.validacoes,
          progress: (data.validacoes / 50) * 100, // Exemplo de meta
          lastUpdate: 'Agora',
          buttonText: 'VALIDAR XML',
        },
        {
          icon: <Download size={24} className="text-purple-600" />,
          title: 'Downloads Realizados',
          subtitle: 'Arquivos e tabelas baixadas',
          value: data.downloads,
          progress: (data.downloads / 20) * 100, // Exemplo de meta
          lastUpdate: 'Agora',
          buttonText: 'VER DETALHES',
        },
        {
          icon: <AlertTriangle size={24} className="text-red-600" />,
          title: 'Erros Encontrados',
          subtitle: 'Falhas em operações',
          value: data.erros,
          progress: (data.erros / 10) * 100, // Exemplo de meta
          lastUpdate: 'Agora',
          buttonText: 'VER LOGS',
        },
      ];
      setStats(formattedStats);
    };

    fetchStats();

    // Adiciona um listener para atualizar o dashboard quando as estatísticas mudarem
    const handleStorageChange = () => {
      fetchStats();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard de Atividades</h1>
        <p className="text-gray-500">Visão geral das operações recentes no sistema.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;