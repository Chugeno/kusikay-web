import { useLanguage } from '../contexts/LanguageContext'
import CustomImage from '../components/CustomImage'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'] })

const projects = [
  {
    id: 'urban-art',
    imageSrc: '/images/imagen1.jpg',
    imageAlt: {
      en: 'Colorful mural in an urban setting',
      es: 'Mural colorido en un entorno urbano'
    },
    title: {
      en: 'URBAN ART',
      es: 'ARTE URBANO'
    },
    description: {
      en: 'These murals bring color and life to urban spaces, telling stories of community, nature, and cultural heritage. Each piece is designed to inspire and engage viewers in public spaces.',
      es: 'Estos murales aportan color y vida a los espacios urbanos, contando historias de comunidad, naturaleza y patrimonio cultural. Cada pieza está diseñada para inspirar y captar la atención de los espectadores en espacios públicos.'
    }
  },
  {
    id: 'urban-art',
    imageSrc: '/images/imagen1.jpg',
    imageAlt: {
      en: 'Colorful mural in an urban setting',
      es: 'Mural colorido en un entorno urbano'
    },
    title: {
      en: 'URBAN ART',
      es: 'ARTE URBANO'
    },
    description: {
      en: 'These murals bring color and life to urban spaces, telling stories of community, nature, and cultural heritage. Each piece is designed to inspire and engage viewers in public spaces.',
      es: 'Estos murales aportan color y vida a los espacios urbanos, contando historias de comunidad, naturaleza y patrimonio cultural. Cada pieza está diseñada para inspirar y captar la atención de los espectadores en espacios públicos.'
    }
  },
  // Puedes agregar más proyectos aquí siguiendo la misma estructura
]

const translations = {
  en: {
    title: 'MURALS',
  },
  es: {
    title: 'MURALES',
  }
}

export default function Murals() {
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations]

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
            <CustomImage
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