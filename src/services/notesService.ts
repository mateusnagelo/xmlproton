const NOTES_STORAGE_KEY = 'nfeHistory';

export interface Note {
  id: string; // Chave de Acesso
  emissor: string;
  destinatario: string;
  data: string;
  valor: string;
  numero: string;
  xml?: string; // Conteúdo do XML
  pdf?: string; // Conteúdo do PDF (ou link)
}

export const getNotes = (): Note[] => {
  try {
    const notesHistory = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!notesHistory) {
      return [];
    }
    const parsedHistory = JSON.parse(notesHistory);
    // Mapeia os dados do histórico para o formato de Nota
    return parsedHistory.map((item: any) => ({
      id: item.chave,
      emissor: item.emitente,
      destinatario: item.destinatario,
      data: item.emissao,
      valor: item.valor,
      numero: item.numero,
      xml: item.xmlText,
      pdf: item.danfeUrl,
    }));
  } catch (error) {
    console.error("Erro ao buscar notas do localStorage:", error);
    return [];
  }
};