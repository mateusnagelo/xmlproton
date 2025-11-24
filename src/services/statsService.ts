const STATS_KEY = 'appStats';

interface AppStats {
  consultas: number;
  validacoes: number;
  downloads: number;
  erros: number;
}

const getInitialStats = (): AppStats => ({
  consultas: 0,
  validacoes: 0,
  downloads: 0,
  erros: 0,
});

export const getStats = (): AppStats => {
  try {
    const statsJson = localStorage.getItem(STATS_KEY);
    if (statsJson) {
      return JSON.parse(statsJson);
    } else {
      const initialStats = getInitialStats();
      localStorage.setItem(STATS_KEY, JSON.stringify(initialStats));
      return initialStats;
    }
  } catch (error) {
    console.error("Error getting stats from localStorage", error);
    return getInitialStats();
  }
};

const saveStats = (stats: AppStats) => {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error("Error saving stats to localStorage", error);
  }
};

export const incrementConsultas = () => {
  const stats = getStats();
  stats.consultas += 1;
  saveStats(stats);
};

export const incrementValidacoes = () => {
  const stats = getStats();
  stats.validacoes += 1;
  saveStats(stats);
};

export const incrementDownloads = () => {
  const stats = getStats();
  stats.downloads += 1;
  saveStats(stats);
};

export const incrementErros = () => {
  const stats = getStats();
  stats.erros += 1;
  saveStats(stats);
};

export const resetStats = () => {
  const initialStats = getInitialStats();
  saveStats(initialStats);
}