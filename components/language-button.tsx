"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface LanguageButtonProps {
  onNavigate: () => void
  onHoverChange: (isHovered: boolean) => void
  onLanguageChange: (languageIndex: number) => void
}

export default function LanguageButton({ onNavigate, onHoverChange, onLanguageChange }: LanguageButtonProps) {
  const router = useRouter()
  const languages = ["Je t'aime", "I love you", "Я тебя люблю"]
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  const handleClick = () => {
    const newClickCount = clickCount + 1
    setClickCount(newClickCount)

    // Change language and image
    const newLanguageIndex = (currentLanguageIndex + 1) % languages.length
    setCurrentLanguageIndex(newLanguageIndex)
    onLanguageChange(newLanguageIndex)

    // Navigate after 3 clicks (one full cycle through all languages)
    if (newClickCount >= 3) {
      onNavigate()
      setTimeout(() => {
        router.push("/secondary-content")
      }, 2000)
    }
  }

  return (
    <div className="text-center">
      <Button
        className="relative text-2xl md:text-3xl lg:text-4xl px-10 py-5 md:px-12 md:py-6 lg:px-14 lg:py-7 rounded-full shadow-xl transition-all duration-300 ease-in-out text-white hover:scale-105 focus:outline-none focus:ring-4 focus:ring-heart-red focus:ring-opacity-50 bg-red-900 font-serif font-bold"
        onClick={handleClick}
      >
        {languages[currentLanguageIndex]}
        <span className="sr-only">Click to change language</span>
      </Button>

      {clickCount > 0 && clickCount < 3 && (
        <p className="text-white text-sm mt-2 opacity-70">Clique encore {3 - clickCount} fois pour continuer...</p>
      )}
    </div>
  )
}
