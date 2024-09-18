import Layout from './Layout'

export default function Contact() {
  return (
    <Layout title="Contact">
      <div className="max-w-md mx-auto">
        <p className="font-inter text-lg mb-4">
          Get in touch with me for collaborations, commissions, or just to say hello!
        </p>
        <ul className="space-y-2">
          <li className="font-inter">
            <strong className="font-klee">Email:</strong> contact@kusikay.com.ar
          </li>
          <li className="font-inter">
            <strong className="font-klee">Instagram:</strong> @kusikay_art
          </li>
        </ul>
      </div>
    </Layout>
  )
}