import { useLanguage } from '../contexts/LanguageContext'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { GetStaticProps } from 'next'

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'] })

interface Writing {
  id: string
  title: {
    en: string
    es: string
  }
}

interface WritingsProps {
  writings: Writing[]
}

const translations = {
  en: { title: 'WRITINGS' },
  es: { title: 'ESCRITOS' },
}

export default function Writings({ writings }: WritingsProps) {
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations]
  const [positions, setPositions] = useState<{ x: number; y: number; rotate: number; fontSize: number }[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const generatePositions = () => {
      if (!containerRef.current) return []

      const containerRect = containerRef.current.getBoundingClientRect()
      const centerX = containerRect.width * 0.3 // Moved 20% to the left
      const centerY = containerRect.height / 2
      const radius = Math.min(containerRect.width, containerRect.height) * 0.3 // 30% for more spread

      return writings.map(() => {
        const angle = Math.random() * Math.PI * 2 // Random angle
        const distance = Math.sqrt(Math.random()) * radius // Square root for more uniform distribution

        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance
        const rotate = Math.random() * 20 - 10 // -10 to 10 degrees
        const fontSize = Math.random() * 24 + 16 // 16px to 40px

        return { x, y, rotate, fontSize }
      })
    }

    setPositions(generatePositions())

    const handleResize = () => {
      setPositions(generatePositions())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [writings, language])

  const getHoverFontSize = (originalSize: number) => {
    const increaseFactor = 1.5
    const maxSize = 60
    return Math.min(originalSize * increaseFactor, maxSize)
  }

  return (
    <Layout>
      <h1 className={`${robotoCondensed.className} text-4xl text-center mb-8`}>{t.title}</h1>
      <div ref={containerRef} className="relative h-[60vh] w-full mx-auto overflow-hidden">
        {writings.map((writing, index) => (
          <motion.div
            key={writing.id}
            className="absolute whitespace-nowrap"
            style={{
              left: positions[index]?.x,
              top: positions[index]?.y,
              fontSize: `${positions[index]?.fontSize}px`,
              transform: `translate(-50%, -50%) rotate(${positions[index]?.rotate}deg)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.25,
              x: hoveredIndex === index ? 0 : [0, 10, -10, 0],
              y: hoveredIndex === index ? 0 : [0, -10, 10, 0],
              scale: hoveredIndex === index ? 1.1 : 1,
              fontSize: hoveredIndex === index ? getHoverFontSize(positions[index]?.fontSize) : positions[index]?.fontSize,
            }}
            transition={{ 
              opacity: { duration: 0.3 },
              x: { repeat: Infinity, duration: 5 + index, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 7 + index, ease: "easeInOut" },
              scale: { duration: 0.3 },
              fontSize: { duration: 0.3 },
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link href={`/writings/${writing.id}`} className="text-kusikay-accent hover:text-kusikay-text transition-colors duration-300">
              {writing.title[language as keyof typeof writing.title]}
            </Link>
          </motion.div>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const writingsDirectory = path.join(process.cwd(), 'public/writings')
  const filenames = fs.readdirSync(writingsDirectory)

  const writings = filenames.map(filename => {
    const filePath = path.join(writingsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
      id: filename.replace(/\.md$/, ''),
      title: data.title
    }
  })

  return {
    props: {
      writings
    }
  }
}