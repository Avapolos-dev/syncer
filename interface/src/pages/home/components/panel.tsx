import { useState } from 'react';
import axios from 'axios';
import { GetFile } from './getFile';


import { LoadingOutlined } from "@ant-design/icons";

export const Panel = () => {
    const [operation, setOperation] = useState('import');
    const [colorImport,setColorImport] = useState('#f98113');
    const [colorExport,setColorExport] = useState('#ffffffd5');
    const [loading, setLoading] = useState(false);

        
    const handleImportClick = () => {
        setOperation('import');
        setColorImport('#f98113')
        setColorExport('#ffffffd5')
    }

    const handleExportClick = () => {
        setOperation('export');
        setColorImport('#ffffffd5')
        setColorExport('#f98113')
    }

    const getExport = async () => {
      setLoading(true);
      await axios.post('http://localhost:3000/export/run');
      setLoading(false);
    }

    const handleSubmit = () => {
        if (operation === 'import') {
            console.log('import')
        }
        else {
          getExport();
        }
    }
  
    return (
        <div className="panel">
          <div className="choice">
            <div onClick={handleImportClick} className="choice-option-import" style={{ backgroundColor: colorImport }}>
              <p id="import-option" className="choice-option-title">
                Importar
              </p>
            </div>
            <div  onClick={handleExportClick} className="choice-option-export" style={{ backgroundColor: colorExport }}>
              <p id="export-option" className="choice-option-title">
                Exportar
              </p>
            </div>
          </div>
          {/* se a operação é de import, manda uma classe que mostra o elemento, se não manda uma que esconde*/}
          {operation === 'import' ? (
                <GetFile className='drag-drop-area'/> 
            ) : (
                  <div className='drag-drop-area-lock'>
                    {!loading && 
                            <>
                              <p>Clique em enviar para iniciar a exportação</p>
                            </>
                    }
                    {loading && 
                            <>
                              <p>Exportando</p>
                              <LoadingOutlined />
                            </>
                    }
                  </div>
                )}
          <button onClick={handleSubmit} type="submit">Enviar</button>
        </div>
    )};