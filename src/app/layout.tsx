import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { CartProvider } from "@/contexts/CartContext";
import AOSInit from "@/components/ui/AOSInit";

const aspekta = localFont({
  src: [
    {
      path: '../../public/fonts/Aspekta-350.woff2',
      weight: '350',
    },
    {
      path: '../../public/fonts/Aspekta-400.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/Aspekta-450.woff2',
      weight: '450',
    },
    {
      path: '../../public/fonts/Aspekta-500.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/Aspekta-550.woff2',
      weight: '550',
    },
    {
      path: '../../public/fonts/Aspekta-700.woff2',
      weight: '700',
    },                     
  ],
  variable: '--font-aspekta',
  display: 'swap',  
});

export const metadata: Metadata = {
  title: "Delicious Bites - Premium Restaurant Experience",
  description: "Experience exceptional dining with our carefully crafted menu and seamless ordering system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${aspekta.variable} font-aspekta antialiased bg-white text-gray-800 font-[350]`}>
        <AOSInit />
        <div className="flex flex-col min-h-screen overflow-hidden">
          <SessionProvider>
            <QueryProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </QueryProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
