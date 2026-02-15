import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import Footer from "./_components/footer"
import AuthProvider from "./_providers/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FSW Barber - Seu Salão de Beleza e Barbearia Online",
  description:
    "Encontre as melhores barbearias e salões de beleza da sua região e reserve seu horário online. Agendamentos fáceis e rápidos.",
  keywords: [
    "barbearia",
    "salão",
    "agendamento",
    "beleza",
    "corte",
    "barbershop",
  ],
  authors: [{ name: "FSW Barber" }],
  openGraph: {
    title: "FSW Barber",
    description: "O melhor app para agendar sua barbearia",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        <AuthProvider>
          <div className="flex h-screen flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">{children}</div>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
