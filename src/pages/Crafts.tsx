import Layout from './Layout'
import Image from 'next/image'

export default function Crafts() {
  return (
    <Layout title="Crafts">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amulets-AbA0B5EnqR5JEJsjG5f3sr43MEflm9.jpeg"
            alt="Handcrafted amulet"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-klee text-2xl text-[#853C29] mb-4">Amulets</h2>
          <p className="font-inter text-lg">
            These handcrafted amulets are inspired by ancient traditions and natural forms. Each piece is carefully created to bring a sense of protection and connection to the wearer.
          </p>
        </div>
      </div>
    </Layout>
  )
}