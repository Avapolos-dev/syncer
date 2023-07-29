import { ChangeEvent, DragEvent, useRef, useState } from 'react';

type Props = {
    className: string;
}

export const GetFile = ({ className }:Props) => {
    
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