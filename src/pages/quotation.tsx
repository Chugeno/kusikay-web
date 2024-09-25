import { useState, useCallback } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { FormTitleLabel, Label } from '../components/ui/label'
import { Button } from "../components/ui/button"
import { Checkbox } from "../components/ui/checkbox"
import StyleField from "../components/StyleField"
import GraphicElements from "../components/GraphicElements"
import { Progress } from "../components/ui/progress"
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Layout from '../components/Layout'  // Importar el componente Layout
import { useLanguage } from '../contexts/LanguageContext'
import Layout2 from '../components/Layout2'

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
  'Estilo': { en: 'Style', es: 'Estilo' },
  'ElementosGraficos': { en: 'Graphic Elements', es: 'Elementos Gráficos' },
  'Textos': { en: 'Texts', es: 'Textos' },
  'Fecha de Entrega': { en: 'Delivery Date', es: 'Fecha de Entrega' },
  'InformacionImportante': { en: 'Important Information', es: 'Información Importante' },
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
  'Estilo': { en: 'At least one file is required', es: 'Se requiere al menos un archivo' },
  'ElementosGraficos': { en: 'This field is required', es: 'Este campo es requerido' },
  'AdjuntarElementosGraficos': { en: 'You must attach at least one file', es: 'Debe adjuntar al menos un archivo' },
  'AdjuntarElementosGraficosMax': { en: 'You cannot attach more than 5 files', es: 'No puede adjuntar más de 5 archivos' },
  'Textos': { en: 'This field is required', es: 'Este campo es requerido' },
  'Fecha de Entrega': { en: 'This field is required', es: 'Este campo es requerido' },
  'InformacionImportante': { en: 'This field is required', es: 'Este campo es requerido' },
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
  'ElementosGraficos': { en: 'Select an option', es: 'Seleccione una opción' },
  'Estilo': { en: 'Upload style images', es: 'Subir imágenes de estilo' },
  'Textos': { en: 'If the illustration is accompanied by text, write the exact word(s) here:', es: 'Si la ilustración está acompañada de texto, escribí aquí la/las palabra/s exactas:' },
  'Fecha de Entrega': { en: 'Enter the final delivery date for the illustration:', es: 'Ingrese la fecha en que necesita la entrega final de la ilustración:' },
  'InformacionImportante': { en: 'Is there anything else you haven\'t asked that needs to be considered for the project?', es: '¿Hay algo más que no haya preguntado y necesite ser considerado para el proyecto?' },
}

const getFieldLabel = (fieldName: string, language: 'en' | 'es') => {
  return fieldTranslations[fieldName][language]
}

export default function Quotation() {
  const { language, setLanguage } = useLanguage()
  const [styleFiles, setStyleFiles] = useState<File[] | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
      message: errorMessages['Uso de Ilustración'][language],
      test: (value) => Object.values(value || {}).some(Boolean),
    }),
    'Contenido o Mensaje': yup.string().required(errorMessages['Contenido o Mensaje'][language]),
    'Palabras Clave': yup.string().required(errorMessages['Palabras Clave'][language]),
    'Estilo': yup.mixed().test('required', errorMessages['Estilo'][language], () => styleFiles && styleFiles.length > 0),
    'ElementosGraficos': yup.object().shape({
      opcion: yup.string().required(errorMessages['ElementosGraficos'][language]),
      archivos: yup.array().when('opcion', {
        is: (value: string) => value === 'continuar' || value === 'cambiar',
        then: (schema) => schema.min(1, errorMessages['AdjuntarElementosGraficos'][language])
                                .max(5, errorMessages['AdjuntarElementosGraficosMax'][language]),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    'Textos': yup.string().required(errorMessages['Textos'][language]),
    'Fecha de Entrega': yup.date().required(errorMessages['Fecha de Entrega'][language]),
    'InformacionImportante': yup.string().required(errorMessages['InformacionImportante'][language]),
  }).required(), [language, styleFiles])

  const methods = useForm({
    resolver: yupResolver(schema())
  })

  const { handleSubmit, formState: { errors }, control, reset } = methods

  const onSubmit = async (data: any, event: React.FormEvent<HTMLFormElement>) => {
    console.log('Formulario enviado', data);
    event.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);
    
    try {
      // Subir archivos de Estilo a Cloudinary
      const uploadedStyleUrls = await uploadFilesToCloudinary(data['Nombre Completo'], styleFiles || [], 'Estilos');
      
      // Subir archivos de Elementos Gráficos a Cloudinary si es necesario
      let uploadedGraphicElementsUrls: string[] = [];
      if (data.ElementosGraficos.opcion === 'continuar' || data.ElementosGraficos.opcion === 'cambiar') {
        const files = data.ElementosGraficos.archivos;
        if (files && files.length > 0) {
          uploadedGraphicElementsUrls = await uploadFilesToCloudinary(data['Nombre Completo'], files, 'ElementosGraficos');
        }
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'Uso de Ilustración') {
          const selectedOptions = Object.entries(value as Record<string, boolean>)
            .filter(([_, isChecked]) => isChecked)
            .map(([option]) => option);
          formData.append(key, selectedOptions.join(', '));
        } else if (key === 'Fecha de Entrega') {
          const formattedDate = format(new Date(value), 'd MMMM yyyy', { locale: es });
          formData.append(key, formattedDate);
        } else if (key !== 'Estilo' && key !== 'ElementosGraficos') {
          formData.append(key, value as string);
        }
      });
      formData.append('Imágenes de Estilo', uploadedStyleUrls.join(', '));
      formData.append('Imágenes de Elementos Gráficos', uploadedGraphicElementsUrls.join(', '));
      
      const response = await fetch('https://formspree.io/f/mnnakpaz', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        alert(language === 'en' ? 'Form submitted successfully' : 'Formulario enviado exitosamente');
        reset();
        setStyleFiles(null);
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(language === 'en' ? 'Form submission failed' : 'Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(language === 'en' ? 'There was an error submitting the form' : 'Hubo un error al enviar el formulario');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  }

  const uploadFilesToCloudinary = async (userName: string, files: File[], folder: string) => {
    const uploadedUrls: string[] = [];
    const totalFiles = files.length;
    let completedUploads = 0;

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'kusikay_formulario');
      formData.append('folder', `${userName}/${folder}`); // Incluir el nombre completo en la carpeta

      const response = await fetch(`https://api.cloudinary.com/v1_1/dptyf5ath/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        uploadedUrls.push(data.secure_url);
        completedUploads++;
        setUploadProgress((completedUploads / totalFiles) * 100);
      } else {
        console.error('Error uploading file:', file.name);
      }
    }

    return uploadedUrls;
  }

  const handleStyleFileChange = (files: FileList | null) => {
    if (files) {
      setStyleFiles(Array.from(files));
    }
  }

  const removeStyleFile = (index: number) => {
    setStyleFiles(prevFiles => prevFiles ? prevFiles.filter((_, i) => i !== index) : null);
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
    <FormProvider {...methods}>
    {/* para volver al encabezado general de la web cambiar layout por Layout, importante la mayuscula, y borrar el h1 que dice KYSIKAY MERCEDES DUCOS etc */}
    <Layout2> 
      <div className="min-h-screen bg-[#F1D9D2] text-[#523524] p-4 pb-20 flex justify-center">
        <div className="w-full max-w-3xl">          
          <h1 className="text-4xl font-bold mb-8 text-center text-[#853C29]">
            {language === 'en' ? 'Order Illustration' : 'Pedido de Ilustración'}
          </h1>
          <form 
            id="quotationForm"
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-6"
          >
            <Input type="hidden" name="_subject" value={language === 'en' ? 'New quote request' : 'Nueva solicitud de cotización'} />
            {Object.keys(fieldTranslations).map((fieldName) => (
              <div key={fieldName} className="bg-white p-4 rounded-lg shadow-md">
                <FormTitleLabel htmlFor={fieldName} className="text-lg font-semibold mb-2 text-[#853C29]">
                  {getFieldLabel(fieldName, language)}
                </FormTitleLabel>
                {fieldName === 'Mensaje' || fieldName === 'Descripción del Emprendimiento' || fieldName === 'Productos o Servicios' ? (
                  <Textarea 
                    id={fieldName} 
                    {...methods.register(fieldName)} 
                    placeholder={placeholders[fieldName]?.[language] || ''}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#853C29] focus:border-transparent"
                  />
                ) : fieldName === 'Uso de Ilustración' ? (
                  <div className="space-y-2">
                    {opcionesUsoIlustracion.map((opcion) => (
                      <div key={opcion.value} className="flex items-center">
                        <Checkbox
                          id={`${fieldName}-${opcion.value}`}
                          {...methods.register(`Uso de Ilustración.${opcion.value}`)}
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
                      {...methods.register(fieldName)} 
                      placeholder={placeholders[fieldName]?.[language] || ''}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#853C29] focus:border-transparent"
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
                      {...methods.register(fieldName)} 
                      placeholder={placeholders[fieldName]?.[language] || ''}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#853C29] focus:border-transparent"
                    />
                  </>
                ) : fieldName === 'Estilo' ? (
                  <StyleField 
                    language={language}
                    onFileChange={handleStyleFileChange}
                    files={styleFiles}
                    onRemoveFile={removeStyleFile}
                  />
                ) : fieldName === 'ElementosGraficos' ? (
                  <GraphicElements language={language} />
                ) : fieldName === 'Fecha de Entrega' ? (
                  <Controller
                    control={control}
                    name="Fecha de Entrega"
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText={placeholders[fieldName]?.[language] || ''}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#853C29] focus:border-transparent"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                      />
                    )}
                  />
                ) : (
                  <Input 
                    id={fieldName} 
                    {...methods.register(fieldName)} 
                    placeholder={placeholders[fieldName]?.[language] || ''}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#853C29] focus:border-transparent"
                  />
                )}
                {errors[fieldName] && <p className="text-red-500 mt-1">{errors[fieldName]?.message}</p>}
              </div>
            ))}
          </form>
          
          {isSubmitting && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <p className="mb-2">{language === 'en' ? 'Uploading files...' : 'Subiendo archivos...'}</p>
                <Progress value={uploadProgress} className="w-64" />
              </div>
            </div>
          )}

          {isSending && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <p className="mb-2">{language === 'en' ? 'Sending form...' : 'Enviando formulario...'}</p>
                <Progress value={uploadProgress} className="w-64" />
              </div>
            </div>
          )}

          {isSubmitted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <p className="mb-2">{language === 'en' ? 'Form submitted successfully!' : '¡Formulario enviado exitosamente!'}</p>
              </div>
            </div>
          )}

          {/* Botón flotante */}
          <div className="fixed bottom-4 left-0 right-0 flex justify-center">
            <Button 
              type="submit"
              form="quotationForm"
              className="bg-kusikay-accent text-white rounded-full px-6 py-3 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (language === 'en' ? 'Submitting...' : 'Enviando...') 
                : (language === 'en' ? 'Submit' : 'Enviar')}
            </Button>
          </div>
        </div>
      </div>
    </Layout2> {/* para volver al encabezado general de la web cambiar Layout2 por Layout */}
    </FormProvider>
  )
}