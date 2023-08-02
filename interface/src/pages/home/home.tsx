import { useState } from 'react';
import axios from 'axios';
import { GetFile } from './components/getFile';


import { LoadingOutlined } from "@ant-design/icons";
import { Navigate } from 'react-router-dom' 

import { Instances } from './components/Instances';

import './home.css';

import { useAuth  } from '../../context/authContext'

export const Home = () => {
  const context = useAuth()
  const config = context?.generateAccess();
  const [operation, setOperation] = useState('import');
  const [colorImport,setColorImport] = useState('#f98113');
  const [colorExport,setColorExport] = useState('#ffffffd5');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

      
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
    
    const options = {
      method: 'POST',
      url: 'http://localhost:3000/export/run',
      headers: {
        Authorization: config?.headers.Authorization
      }
    };

    axios.request(options).then(() => {
      setLoading(false);
    })
    .catch(() => {
      setError(true)
      setLoading(false);
      setTimeout(() => {
        setError(false)
      },10000)
    })
  }

  const handleSubmit = () => {
      if (operation === 'import') {
          alert('Ainda não implementado')
      }
      else {
        getExport();
      }
  }
  return (
    <>
    {!context?.isLogged() && <Navigate to='/login' /> }
    <div id="container-home" className="container">
      <div className="container-backgroud">
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
          {operation === 'import' ? (
                <GetFile className='drag-drop-area'/> 
            ) : (
                  <div className='drag-drop-area-lock'>
                    {error && 
                      <p>Erro ao exportar</p>      
                    }
                    {!loading && !error && 
                              <p>Clique em enviar para iniciar a exportação</p>
                    }
                    {loading && !error && 
                            <>
                              <p>Exportando</p>
                              <LoadingOutlined />
                            </>
                    }
                  </div>
                )}
          <button onClick={handleSubmit} type="submit">Enviar</button>
      </div>
      {/* Quando estiver exportando, não é para carregar os dados */}
      <Instances load={!loading} />
      </div>
    </div>
    </>
  )
}


