import Image, { ImageProps } from 'next/image'

interface CustomImageProps extends Omit<ImageProps, 'src'> {
  src: string
}

const CustomImage = ({ src, alt, ...props }: CustomImageProps) => {
  const imageSrc = process.env.NODE_ENV === 'production'
    ? `https://tu-url-de-vercel-blob.com/${src}`
    : `/images/${src}`

  return <Image src={imageSrc} alt={alt} {...props} />
}

export default CustomImage
