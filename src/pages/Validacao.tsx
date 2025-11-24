import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X, CheckCircle, AlertTriangle, Loader } from 'lucide-react';
import { validateXml } from '../services/api';
import { incrementValidacoes, incrementErros } from '../services/statsService';

const Validacao = () => {
  const [files, setFiles] = useState([]);
  const [validationResult, setValidationResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
    setValidationResult(null);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/xml': ['.xml'],
      'text/xml': ['.xml'],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    setFiles([]);
    setValidationResult(null);
    setError(null);
  };

  const handleValidate = async () => {
    if (files.length === 0) {
      setError('Por favor, selecione um arquivo XML para validar.');
      return;
    }

    setLoading(true);
    setError(null);
    setValidationResult(null);

    try {
      const result = await validateXml(files[0]);
      setValidationResult(result);
      if (result.success) {
        incrementValidacoes();
      } else {
        incrementErros();
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado durante a validação.');
      incrementErros();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Validação de XML</h1>
        <p className="text-gray-500">Verifique a estrutura e a assinatura digital de seus arquivos XML.</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}>
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-gray-500">
            <UploadCloud className="w-12 h-12 mb-4" />
            {isDragActive ?
              <p className="text-lg font-semibold">Solte o arquivo aqui...</p> :
              <p className="text-lg font-semibold">Arraste e solte um arquivo XML aqui, ou clique para selecionar</p>
            }
            <p className="text-sm">Apenas arquivos .xml são permitidos</p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700">Arquivo Selecionado:</h3>
            <div className="mt-2 flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <File className="w-5 h-5 text-gray-500 mr-3" />
                <span className="font-medium text-gray-800">{files[0].name}</span>
              </div>
              <button onClick={removeFile} className="text-gray-500 hover:text-red-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={handleValidate} 
              disabled={loading}
              className="mt-4 w-full flex justify-center items-center px-6 py-3 font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : null}
              {loading ? 'Validando...' : 'Validar Arquivo'}
            </button>
          </div>
        )}

        {validationResult && !loading && (
          <div className={`mt-6 p-4 rounded-lg flex items-center ${
            validationResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {validationResult.success ? 
              <CheckCircle className="w-5 h-5 mr-3" /> : 
              <AlertTriangle className="w-5 h-5 mr-3" />
            }
            <span className="font-medium">{validationResult.message}</span>
          </div>
        )}

        {error && !loading && (
          <div className="mt-6 p-4 rounded-lg flex items-center bg-red-50 text-red-800">
            <AlertTriangle className="w-5 h-5 mr-3" />
            <span className="font-medium">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Validacao;