import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";

type GetFile = {
    token: string | undefined;
    className: string;
}

type Upload = {
  file: File | null;
}

export const GetFile = ({ token, className }:GetFile) => {
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
   

    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadFile = ({ file }: Upload) => {
     
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
    
        const options = {
          method: "POST",
          url: "http://localhost:3000/import/",
          headers: {
            "Content-Type": `multipart/form-data; boundary=---011000010111000001101001'`,
            Authorization: token,
          },
          data: formData, // Passe o objeto FormData diretamente como corpo da solicitação
        };
    
        axios
          .request(options)
          .then(function () {
            toast.success('Importação realizada com sucesso')
            setSelectedFile(null)
          })
          .catch(function (error) {
            console.log('erro ao enviar arquivo', error);
            toast.error('Erro ao enviar arquivo')
            setSelectedFile(null)
          });
      }
    };
    
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
        uploadFile({file})
      }
    };
  
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      setSelectedFile(file);
      // Faça o que precisa ser feito com o arquivo aqui (por exemplo, exibir informações ou fazer upload)
      uploadFile({file})
    };
  
    const handleSelectFileClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    return (
        <div
            id="get-file"
            className={className}
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
    )}