import Layout from './Layout'
import Image from 'next/image'

export default function Biography() {
  return (
    <Layout title="Biography">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src="/placeholder.svg?height=500&width=500"
            alt="Mercedes Ducos portrait"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-klee text-2xl text-[#853C29] mb-4">About Mercedes Ducos</h2>
          <p className="font-inter text-lg">
            Mercedes Ducos, known artistically as Kusikay, is a multidisciplinary artist whose work spans illustration, crafts, and murals. Drawing inspiration from her cultural heritage and the natural world, Mercedes creates pieces that bridge traditional techniques with contemporary expressions.
          </p>
          <p className="font-inter text-lg mt-4">
            Her journey as an artist began in [placeholder year] and has since taken her across [placeholder locations], where she has honed her skills and developed her unique artistic voice.
          </p>
        </div>
      </div>
    </Layout>
  )
}