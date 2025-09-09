'use client'

import Image from 'next/image'

export default function FloatingSteak3D() {
  return (
    <div className="w-[28rem] h-[28rem] -ml-8">
      <Image
        src="/images/steak.png"
        alt="Premium Steak"
        width={448}
        height={448}
        className="w-full h-full object-contain transform -rotate-12"
      />
    </div>
  )
}