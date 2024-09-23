import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Progress } from "./ui/Progress"
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dptyf5ath'
  }
});

interface StyleFieldProps {
  language: 'en' | 'es';
  onFileChange: (files: FileList | null) => void;
  files: File[] | null;
  onRemoveFile: (index: number) => void;
}

export default function StyleField({ language, onFileChange, files, onRemoveFile }: StyleFieldProps) {
  return (
    <div>
      <Input 
        id="Estilo" 
        type="file" 
        accept="image/*"
        multiple
        onChange={(e) => onFileChange(e.target.files)}
      />
      {files && files.length > 0 ? (
        <div className="mt-2">
          <p>{language === 'en' ? 'Selected files:' : 'Archivos seleccionados:'}</p>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="flex items-center">
                <span>{file.name}</span>
                <Button 
                  onClick={() => onRemoveFile(index)}
                  className="ml-2 text-sm"
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