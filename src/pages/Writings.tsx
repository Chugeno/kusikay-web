import Layout from './Layout'

export default function Writings() {
  return (
    <Layout title="Writings">
      <div className="prose prose-lg">
        <h2 className="font-klee text-2xl text-[#853C29] mb-4">Recent Thoughts</h2>
        <p className="font-inter">
          Here, you'll find a collection of my recent writings, reflections, and musings on art, culture, and the creative process. These pieces offer insight into my inspirations, challenges, and the stories behind my work.
        </p>
        <ul>
          <li>The Intersection of Traditional Crafts and Modern Art</li>
          <li>Finding Inspiration in Nature's Patterns</li>
          <li>The Role of Art in Community Building</li>
        </ul>
      </div>
    </Layout>
  )
}