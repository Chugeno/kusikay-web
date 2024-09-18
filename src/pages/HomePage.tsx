import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

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
    quotation: 'Cotización',
  },
}

const menuItems = ['illustrations', 'crafts', 'murals', 'writings', 'biography', 'contact']

export default function HomePage() {
  const [language, setLanguage] = useState('es')
  const t = translations[language]

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&family=Roboto:wght@400;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F1D9D2] text-[#523524] overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F1D9D2] to-[#853C29] opacity-10 animate-subtle-shift" />
      <div className="relative z-10 p-4 flex-grow flex flex-col">
        <header className="flex justify-end mb-8">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="px-4 py-2 rounded border border-[#523524] text-sm hover:bg-[#853C29] hover:text-[#F1D9D2] transition-colors duration-300 font-roboto"
          >
            {t.language}
          </button>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-sue-ellen text-6xl md:text-8xl text-[#853C29]"
          >
            KUSIKAY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-roboto text-lg md:text-xl mt-4"
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <Link href="/quotation" passHref>
              <Button
                className="bg-[#853C29] hover:bg-[#6A2F21] text-[#F1D9D2] font-roboto text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t.quotation}
              </Button>
            </Link>
          </motion.div>
        </main>
        <footer className="mt-auto">
          <nav>
            <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    href={`/${item}`}
                    className="text-lg md:text-xl font-roboto relative overflow-hidden group"
                  >
                    <span className="relative z-10">{t[item]}</span>
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#853C29] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </footer>
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&family=Roboto:wght@400;700&display=swap');
        
        .font-sue-ellen {
          font-family: 'Sue Ellen Francisco', cursive;
        }
        
        .font-roboto {
          font-family: 'Roboto', sans-serif;
        }

        @keyframes subtleShift {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }

        .animate-subtle-shift {
          animation: subtleShift 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}