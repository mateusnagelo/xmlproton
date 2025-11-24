import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, X, Download } from 'lucide-react';

const Conversor = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [convertedData, setConvertedData] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState('json');
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setConvertedData(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/xml': ['.xml'], 'text/xml': ['.xml'] },
    multiple: false,
  });

  const handleRemoveFile = () => {
    setFiles([]);
    setConvertedData(null);
  };

  const handleConvert = () => {
    if (files.length === 0) return;

    setLoading(true);
    setConvertedData(null);

    // Simulação da conversão
    setTimeout(() => {
      const mockConvertedData = {
        json: JSON.stringify({ nota: { numero: 123, valor: 150.5 } }, null, 2),
        csv: 'numero,valor\n123,150.50',
      };

      setConvertedData(mockConvertedData[outputFormat]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Conversor XML</h1>
        <p className="text-gray-500">Converta seus arquivos XML para outros formatos.</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-600">Solte o arquivo aqui...</p>
          ) : (
            <p className="text-gray-500">Arraste e solte um arquivo XML aqui, ou clique para selecionar</p>
          )}
        </div>

        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Arquivo Selecionado:</h3>
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <FileText className="w-6 h-6 text-gray-600" />
                <span>{files[0].name}</span>
              </div>
              <button onClick={handleRemoveFile} className="text-red-500 hover:text-red-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-8 flex items-center gap-8">
            <div>
              <label htmlFor="outputFormat" className="block text-sm font-medium text-gray-700 mb-2">Converter para:</label>
              <select
                id="outputFormat"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div className="flex-grow flex items-end">
              <button
                onClick={handleConvert}
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Convertendo...' : 'Converter'}
              </button>
            </div>
          </div>
        )}

        {convertedData && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Resultado da Conversão:</h3>
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <pre><code>{convertedData}</code></pre>
            </div>
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(convertedData)}`}
              download={`converted.${outputFormat}`}
              className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
              <Download className="w-5 h-5" />
              Baixar Arquivo
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversor;