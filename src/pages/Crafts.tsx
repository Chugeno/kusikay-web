import { useLanguage } from '../contexts/LanguageContext'
import Image from 'next/image'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'] })

const projects = [
  {
    id: 'amulets',
    imageSrc: '/images/imagen1.jpg',
    imageAlt: {
      en: 'Handcrafted amulet',
      es: 'Amuleto hecho a mano'
    },
    title: {
      en: 'AMULETS',
      es: 'AMULETOS'
    },
    description: {
      en: 'These handcrafted amulets are inspired by ancient traditions and natural forms. Each piece is carefully created to bring a sense of protection and connection to the wearer.',
      es: 'Estos amuletos hechos a mano están inspirados en tradiciones antiguas y formas naturales. Cada pieza es creada cuidadosamente para brindar una sensación de protección y conexión a quien lo lleva.'
    }
  },
  // Puedes agregar más proyectos aquí siguiendo la misma estructura
]

const translations = {
  en: {
    title: 'CRAFTS',
  },
  es: {
    title: 'ARTESANÍAS',
  }
}

export default function Crafts() {
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