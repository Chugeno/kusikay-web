import { useLanguage } from '../contexts/LanguageContext'
import Image from 'next/image'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'] })

const projects = [
  {
    id: 'makers',
    imageSrc: '/images/imagen1.jpg',
    imageAlt: {
      en: 'Illustration of creative makers',
      es: 'Ilustración de creadores creativos'
    },
    title: {
      en: 'MAKERS',
      es: 'HACEDORAS'
    },
    description: {
      en: 'This illustration series explores the concept of creation and the human spirit behind craftsmanship. Each piece tells a story of dedication, skill, and the beauty of handmade art.',
      es: 'Esta serie de ilustraciones explora el concepto de creación y el espíritu humano detrás de la artesanía. Cada pieza cuenta una historia de dedicación, habilidad y la belleza del arte hecho a mano.'
    }
  },
  // Puedes agregar más proyectos aquí siguiendo la misma estructura
]

const translations = {
  en: {
    title: 'ILLUSTRATIONS',
  },
  es: {
    title: 'ILUSTRACIONES',
  }
}

export default function Illustrations() {
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations]

  /*
  return (
    <Layout>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${robotoCondensed.className} text-5xl md:text-6xl text-kusikay-accent mb-8 text-center font-bold uppercase`}
      >
        {t.title}
      </motion.h1>
      {projects.map((project, index) => (
        <motion.div 
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 * index }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div>
            <Image
              src={project.imageSrc}
              alt={project.imageAlt[language as keyof typeof project.imageAlt]}
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className={`${robotoCondensed.className} text-4xl text-kusikay-accent mb-4 font-bold uppercase`}>
              {project.title[language as keyof typeof project.title]}
            </h2>
            <p className="font-roboto text-lg">
              {project.description[language as keyof typeof project.description]}
            </p>
          </div>
        </motion.div>
      ))}
    </Layout>
  )
} 
*/

return (
  <Layout>
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${robotoCondensed.className} text-5xl md:text-6xl text-kusikay-accent mb-8 text-center font-bold uppercase`}
    >
      {t.title}
    </motion.h1>
    {projects.map((project, index) => (
      <motion.div 
        key={project.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 * index }}
        className="grid md:grid-cols-2 gap-8 mb-16"
      >
        <div>
          <Image
            src={project.imageSrc}
            alt={project.imageAlt[language as keyof typeof project.imageAlt]}
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className={`${robotoCondensed.className} text-4xl text-kusikay-accent mb-4 font-bold uppercase`}>
            {project.title[language as keyof typeof project.title]}
          </h2>
          <p className="font-roboto text-lg">
            {project.description[language as keyof typeof project.description]}
          </p>
        </div>
      </motion.div>
    ))}
  </Layout>
)
}