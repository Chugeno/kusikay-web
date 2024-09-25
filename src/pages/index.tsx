import type { NextPage } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const translations = {
  en: {
    language: 'English',
    subtitle: 'by Mercedes Ducos',
    illustrations: 'Illustrations',
    crafts: 'Crafts',
    murals: 'Murals',
    writings: 'Writings',
    biography: 'Biography',
    contact: 'Contact',
    quotation: 'Quotation',
  },
  es: {
    language: 'Español',
    subtitle: 'por Mercedes Ducos',
    illustrations: 'Ilustraciones',
    crafts: 'Artesanías',
    murals: 'Murales',
    writings: 'Escritos',
    biography: 'Biografía',
    contact: 'Contacto',
    quotation: 'Presupuesto',
  },
}

// const menuItems = ['illustrations', 'crafts', 'murals', 'writings', 'biography', 'contact'] Descomentar para mostrar todas las opciones
const menuItems = ['contact']

const HomePage: NextPage = () => {
  const { language, setLanguage } = useLanguage()
  const t = translations[language as keyof typeof translations]

  return (
    <div className="min-h-screen bg-kusikay-bg text-kusikay-text flex flex-col p-4">
      <header className="flex justify-end mb-8">
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
          className="px-4 py-2 rounded border border-kusikay-text text-sm hover:bg-kusikay-accent hover:text-kusikay-bg transition-colors duration-300 font-roboto"
        >
          {t.language}
        </motion.button>
      </header>
      <main className="flex-grow flex flex-col items-center">
        <div className="flex-grow flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-sue-ellen text-6xl md:text-8xl text-kusikay-accent mb-4"
          >
            KUSIKAY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-roboto text-lg md:text-xl mb-8"
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link href="/quotation" className="bg-kusikay-accent hover:bg-kusikay-accent-hover text-kusikay-bg font-roboto text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              {t.quotation}
            </Link>
          </motion.div>
        </div>
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-auto mb-8"
        >
          <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {menuItems.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
              >
                <Link href={`/${item}`} className="text-lg md:text-xl font-roboto relative overflow-hidden group">
                  <span className="relative z-10">{t[item as keyof typeof t]}</span>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-kusikay-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      </main>
    </div>
  )
}

export default HomePage