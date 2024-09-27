import { useState, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from "./ui/button"

interface FileUploadProps {
  language: 'en' | 'es';
  fieldName: string;
  folder: string;
  onFileChange: (files: File[]) => void;
  buttonClassName: string;
}

export default function FileUpload({ language, fieldName, folder, onFileChange, buttonClassName }: FileUploadProps) {
  const { register, setValue, watch } = useFormContext()
  const files = watch(fieldName)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    onFileChange(selectedFiles)
    setValue(fieldName, selectedFiles)
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_: File, i: number) => i !== index)
    onFileChange(updatedFiles)
    setValue(fieldName, updatedFiles)
  }

  return (
    <div>
      <input 
        id={fieldName} 
        type="file" 
        accept="image/*"
        multiple
        {...register(fieldName)}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button 
        type="button"
        onClick={() => document.getElementById(fieldName)?.click()}
        className={buttonClassName}
      >
        {language === 'en' ? 'Select Files' : 'Seleccionar Archivos'}
      </Button>
      {files && files.length > 0 ? (
        <div className="mt-2">
          <p>{language === 'en' ? 'Selected files:' : 'Archivos seleccionados:'}</p>
          <ul>
            {files.map((file: File, index: number) => (
              <li key={index} className="flex items-center space-x-2">
                <span>{file.name}</span>
                <Button 
                  type="button"
                  onClick={() => removeFile(index)}
                  className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-full"
                >
                  {language === 'en' ? 'Remove' : 'Eliminar'}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-2">
          {language === 'en' ? 'No files selected' : 'Ningún archivo seleccionado'}
        </p>
      )}
    </div>
  )
}