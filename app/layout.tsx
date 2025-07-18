import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Campus SSCT – Les Acteurs',
  description: 'Une carte interactive pour découvrir les acteurs de la santé, sécurité et conditions de travail au sein de l’entreprise.',
  generator: 'Créé dans le cadre du Campus SSCT interactif',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
