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
  title: "For Mari 💌",
  description: "A special website for Mari, from Maxime.",
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
