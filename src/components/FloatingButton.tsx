import { useLanguage } from '../contexts/LanguageContext'
import Link from 'next/link'

const translations = {
  en: "Quote",
  es: "Cotización"
}

export default function FloatingButton() {
  const { language } = useLanguage()

  return (
    <Link href="/quotation">
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-kusikay-accent text-white rounded-full px-6 py-3 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          {translations[language as keyof typeof translations]}
        </div>
      </div>
    </Link>
  )
}