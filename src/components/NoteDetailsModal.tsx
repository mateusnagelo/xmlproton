import React from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import type { Note } from '../services/notesService';

interface NoteDetailsModalProps {
  note: Note | null;
  onClose: () => void;
}

const NoteDetailsModal: React.FC<NoteDetailsModalProps> = ({ note, onClose }) => {
  if (!note) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Detalhes da Nota Fiscal</h2>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-gray-600">Chave de Acesso:</p>
            <p className="text-gray-800 break-all">{note.id}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Emissor:</p>
            <p className="text-gray-800">{note.emissor}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Data de Emissão:</p>
            <p className="text-gray-800">{note.data}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Valor:</p>
            <p className="text-gray-800">{note.valor}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <Button variant="outline" onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsModal;