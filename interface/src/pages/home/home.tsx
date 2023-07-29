
import React, { ChangeEvent, DragEvent, useRef, useState } from 'react';
import './home.css';

export const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      setSelectedFile(file);
      // Faça o que precisa ser feito com o arquivo aqui (por exemplo, exibir informações ou fazer upload)
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    // Faça o que precisa ser feito com o arquivo aqui (por exemplo, exibir informações ou fazer upload)
  };

  const handleSelectFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div id="container-home" className="container">
      <div className="container-backgroud">
        <div className="panel">
          <div className="choice">
            <div className="choice-option-import">
              <p id="import-option" className="choice-option-title">
                Importar
              </p>
            </div>
            <div className="choice-option-export">
              <p id="export-option" className="choice-option-title">
                Exportar
              </p>
            </div>
          </div>
          <div
              id="get-file"
              className="drag-drop-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleSelectFileClick}
            >
              {selectedFile ? (
                <p>Arquivo selecionado: {selectedFile.name}</p>
              ) : (
                <p id='text-help-file'>
                  Arraste e solte o arquivo aqui ou clique para selecionar.
                </p>
              )}
              <input
                type="file"
                id="file"
                name="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
          </div>
          <button type="submit">Enviar</button>
        </div>
          <div className='info'>
            <div className='header'>
              <div className='header-col'>
                <p className='header-col-title'>Instância</p>
              </div>
              <div className='header-col'>
                <p className='header-col-title'>Interação</p>
              </div>
              <div className='header-col'>
                <p className='header-col-title'>Operação</p>
              </div>
              <div className='header-col'>
                <p className='header-col-title'>Data</p>
              </div>
              <div className='header-col'>
                <p className='header-col-title'>Baixar</p>
              </div>
            </div>
            <div className='container-table'>
                  <div className='container-data'>
                    <table>
                      <tr>
                        <td>IES</td>
                        <td>0</td>
                        <td>E</td>
                        <td>10/12/23</td>
                        <td>icone</td>
                      </tr>
                      <tr>
                        <td>IES</td>
                        <td>1</td>
                        <td>E</td>
                        <td>10/12/23</td>
                        <td>icone</td>
                      </tr>
                      <tr>
                        <td>IES</td>
                        <td>0</td>
                        <td>E</td>
                        <td>10/12/23</td>
                        <td>icone</td>
                      </tr>
                      <tr>
                        <td>IES</td>
                        <td>1</td>
                        <td>E</td>
                        <td>10/12/23</td>
                        <td>icone</td>
                      </tr>
                      <tr>
                        <td>IES</td>
                        <td>0</td>
                        <td>E</td>
                        <td>10/12/23</td>
                        <td>icone</td>
                      </tr>
                      <tr>
                        <td>IES</td>
                        <td>1</td>
                        <td>E</td>
                        <td>10/12/23</td>
                        <td>icone</td>
                      </tr>
                      <tr>
                        <td>IES</td>
                        <td>0</td>
                        <td>E</td>
                        <td>10/12/23</td>
                        <td>icone</td>
                      </tr>
                      <tr>
                        <td>IES</td>
                        <td>1</td>
                        <td>E</td>
                        <td>10/12/23</td>
                        <td>icone</td>
                      </tr>
                      <tr>
                        <td>IES</td>
                        <td>0</td>
                        <td>E</td>
                        <td>10/12/23</td>
                        <td>icone</td>
                      </tr>
                      <tr>
                        <td>IES</td>
                        <td>1</td>
                        <td>E</td>
                        <td>10/12/23</td>
                        <td>icone</td>
                      </tr>
                    </table>
                  </div>
             </div>
          </div>
        </div>
        
    </div>
  )
}


