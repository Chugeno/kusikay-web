import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

const translations = {
  en: {
    language: 'English',
    title: 'Quotation',
    subtitle: 'Request a quote for your project',
    customerInfo: 'Customer Information',
    fullName: 'Full name',
    phoneNumber: 'Phone number',
    email: 'Email',
    ventureDescription: 'Description of the Venture',
    ventureAbout: 'What is your venture about?',
    productsServices: 'What are the products or services you offer?',
    targetAudience: 'Who are you targeting?',
    slogan: 'Do you have a slogan or words that identify you?',
    socialNetworks: 'Social networks',
    illustrationUse: 'Use of Illustration',
    illustrationUseOptions: {
      logo: 'Logo. Image or identity of the brand and/or company.',
      flyer: 'Flyer. Promotion and/or campaign with a defined duration.',
      socialMedia: 'Publication in social networks (feed).',
      socialMediaPack: 'Pack of elements for publications on social networks (feed).',
      instagramStory: 'Story on Instagram.',
      packaging: 'Product packaging.',
      reproduction: 'For constant reproduction inside a paid product (clothing, accessories, stickers, music album, digital or physical book cover).',
    },
    contentMessage: 'Content or Message',
    contentMessageDescription: 'This is not about describing the exact idea or characters, but what is the message you would like to communicate.',
    contentMessageExample: 'Example: I would like the image to convey peace, calm, silence. Something meditative and healing but not the typical image of a meditating Buddha.',
    contentMessageQuestion: 'What do you want the illustration to communicate?',
    keywords: 'Key Words',
    keywordsDescription: 'Describe 5 characteristics or feelings you want this work to convey:',
    keywordsExample: 'Example: beachy, relaxed, tropical, fruity, tasty.',
    style: 'Style',
    styleDescription: 'The idea is that you can choose, within my work, between 3 and 5 reference images so I understand what kind of image you would like to achieve. For that you can look at my social networks:',
    graphicElements: 'Graphic Elements',
    graphicElementsOptions: {
      harmony: 'I have graphic elements of my venture and I want to continue in harmony with that line.',
      change: 'I have graphic elements but I am looking for a change from that aesthetic.',
      create: 'I don\'t have them and I want to create them.',
    },
    text: 'Text',
    textDescription: 'In case the illustration is accompanied by text, write here the exact word(s):',
    deliveryDate: 'Delivery Date',
    deliveryDateQuestion: 'On what date do you need the final delivery of the illustration:',
    importantInfo: 'Important Information',
    importantInfoQuestion: 'Is there anything else I haven\'t asked that needs to be considered for the project?',
    submit: 'Submit Quotation Request',
  },
  es: {
    language: 'Español',
    title: 'Cotización',
    subtitle: 'Solicita una cotización para tu proyecto',
    customerInfo: 'Información del Cliente',
    fullName: 'Nombre completo',
    phoneNumber: 'Número de teléfono',
    email: 'Correo electrónico',
    ventureDescription: 'Descripción del Emprendimiento',
    ventureAbout: '¿De qué trata tu emprendimiento?',
    productsServices: '¿Cuáles son los productos o servicios que ofreces?',
    targetAudience: '¿A quién te diriges?',
    slogan: '¿Tienes un eslogan o palabras que te identifiquen?',
    socialNetworks: 'Redes sociales',
    illustrationUse: 'Uso de la Ilustración',
    illustrationUseOptions: {
      logo: 'Logo. Imagen o identidad de la marca y/o empresa.',
      flyer: 'Flyer. Promoción y/o campaña con una duración definida.',
      socialMedia: 'Publicación en redes sociales (feed).',
      socialMediaPack: 'Pack de elementos para publicaciones en redes sociales (feed).',
      instagramStory: 'Historia en Instagram.',
      packaging: 'Empaque de producto.',
      reproduction: 'Para reproducción constante dentro de un producto de pago (ropa, accesorios, stickers, álbum de música, portada de libro digital o físico).',
    },
    contentMessage: 'Contenido o Mensaje',
    contentMessageDescription: 'Esto no se trata de describir la idea exacta o los personajes, sino qué mensaje te gustaría comunicar.',
    contentMessageExample: 'Ejemplo: Me gustaría que la imagen transmita paz, calma, silencio. Algo meditativo y sanador pero no la típica imagen de un Buda meditando.',
    contentMessageQuestion: '¿Qué quieres que comunique la ilustración?',
    keywords: 'Palabras Clave',
    keywordsDescription: 'Describe 5 características o sentimientos que quieres que este trabajo transmita:',
    keywordsExample: 'Ejemplo: playero, relajado, tropical, frutal, sabroso.',
    style: 'Estilo',
    styleDescription: 'La idea es que puedas elegir, dentro de mi trabajo, entre 3 y 5 imágenes de referencia para que entienda qué tipo de imagen te gustaría lograr. Para eso puedes mirar mis redes sociales:',
    graphicElements: 'Elementos Gráficos',
    graphicElementsOptions: {
      harmony: 'Tengo elementos gráficos de mi emprendimiento y quiero continuar en armonía con esa línea.',
      change: 'Tengo elementos gráficos pero busco un cambio de esa estética.',
      create: 'No los tengo y quiero crearlos.',
    },
    text: 'Texto',
    textDescription: 'En caso de que la ilustración vaya acompañada de texto, escribe aquí la(s) palabra(s) exacta(s):',
    deliveryDate: 'Fecha de Entrega',
    deliveryDateQuestion: '¿En qué fecha necesitas la entrega final de la ilustración?',
    importantInfo: 'Información Importante',
    importantInfoQuestion: '¿Hay algo más que no haya preguntado que deba considerarse para el proyecto?',
    submit: 'Enviar Solicitud de Cotización',
  }
}

export default function Quotation() {
  const [language, setLanguage] = useState('es')
  const t = translations[language]
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [date, setDate] = useState(new Date())

  const onSubmit = async (data) => {
    const response = await fetch('https://formspree.io/f/your-form-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      // Handle successful submission
      console.log('Form submitted successfully')
    } else {
      // Handle error
      console.error('Form submission failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#F1D9D2] text-[#523524]">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <Link href="/" className="font-klee text-3xl text-[#853C29]">
            kusikay
          </Link>
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="px-4 py-2 rounded border border-[#523524] text-sm hover:bg-[#853C29] hover:text-[#F1D9D2] transition-colors duration-300 font-klee"
          >
            {t.language}
          </button>
        </header>
        <main>
          <h1 className="font-klee text-4xl text-[#853C29] mb-4">{t.title}</h1>
          <p className="font-inter text-lg mb-8">{t.subtitle}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <section>
              <h2 className="font-klee text-2xl text-[#853C29] mb-4">{t.customerInfo}</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">{t.fullName}</Label>
                  <Input id="fullName" {...register('fullName', { required: true })} />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">{t.phoneNumber}</Label>
                  <Input id="phoneNumber" {...register('phoneNumber', { required: true })} />
                </div>
                <div>
                  <Label htmlFor="email">{t.email}</Label>
                  <Input id="email" type="email" {...register('email', { required: true })} />
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-klee text-2xl text-[#853C29] mb-4">{t.ventureDescription}</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ventureAbout">{t.ventureAbout}</Label>
                  <Textarea id="ventureAbout" {...register('ventureAbout', { required: true })} />
                </div>
                <div>
                  <Label htmlFor="productsServices">{t.productsServices}</Label>
                  <Textarea id="productsServices" {...register('productsServices', { required: true })} />
                </div>
                <div>
                  <Label htmlFor="targetAudience">{t.targetAudience}</Label>
                  <Input id="targetAudience" {...register('targetAudience', { required: true })} />
                </div>
                <div>
                  <Label htmlFor="slogan">{t.slogan}</Label>
                  <Input id="slogan" {...register('slogan')} />
                </div>
                <div>
                  <Label htmlFor="socialNetworks">{t.socialNetworks}</Label>
                  <Input id="socialNetworks" {...register('socialNetworks')} />
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-klee text-2xl text-[#853C29] mb-4">{t.illustrationUse}</h2>
              <div className="space-y-2">
                {Object.entries(t.illustrationUseOptions).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox id={key} {...register('illustrationUse')} />
                    <Label htmlFor={key}>{value}</Label>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-klee text-2xl text-[#853C29] mb-4">{t.contentMessage}</h2>
              <p className="font-inter text-sm mb-2">{t.contentMessageDescription}</p>
              <p className="font-inter text-sm italic mb-4">{t.contentMessageExample}</p>
              <Textarea {...register('contentMessage', { required: true })} placeholder={t.contentMessageQuestion} />
            </section>

            <section>
              <h2 className="font-klee text-2xl text-[#853C29] mb-4">{t.keywords}</h2>
              <p className="font-inter text-sm mb-2">{t.keywordsDescription}</p>
              <p className="font-inter text-sm italic mb-4">{t.keywordsExample}</p>
              <Input {...register('keywords', { required: true })} placeholder="Keyword 1, Keyword 2, Keyword 3, Keyword 4, Keyword 5" />
            </section>

            <section>
              <h2 className="font-klee text-2xl text-[#853C29] mb-4">{t.style}</h2>
              <p className="font-inter text-sm mb-4">{t.styleDescription}</p>
              <div className="flex space-x-4">
                <a href="https://www.behance.net/mercedesducos" target="_blank" rel="noopener noreferrer" className="text-[#853C29] hover:underline">Behance</a>
                <a href="https://www.instagram.com/kusikay.art" target="_blank" rel="noopener noreferrer" className="text-[#853C29] hover:underline">Instagram</a>
              </div>
              <Input type="file" multiple {...register('styleReferences')} className="mt-4" />
            </section>

            <section>
              <h2 className="font-klee text-2xl text-[#853C29] mb-4">{t.graphicElements}</h2>
              <RadioGroup defaultValue="create">
                {Object.entries(t.graphicElementsOptions).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem value={key} id={key} {...register('graphicElements')} />
                    <Label htmlFor={key}>{value}</Label>
                  </div>
                ))}
              </RadioGroup>
              <Input type="file" {...register('graphicElementsFile')} className="mt-4" />
            </section>

            <section>
              <h2 className="font-klee text-2xl text-[#853C29] mb-4">{t.text}</h2>
              <p className="font-inter text-sm mb-4">{t.textDescription}</p>
              <Input {...register('text')} />
            </section>

            <section>
              <h2 className="font-klee text-2xl text-[#853C29] mb-4">{t.deliveryDate}</h2>
              <p className="font-inter text-sm mb-4">{t.deliveryDateQuestion}</p>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </section>

            <section>
              <h2 className="font-klee text-2xl text-[#853C29] mb-4">{t.importantInfo}</h2>
              <Textarea {...register('importantInfo')} placeholder={t.importantInfoQuestion} />
            </section>

            <Button type="submit" className="w-full bg-[#853C29] hover:bg-[#6A2F21] text-white">
              {t.submit}
            </Button>
          </form>
        </main>
      </div>
    </div>
  )
}