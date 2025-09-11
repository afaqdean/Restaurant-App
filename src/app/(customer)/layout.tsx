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
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1">
        {children}
      </main>

      <RestaurantFooter />
    </div>
  )
}
