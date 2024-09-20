import { useLanguage } from '../../contexts/LanguageContext'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'
import { Roboto_Condensed } from 'next/font/google'
import { GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'] })

interface WritingProps {
  title: {
    en: string
    es: string
  }
  content: {
    en: string
    es: string
  }
}

export default function Writing({ title, content }: WritingProps) {
  const { language } = useLanguage()

  return (
    <Layout>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${robotoCondensed.className} text-4xl md:text-5xl text-kusikay-accent mb-8 text-center font-bold`}
      >
        {title[language as keyof typeof title]}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="prose prose-lg mx-auto max-w-3xl px-4 md:px-0"
      >
        <ReactMarkdown 
          className="text-kusikay-text [&>p]:mb-6 [&>p:last-child]:mb-0"
          components={{
            p: ({ node, ...props }) => <p className="mb-6 last:mb-0" {...props} />
          }}
        >
          {content[language as keyof typeof content]}
        </ReactMarkdown>
      </motion.div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const writingsDirectory = path.join(process.cwd(), 'public/writings')
  const filenames = fs.readdirSync(writingsDirectory)

  const paths = filenames.map(filename => ({
    params: { id: filename.replace(/\.md$/, '') }
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), 'public/writings', `${params?.id}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    props: {
      title: data.title,
      content: data.content
    }
  }
}