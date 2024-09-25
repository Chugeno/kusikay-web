import { useLanguage } from '../contexts/LanguageContext'
import Link from 'next/link'
import { ReactNode } from 'react'
import FloatingButton from './FloatingButton'  // Asegúrate de que esta importación esté presente

const translations = {
  en: {
    language: 'English',    
    biography: 'Biography',
    contact: 'Contact',
  },
  es: {
    language: 'Español',    
    biography: 'Biografía',
    contact: 'Contacto',
  }
}

type LayoutProps = {
  children: ReactNode
}

export default function Layout2 ({ children }: LayoutProps) {
  const { language, setLanguage } = useLanguage()
  const t = translations[language as keyof typeof translations]

  return (
    <div className="min-h-screen bg-kusikay-bg text-kusikay-text">
      <header className="sticky top-0 bg-kusikay-bg z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="py-6 flex justify-between items-center">
            <Link href="/" className="font-sue-ellen text-3xl text-kusikay-accent uppercase">
              KUSIKAY
            </Link>
            <nav>
              <ul className="flex space-x-4">
                {['contact'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item}`}
                      className="text-lg font-roboto relative overflow-hidden group"
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
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <FloatingButton />  {/* Asegúrate de que esta línea esté presente */}
    </div>
  )
}