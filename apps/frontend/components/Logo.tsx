import Image from 'next/image'

export default function Logo() {
  return (
    <h2 className="logo w-14 h-14 inline-flex items-center justify-center">
      <Image src={'/logo71x71.png'} width={50} height={50} alt="Logo" />
    </h2>
  )
}
