import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { DatePicker } from '../components/ui/date-picker';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { incrementConsultas, incrementErros } from '../services/statsService';

const RelatorioXmls = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [reportData, setReportData] = useState<any[]>([]);

  const handleGenerateReport = () => {
    try {
      // Lógica de geração de relatório (simulada)
      const mockData = [
        { id: 1, date: '2024-07-20', total: 150.0, items: 5 },
        { id: 2, date: '2024-07-21', total: 250.5, items: 8 },
      ];
      setReportData(mockData);
      incrementConsultas();
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      incrementErros();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Relatório de XMLs</h1>
        <p className="text-gray-500">Gere relatórios a partir de seus arquivos XML.</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col">
            <label htmlFor="start-date" className="mb-2 font-semibold text-gray-700">Data Inicial</label>
            <DatePicker date={startDate} setDate={setStartDate} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="end-date" className="mb-2 font-semibold text-gray-700">Data Final</label>
            <DatePicker date={endDate} setDate={setEndDate} />
          </div>
          <div className="flex items-end">
            <Button onClick={handleGenerateReport} className="w-full md:w-auto">Gerar Relatório</Button>
          </div>
        </div>

        {reportData.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultados</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Itens</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.total}</TableCell>
                    <TableCell>{row.items}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatorioXmls;