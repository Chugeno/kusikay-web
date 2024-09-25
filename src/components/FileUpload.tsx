import { useState, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from "./ui/button"

interface FileUploadProps {
  language: 'en' | 'es';
  fieldName: string;
  folder: string;
  onFileChange: (files: File[]) => void;
  buttonClassName?: string; // Añadir esta línea
}

export default function FileUpload({ language, fieldName, folder, onFileChange, buttonClassName }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const { register, setValue } = useFormContext()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(newFiles);
      onFileChange(newFiles);
    }
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileChange(newFiles);
  }

  return (
    <div>
      <input 
        type="file" 
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <Button 
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="bg-[#853C29] hover:bg-[#6A2F21] text-white mb-2"
      >
        {language === 'en' ? 'Select Files' : 'Seleccionar Archivos'}
      </Button>
      {files.length === 0 ? (
        <p className="mt-2">
          {language === 'en' ? 'No files selected' : 'Ningún archivo seleccionado'}
        </p>
      ) : (
        <div className="mt-2">
          <p>{language === 'en' ? 'Selected files:' : 'Archivos seleccionados:'}</p>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span>{file.name}</span>
                <Button 
                  type="button"
                  onClick={() => removeFile(index)}
                  className={buttonClassName}
                >
                  {language === 'en' ? 'Remove' : 'Eliminar'}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <input type="hidden" {...register(fieldName)} />
    </div>
  )
}