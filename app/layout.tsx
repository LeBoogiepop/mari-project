import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { LanguageProvider } from "@/contexts/language-context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://votre-site-mari.vercel.app'), // Ajoutez cette ligne avec l'URL de votre site
  title: "Pour Mari 💌 | Une lettre d'amour digitale",
  description:
    "Un site personnel créé avec amour par Maxime pour Mari, célébrant notre relation et nos moments précieux.",
  keywords: ["amour", "Mari", "Maxime", "lettre d'amour", "relation", "couple"],
  authors: [{ name: "Maxime" }],
  openGraph: {
    title: "Pour Mari 💌 | Une lettre d'amour digitale",
    description: "Un site personnel créé avec amour par Maxime pour Mari",
    images: [
      {
        url: "/placeholder.svg?height=600&width=1200",
        width: 1200,
        height: 600,
        alt: "Mari et Maxime",
      },
    ],
    type: "website",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-off-white font-sans antialiased", poppins.variable)}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
