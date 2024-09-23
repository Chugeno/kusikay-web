import { useState, useCallback, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { Checkbox } from "../components/ui/checkbox"
import StyleField from "../components/StyleField"
import GraphicElements from "../components/GraphicElements"
import { Progress } from "../components/ui/progress"

// ... (mantener las traducciones y otras constantes como estaban)

export default function Quotation() {
  const [language, setLanguage] = useState<'en' | 'es'>('es')
  const [styleUrls, setStyleUrls] = useState<string[]>([])
  const [styleFiles, setStyleFiles] = useState<File[] | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
    
  const schema = useCallback(() => yup.object({
    // ... (mantener el schema como estaba)
  }).required(), [language, styleFiles])

  const methods = useForm({
    resolver: yupResolver(schema())
  })

  const { handleSubmit, formState: { errors }, reset } = methods

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);
    
    try {
      // Subir archivos de Estilo a Cloudinary
      const uploadedStyleUrls = await uploadFilesToCloudinary(data['Nombre Completo'], styleFiles || [], 'Estilos');
      
      // Subir archivos de Elementos Gráficos a Cloudinary si es necesario
      let uploadedGraphicElementsUrls = [];
      if (data.ElementosGraficos.opcion === 'continuar' || data.ElementosGraficos.opcion === 'cambiar') {
        const files = data.ElementosGraficos.archivos;
        if (files && files.length > 0) {
          const uploadedUrls = await uploadFilesToCloudinary(data['Nombre Completo'], files, 'ElementosGraficos');
          uploadedGraphicElementsUrls = uploadedUrls;
        }
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'Uso de Ilustración') {
          const selectedOptions = Object.entries(value)
            .filter(([_, isChecked]) => isChecked)
            .map(([option]) => option);
          formData.append(key, selectedOptions.join(', '));
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
        setStyleUrls([]);
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
    const uploadedUrls = [];
    const totalFiles = files.length;
    let completedUploads = 0;

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'kusikay_formulario');
      formData.append('folder', `${userName}/${folder}`);

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

  // ... (mantener el resto del componente como estaba)

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-[#F1D9D2] text-[#523524] p-4 pb-20">
        {/* ... (mantener el encabezado y el botón de cambio de idioma como estaban) */}
        <form 
          id="quotationForm"
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-4"
        >
          {/* ... (mantener los campos del formulario como estaban) */}
        </form>
        
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <p className="mb-2">{language === 'en' ? 'Uploading files...' : 'Subiendo archivos...'}</p>
              <Progress value={uploadProgress} className="w-64" />
            </div>
          </div>
        )}

        {/* Botón flotante */}
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
          <Button 
            type="submit"
            form="quotationForm"
            className="bg-[#853C29] hover:bg-[#6A2F21] text-white px-8 py-3 rounded-full shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (language === 'en' ? 'Submitting...' : 'Enviando...') 
              : (language === 'en' ? 'Submit' : 'Enviar')}
          </Button>
        </div>
      </div>
    </FormProvider>
  )
}