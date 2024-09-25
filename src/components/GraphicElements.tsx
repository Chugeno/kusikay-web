import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import FileUpload from "./FileUpload"

interface GraphicElementsProps {
  language: 'en' | 'es';
}

export default function GraphicElements({ language }: GraphicElementsProps) {
  const { register, setValue, watch } = useFormContext()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const watchGraphicElements = watch('ElementosGraficos.opcion')

  const options = [
    { value: 'continuar', label: { 
      en: 'I have graphic elements for my venture and want to continue in harmony with that line', 
      es: 'Tengo elementos gráficos de mi emprendimiento y quiero continuar en armonía con esa línea' 
    }},
    { value: 'cambiar', label: { 
      en: 'I have graphic elements but I\'m looking for a change from that aesthetic', 
      es: 'Tengo elementos gráficos pero estoy buscando un cambio respecto de esa estética' 
    }},
    { value: 'crear', label: { 
      en: 'I don\'t have any and want to create them', 
      es: 'No tengo y quiero crearlos' 
    }}
  ]

  const handleFileChange = (files: File[]) => {
    setValue('ElementosGraficos.archivos', files)
  }

  return (
    <div>
      <Label>
        {language === 'en' 
          ? 'Graphic Elements (Can be the venture\'s logo, typography, characters, color palette, etc.) *' 
          : 'Elementos Gráficos (Pueden ser el logo del emprendimiento, tipografías, personajes, paleta de color, etc.) *'}
      </Label>
      <RadioGroup 
        onValueChange={(value) => {
          setSelectedOption(value)
          setValue('ElementosGraficos.opcion', value)
        }}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`option-${option.value}`} />
            <Label htmlFor={`option-${option.value}`}>{option.label[language]}</Label>
          </div>
        ))}
      </RadioGroup>
      {(selectedOption === 'continuar' || selectedOption === 'cambiar') && (
        <FileUpload 
          language={language}
          fieldName="ElementosGraficos.archivos"
          folder="ElementosGraficos"
          onFileChange={handleFileChange}
          buttonClassName="bg-[#853C29] hover:bg-[#6A2F21] text-white px-8 py-3 rounded-full shadow-lg"
        />
      )}
    </div>
  )
}