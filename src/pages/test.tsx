import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from "../components/ui/button"
import GraphicElements from "../components/GraphicElements"

const schema = yup.object({
  ElementosGraficos: yup.string().required('Este campo es requerido'),
  AdjuntarElementosGraficos: yup.array().when('ElementosGraficos', {
    is: (value: string) => value === 'continuar' || value === 'cambiar',
    then: yup.array().min(1, 'Debe adjuntar al menos un archivo').max(5, 'No puede adjuntar más de 5 archivos'),
    otherwise: yup.array().notRequired(),
  }),
}).required()

export default function TestPage() {
  const [language, setLanguage] = useState<'en' | 'es'>('es')

  const methods = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    console.log('Datos del formulario:', data)
    
    if (data.ElementosGraficos === 'continuar' || data.ElementosGraficos === 'cambiar') {
      // Simular la carga de archivos a Cloudinary
      console.log('Simulando carga de archivos...')
      // Aquí iría la lógica real de carga de archivos
    }

    alert(JSON.stringify(data, null, 2))
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-[#F1D9D2] text-[#523524] p-4">
        <h1 className="text-2xl font-bold mb-4">
          {language === 'en' ? 'Test Page' : 'Página de Prueba'}
        </h1>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <GraphicElements language={language} />
          
          <Button type="submit" className="mt-4">
            {language === 'en' ? 'Submit' : 'Enviar'}
          </Button>
        </form>
        
        <Button 
          onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          className="mt-4 bg-[#853C29] hover:bg-[#6A2F21] text-white"
        >
          {language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
        </Button>
      </div>
    </FormProvider>
  )
}