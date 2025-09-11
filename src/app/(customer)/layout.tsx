import RestaurantFooter from '@/components/ui/RestaurantFooter'
import Navigation from '@/components/ui/Navigation'
import ClientAOS from '@/components/ui/ClientAOS'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <ClientAOS />
      <Navigation />
      
      <main className="flex-1">
        {children}
      </main>

      <RestaurantFooter />
    </div>
  )
}
