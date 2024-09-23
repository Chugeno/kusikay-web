import { useFormContext } from 'react-hook-form'
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface StyleFieldProps {
  language: 'en' | 'es';
  onFileChange: (files: FileList | null) => void;
  files: File[] | null;
  onRemoveFile: (index: number) => void;
}

export default function StyleField({ language, onFileChange, files, onRemoveFile }: StyleFieldProps) {
  const { register } = useFormContext()

  return (
    <div>
      <input 
        id="Estilo" 
        type="file" 
        accept="image/*"
        multiple
        {...register('Estilo')}
        onChange={(e) => onFileChange(e.target.files)}
        className="hidden"
      />
      <Button 
        type="button"
        onClick={() => document.getElementById('Estilo')?.click()}
        className="bg-[#853C29] hover:bg-[#6A2F21] text-white mb-2"
      >
        {language === 'en' ? 'Select Files' : 'Seleccionar Archivos'}
      </Button>
      {files && files.length > 0 ? (
        <div className="mt-2">
          <p>{language === 'en' ? 'Selected files:' : 'Archivos seleccionados:'}</p>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span>{file.name}</span>
                <Button 
                  onClick={() => onRemoveFile(index)}
                  variant="destructive"
                  size="sm"
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