import { useState, useEffect } from 'react'
import Link from 'next/link'

const translations = {
  en: {
    language: 'English',
    illustrations: 'Illustrations',
    crafts: 'Crafts',
    murals: 'Murals',
    writings: 'Writings',
    biography: 'Biography',
    contact: 'Contact',
  },
  es: {
    language: 'Español',
    illustrations: 'Ilustraciones',
    crafts: 'Artesanías',
    murals: 'Murales',
    writings: 'Escritos',
    biography: 'Biografía',
    contact: 'Contacto',
  },
}

export default function Layout({ children, title }) {
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
    <div className="min-h-screen bg-[#F1D9D2] text-[#523524]">
      <div className="container mx-auto px-4">
        <header className="py-6 flex justify-between items-center">
          <Link href="/" className="font-sue-ellen text-3xl text-[#853C29]">
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
                    <span className="relative z-10">{t[item]}</span>
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#853C29] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="px-3 py-1 rounded border border-[#523524] text-sm hover:bg-[#853C29] hover:text-[#F1D9D2] transition-colors duration-300 font-roboto"
          >
            {t.language}
          </button>
        </header>
        <main>
          <h1 className="font-roboto text-4xl text-[#853C29] mb-8">{title}</h1>
          {children}
        </main>
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&family=Roboto:wght@400;700&display=swap');
        
        .font-sue-ellen {
          font-family: 'Sue Ellen Francisco', cursive;
        }
        
        .font-roboto {
          font-family: 'Roboto', sans-serif;
        }
      `}</style>
    </div>
  )
}