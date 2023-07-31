import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  LoadingOutlined,
  DownloadOutlined
} from "@ant-design/icons";

function formatarData(dataString: string): string {
  const data = new Date(dataString);
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se que os meses em JavaScript começam em 0, por isso adicionamos 1.
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

type Instance = {
  id: number;
  instance: string;
  iteration: number;
  operation: string;
  created: string;
}


export const Instances = () => {
    
    const [instances, setInstances] = useState<Instance[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleDownload = ({id,instance,iteration}:Instance) => {
      instance = instance.replace(' ', '');
      axios.get(`http://localhost:3000/export/${instance}/`, { responseType: 'blob', params:{id}} )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `${instance}-${iteration}.zip`; // Defina o nome do arquivo com a extensão .zip
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Remova o elemento após o download
      })
      .catch(() => {
        alert('Ocorreu um erro ao baixar o arquivo.')
      });
    };

    useEffect(() => {
      setLoading(true);
      axios.get('http://localhost:3000/export/')
      .then((response) => {
        response.data.exports.forEach((instance: any) => {
          instance.created = formatarData(instance.created);
        });
        setInstances(response.data.exports.reverse());
        setLoading(false);
      })
      .catch(() => {
        setInstances([]);
        setError(true);
        setLoading(false);
      });
    }, []);

    return (
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
                <tbody>
                  {loading && 
                  <tr>
                    <td colSpan={5}><LoadingOutlined /></td>
                  </tr>}
                  {error && 
                  <tr>
                    <td colSpan={5}>Ocorreu um erro ao carregar os dados.</td>
                  </tr>}
                  {!loading && !error && instances.map((instance) => (
                    <tr key={instance.id}>
                      <td>{instance.instance}</td>
                      <td>{instance.iteration}</td>
                      <td>{instance.operation}</td>
                      <td>{instance.created}</td>
                      <td onClick={() => handleDownload(instance)}><DownloadOutlined /></td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
         </div>
      </div>
    );
};
