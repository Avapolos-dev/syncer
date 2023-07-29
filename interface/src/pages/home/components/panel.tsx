import { useState } from 'react';

import { GetFile } from './getFile';

export const Panel = () => {
    const [operation, setOperation] = useState('import');
    const [colorImport,setColorImport] = useState('#f98113');
    const [colorExport,setColorExport] = useState('#ffffffd5');
        
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
            ) : (<GetFile className='drag-drop-area-lock'/>)}
          <button type="submit">Enviar</button>
        </div>
    )};