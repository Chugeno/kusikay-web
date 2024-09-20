import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { Checkbox } from "../components/ui/checkbox"

const fieldTranslations = {
  'Nombre Completo': { en: 'Full Name', es: 'Nombre Completo' },
  'Correo Electrónico': { en: 'Email', es: 'Correo Electrónico' },
  'Mensaje': { en: 'Message', es: 'Mensaje' },
  'Descripción del Emprendimiento': { en: 'Venture Description', es: 'Descripción del Emprendimiento' },
  'Productos o Servicios': { en: 'Products or Services', es: 'Productos o Servicios' },
  'Público Objetivo': { en: 'Target Audience', es: 'Público Objetivo' },
  'Eslogan': { en: 'Slogan', es: 'Eslogan' },
  'Redes Sociales': { en: 'Social Networks', es: 'Redes Sociales' },
  'Uso de Ilustración': { en: 'Illustration Use', es: 'Uso de Ilustración' },
  'Contenido o Mensaje': { en: 'Content or Message', es: 'Contenido o Mensaje' },
  'Palabras Clave': { en: 'Keywords', es: 'Palabras Clave' },
}

const errorMessages = {
  'Nombre Completo': { en: 'Full name is required', es: 'El nombre completo es requerido' },
  'Correo Electrónico': { en: 'Valid email is required', es: 'Se requiere un correo electrónico válido' },
  'Mensaje': { en: 'Message is required', es: 'El mensaje es requerido' },
  'Descripción del Emprendimiento': { en: 'Venture description is required', es: 'La descripción del emprendimiento es requerida' },
  'Productos o Servicios': { en: 'Products or services are required', es: 'Los productos o servicios son requeridos' },
  'Público Objetivo': { en: 'Target audience is required', es: 'El público objetivo es requerido' },
  'Uso de Ilustración': { en: 'Select at least one option', es: 'Selecciona al menos una opción' },
  'Contenido o Mensaje': { en: 'Content or message is required', es: 'El contenido o mensaje es requerido' },
  'Palabras Clave': { en: 'At least one keyword is required', es: 'Se requiere al menos una palabra clave' },
}

const placeholders = {
  'Nombre Completo': { en: 'Enter your full name', es: 'Ingrese su nombre completo' },
  'Correo Electrónico': { en: 'Enter your email', es: 'Ingrese su correo electrónico' },
  'Mensaje': { en: 'Enter your message', es: 'Ingrese su mensaje' },
  'Descripción del Emprendimiento': { en: 'Describe your venture', es: 'Describa su emprendimiento' },
  'Productos o Servicios': { en: 'List your products or services', es: 'Liste sus productos o servicios' },
  'Público Objetivo': { en: 'Who is your target audience?', es: '¿Quién es su público objetivo?' },
  'Eslogan': { en: 'Enter your slogan if you have one', es: 'Ingrese su eslogan si tiene uno' },
  'Redes Sociales': { en: 'List your social networks', es: 'Liste sus redes sociales' },
  'Contenido o Mensaje': { en: 'What do you want the illustration to communicate?', es: '¿Qué quieres que la ilustración comunique?' },
  'Palabras Clave': { en: 'Keyword 1, Keyword 2, Keyword 3, Keyword 4, Keyword 5', es: 'Palabra clave 1, Palabra clave 2, Palabra clave 3, Palabra clave 4, Palabra clave 5' },
}

const getFieldLabel = (fieldName: string, language: 'en' | 'es') => {
  return fieldTranslations[fieldName][language]
}

export default function Quotation() {
  const [language, setLanguage] = useState<'en' | 'es'>('es')
  
  const schema = useCallback(() => yup.object({
    'Nombre Completo': yup.string().required(errorMessages['Nombre Completo'][language]),
    'Correo Electrónico': yup.string().email(errorMessages['Correo Electrónico'][language]).required(errorMessages['Correo Electrónico'][language]),
    'Mensaje': yup.string().required(errorMessages['Mensaje'][language]),
    'Descripción del Emprendimiento': yup.string().required(errorMessages['Descripción del Emprendimiento'][language]),
    'Productos o Servicios': yup.string().required(errorMessages['Productos o Servicios'][language]),
    'Público Objetivo': yup.string().required(errorMessages['Público Objetivo'][language]),
    'Eslogan': yup.string(),
    'Redes Sociales': yup.string(),
    'Uso de Ilustración': yup.object().test({
      name: 'at-least-one-checked',
      message: language === 'en' ? 'Select at least one option' : 'Selecciona al menos una opción',
      test: (value) => Object.values(value || {}).some(Boolean),
    }),
    'Contenido o Mensaje': yup.string().required(errorMessages['Contenido o Mensaje'][language]),
    'Palabras Clave': yup.string().required(errorMessages['Palabras Clave'][language]),
  }).required(), [language])

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema())
  })

  const onSubmit = async (data) => {
    // Convertir el objeto de "Uso de Ilustración" a un array de opciones seleccionadas
    const usoIlustracionSeleccionado = Object.entries(data['Uso de Ilustración'] || {})
      .filter(([_, isChecked]) => isChecked)
      .map(([value]) => value)
    
    const dataToSubmit = {
      ...data,
      'Uso de Ilustración': usoIlustracionSeleccionado
    }

    try {
      const response = await fetch('https://formspree.io/f/mnnakpaz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      })
      if (response.ok) {
        alert(language === 'en' ? 'Form submitted successfully' : 'Formulario enviado exitosamente')
      } else {
        throw new Error(language === 'en' ? 'Form submission failed' : 'Error al enviar el formulario')
      }
    } catch (error) {
      console.error('Error:', error)
      alert(language === 'en' ? 'There was an error submitting the form' : 'Hubo un error al enviar el formulario')
    }
  }

  const opcionesUsoIlustracion = [
    { value: 'Logo', label: { en: 'Logo. Image or identity of the brand and/or company.', es: 'Logo. Imagen o identidad de la marca y/o empresa.' } },
    { value: 'Flyer', label: { en: 'Flyer. Promotion and/or campaign with a defined duration.', es: 'Flyer. Promoción y/o campaña con una duración definida.' } },
    { value: 'Publicación en redes sociales', label: { en: 'Publication in social networks (feed).', es: 'Publicación en redes sociales (feed).' } },
    { value: 'Pack de elementos para redes sociales', label: { en: 'Pack of elements for publications on social networks (feed).', es: 'Pack de elementos para publicaciones en redes sociales (feed).' } },
    { value: 'Historia en Instagram', label: { en: 'Story on Instagram.', es: 'Historia en Instagram.' } },
    { value: 'Packaging de producto', label: { en: 'Product packaging.', es: 'Packaging de producto.' } },
    { value: 'Reproducción constante', label: { en: 'For constant reproduction inside a paid product (clothing, accessories, stickers, music album, digital or physical book cover).', es: 'Para reproducción constante dentro de un producto de pago (prendas de ropa, accesorios, stickers, álbum de música, carátula de libro digital o físico).' } },
  ]

  return (
    <div className="min-h-screen bg-[#F1D9D2] text-[#523524] p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{language === 'en' ? 'Request a Quote' : 'Solicitar una Cotización'}</h1>
        <Button 
          onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          className="bg-[#853C29] hover:bg-[#6A2F21] text-white"
        >
          {language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {Object.keys(fieldTranslations).map((fieldName) => (
          <div key={fieldName}>
            <Label htmlFor={fieldName}>{getFieldLabel(fieldName, language)}</Label>
            {fieldName === 'Mensaje' || fieldName === 'Descripción del Emprendimiento' || fieldName === 'Productos o Servicios' ? (
              <Textarea 
                id={fieldName} 
                {...register(fieldName)} 
                placeholder={placeholders[fieldName][language]}
              />
            ) : fieldName === 'Uso de Ilustración' ? (
              <div className="space-y-2">
                {opcionesUsoIlustracion.map((opcion) => (
                  <div key={opcion.value} className="flex items-center">
                    <Checkbox
                      id={`${fieldName}-${opcion.value}`}
                      {...register(`Uso de Ilustración.${opcion.value}`)}
                    />
                    <Label htmlFor={`${fieldName}-${opcion.value}`} className="ml-2">
                      {opcion.label[language]}
                    </Label>
                  </div>
                ))}
                {errors['Uso de Ilustración'] && <p className="text-red-500">{errors['Uso de Ilustración'].message}</p>}
              </div>
            ) : fieldName === 'Contenido o Mensaje' ? (
              <>
                <p className="text-sm text-gray-600 mb-2">
                  {language === 'en' 
                    ? "This is not about describing the exact idea or characters, but what is the message you would like to communicate."
                    : "No se trata de que describas la idea exacta ni los personajes, sino cuál es el mensaje que te gustaría comunicar."}
                </p>
                <p className="text-sm italic text-gray-600 mb-2">
                  {language === 'en'
                    ? "For example: I would like the image to convey peace, calm, silence. Something like meditative and also healing but not the typical image of Buddha meditating."
                    : "Por ejemplo: quisiera que la imagen transmita paz, calma, silencio. Algo como meditativo y también de sanación pero que no sea la típica imagen de buda meditando."}
                </p>
                <Textarea 
                  id={fieldName} 
                  {...register(fieldName)} 
                  placeholder={placeholders[fieldName][language]}
                />
              </>
            ) : fieldName === 'Palabras Clave' ? (
              <>
                <p className="text-sm text-gray-600 mb-2">
                  {language === 'en' 
                    ? "Enter up to 5 keywords that describe your project or the feeling you want to convey."
                    : "Ingrese hasta 5 palabras clave que describan su proyecto o el sentimiento que desea transmitir."}
                </p>
                <Input 
                  id={fieldName} 
                  {...register(fieldName)} 
                  placeholder={placeholders[fieldName][language]}
                />
              </>
            ) : (
              <Input 
                id={fieldName} 
                type={fieldName === 'Correo Electrónico' ? 'email' : 'text'} 
                {...register(fieldName)} 
                placeholder={placeholders[fieldName][language]}
              />
            )}
            {errors[fieldName] && <p className="text-red-500">{errors[fieldName].message}</p>}
          </div>
        ))}
        
        <Button type="submit">{language === 'en' ? 'Submit' : 'Enviar'}</Button>
      </form>
    </div>
  )
}