'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import RestaurantFooter from '@/components/ui/RestaurantFooter'
import Navigation from '@/components/ui/Navigation'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {  

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  })

  return (
    <>
      <Navigation />
      
      <main className="grow">
        {children}
      </main>

      <RestaurantFooter />
    </>
  )
}
