import { useLanguage } from '../contexts/LanguageContext'
import CustomImage from '../components/CustomImage'
import Link from 'next/link'
import { motion } from 'framer-motion'

const translations = {
  en: {
    title: 'ILLUSTRATIONS',
    subtitle: 'MAKERS',
    language: 'English',
    illustrations: 'Illustrations',
    crafts: 'Crafts',
    murals: 'Murals',
    writings: 'Writings',
    biography: 'Biography',
    contact: 'Contact',
    description: 'This illustration series explores the concept of creation and the human spirit behind craftsmanship. Each piece tells a story of dedication, skill, and the beauty of handmade art.'
  },
  es: {
    title: 'ILUSTRACIONES',
    subtitle: 'HACEDORAS',
    language: 'Español',
    illustrations: 'Ilustraciones',
    crafts: 'Artesanías',
    murals: 'Murales',
    writings: 'Escritos',
    biography: 'Biografía',
    contact: 'Contacto',
    description: 'Esta serie de ilustraciones explora el concepto de creación y el espíritu humano detrás de la artesanía. Cada pieza cuenta una historia de dedicación, habilidad y la belleza del arte hecho a mano.'
  }
}

export default function Illustrations() {
  const { language, setLanguage } = useLanguage()
  const t = translations[language as keyof typeof translations]

  return (
    <div className="min-h-screen bg-kusikay-bg text-kusikay-text">
      <div className="container mx-auto px-4">
        <header className="py-6 flex justify-between items-center">
          <Link href="/" className="font-sue-ellen text-3xl text-kusikay-accent uppercase">
            KUSIKAY
          </Link>
          <nav>
            <ul className="flex space-x-4">
              {['illustrations', 'crafts', 'murals', 'writings', 'biography', 'contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item}`}
                    className="text-sm font-roboto relative overflow-hidden group"
                  >
                    <span className="relative z-10">{t[item as keyof typeof t]}</span>
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-kusikay-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="px-3 py-1 rounded border border-kusikay-text text-sm hover:bg-kusikay-accent hover:text-kusikay-bg transition-colors duration-300"
          >
            {t.language}
          </button>
        </header>
        <main>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-sue-ellen text-5xl md:text-6xl text-kusikay-accent mb-8 text-center"
          >
            {t.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div>
              <CustomImage
                src="imagen1.jpg"
                alt="Illustration of figures"
                width={500}
                height={700}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-sue-ellen text-4xl text-kusikay-accent mb-4">
                {t.subtitle}
              </h2>
              <p className="font-roboto text-lg">
                {t.description}
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}