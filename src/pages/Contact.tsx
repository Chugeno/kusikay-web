import Layout2 from '../components/Layout2'
// Cambiar la ruta del módulo importado
import { useLanguage } from '../contexts/LanguageContext'
import { Button } from '../components/ui/button' // Usar tu propio componente Button
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toastConfig } from '../utils/toastConfig' // Importar la configuración de toast

export default function Contact() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Contact",
      description: "Get in touch with me for collaborations, commissions, or just to say hello!",
      email: "Email",
      instagram: "Instagram",
      emailCopied: "Email copied to clipboard!"
    },
    es: {
      title: "Contacto",
      description: "¡Ponte en contacto conmigo para colaboraciones, encargos o simplemente para saludar!",
      email: "Correo electrónico",
      instagram: "Instagram",
      emailCopied: "¡Correo electrónico copiado al portapapeles!"
    }
  }

  const handleEmailClick = () => {
    navigator.clipboard.writeText("mercedesducos@gmail.com").then(() => {
      toast.success(content[language].emailCopied, toastConfig);
    });
  }

  const handleInstagramClick = () => {
    window.open("https://instagram.com/kusikay.ilustracion", "_blank");
  }

  return (
    <Layout2>
      <div className="flex flex-col items-center justify-center min-h-[calc(80vh-64px)]">
        <div className="max-w-md text-center px-4">
          <h1 className="text-3xl font-bold mb-4">{content[language].title}</h1>
          <p className="font-inter text-lg mb-8">
            {content[language].description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button onClick={handleEmailClick}>
              {content[language].email}
            </Button>
            <Button onClick={handleInstagramClick}>
              {content[language].instagram}
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout2>
  )
}