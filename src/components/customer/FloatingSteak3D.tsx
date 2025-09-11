import Image from 'next/image'

export default function FloatingSteak3D() {
  return (
    <div className="w-[clamp(16rem,35vw,28rem)] h-[clamp(16rem,35vw,28rem)] ml-[clamp(2rem,4vw,5rem)]">
      <Image
        src="/images/steak.png"
        alt="Premium Steak"
        width={512}
        height={512}
        className="w-full h-full object-contain transform -rotate-12"
        priority
      />
    </div>
  )
}