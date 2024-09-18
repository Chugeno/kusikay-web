import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const translations = {
  en: {
    language: 'English',
    title: 'Illustrations',
    illustrations: 'Illustrations',
    crafts: 'Crafts',
    murals: 'Murals',
    writings: 'Writings',
    biography: 'Biography',
    contact: 'Contact',
    subtitle: 'Makers',
    description: 'This illustration series explores the concept of creation and the human spirit behind craftsmanship. Each piece tells a story of dedication, skill, and the beauty of handmade art.'
  },
  es: {
    language: 'Español',
    title: 'Ilustraciones',
    illustrations: 'Ilustraciones',
    crafts: 'Artesanías',
    murals: 'Murales',
    writings: 'Escritos',
    biography: 'Biografía',
    contact: 'Contacto',
    subtitle: 'Creadores',
    description: 'Esta serie de ilustraciones explora el concepto de creación y el espíritu humano detrás de la artesanía. Cada pieza cuenta una historia de dedicación, habilidad y la belleza del arte hecho a mano.'
  }
}

export default function Illustrations() {
  const [language, setLanguage] = useState('es')
  const t = translations[language]

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Klee+One:wght@400;600&family=Inter:wght@400;700&display=swap'
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
          <Link href="/" className="font-klee text-3xl text-[#853C29]">
            kusikay
          </Link>
          <nav>
            <ul className="flex space-x-4">
              {['illustrations', 'crafts', 'murals', 'writings', 'biography', 'contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item}`}
                    className="text-sm font-klee relative overflow-hidden group"
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
            className="px-3 py-1 rounded border border-[#523524] text-sm hover:bg-[#853C29] hover:text-[#F1D9D2] transition-colors duration-300"
          >
            {t.language}
          </button>
        </header>
        <main>
          <h1 className="font-klee text-4xl text-[#853C29] mb-8">{t.title}</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/makers-R9vrtcL1I07k8Fn327oKqLN9onnAl8.jpg"
                alt="Illustration of figures"
                width={500}
                height={700}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-klee text-2xl text-[#853C29] mb-4">{t.subtitle}</h2>
              <p className="font-inter text-lg">
                {t.description}
              </p>
            </div>
          </div>
        </main>
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Klee+One:wght@400;600&family=Inter:wght@400;700&display=swap');
        
        .font-klee {
          font-family: 'Klee One', cursive;
        }
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  )
}