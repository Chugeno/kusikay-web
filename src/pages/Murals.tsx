import Layout from './Layout'
import Image from 'next/image'

export default function Murals() {
  return (
    <Layout title="Murals">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src="/placeholder.svg?height=500&width=500"
            alt="Mural placeholder"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-klee text-2xl text-[#853C29] mb-4">Urban Art</h2>
          <p className="font-inter text-lg">
            These murals bring color and life to urban spaces, telling stories of community, nature, and cultural heritage. Each piece is designed to inspire and engage viewers in public spaces.
          </p>
        </div>
      </div>
    </Layout>
  )
}