import Image from 'next/image'

type CustomImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function CustomImage({ src, alt, width, height, className }: CustomImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}