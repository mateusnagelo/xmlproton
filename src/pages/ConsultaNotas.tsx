import { useState, useEffect } from 'react';
import { getNotes } from '../services/notesService';
import type { Note } from '../services/notesService';
import NoteDetailsModal from '../components/NoteDetailsModal';
import { Eye, FileText, FileCode } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

const ConsultaNotas = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = () => {
      setNotes(getNotes());
    };

    fetchNotes();

    const handleStorageChange = () => {
      fetchNotes();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleViewDetails = (note: Note) => {
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  const handleDownloadXml = (note: Note) => {
    if (note.xml) {
      const blob = new Blob([note.xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${note.id}.xml`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleDownloadPdf = (note: Note) => {
    if (note.pdf) {
      window.open(note.pdf, '_blank');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Histórico de Consultas</h1>
        <p className="text-gray-500">Visualize e gerencie as notas fiscais eletrônicas consultadas.</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Emissor</TableHead>
              <TableHead>Destinatário</TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note, index) => (
              <TableRow key={`${note.id}-${index}`}>
                <TableCell>{note.emissor}</TableCell>
                <TableCell>{note.destinatario}</TableCell>
                <TableCell>{note.numero}</TableCell>
                <TableCell>{note.data}</TableCell>
                <TableCell>{note.valor}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(note)}><Eye className="w-4 h-4 mr-2" /> Visualizar</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadXml(note)}><FileCode className="w-4 h-4 mr-2" /> XML</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadPdf(note)}><FileText className="w-4 h-4 mr-2" /> PDF</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedNote && (
        <NoteDetailsModal note={selectedNote} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ConsultaNotas;