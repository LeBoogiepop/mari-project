"use client"

import Image from "next/image"
import LanguageButton from "@/components/language-button"
import HeartParticles from "@/components/heart-particles"
import Header from "@/components/header"
import { useState } from "react"
import { Heart } from "lucide-react" // Import Heart icon

export default function MainPage() {
  const [triggerHearts, setTriggerHearts] = useState(false)
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [mouthOpen, setMouthOpen] = useState(false)

  const handleNavigate = () => {
    setTriggerHearts(true)
  }

  const handleLanguageChange = (languageIndex: number) => {
    setCurrentLanguageIndex(languageIndex)

    // Start speaking animation
    setIsSpeaking(true)

    // Animate mouth opening and closing 4 times (2 cycles)
    let animationCount = 0
    const maxAnimations = 4

    const animatemouth = () => {
      if (animationCount < maxAnimations) {
        setMouthOpen((prev) => !prev)
        animationCount++
        setTimeout(animatemouth, 150) // Change every 150ms
      } else {
        setIsSpeaking(false)
        setMouthOpen(false) // End with mouth closed
      }
    }

    // Start the animation
    setTimeout(animatemouth, 100)
  }

  // Get the appropriate image based on speaking state and mouth position
  const getPortraitImage = () => {
    if (isSpeaking) {
      // During speaking animation, alternate between normal and "mouth open" (alt) image
      return mouthOpen ? "/maxime-portrait-alt.png" : "/maxime-portrait.png"
    } else {
      // When not speaking, use normal image
      return "/maxime-portrait.png"
    }
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/drink-background.png" alt="Background" fill style={{ objectFit: "cover" }} priority />
      </div>

      {/* Grayscale Overlay */}
      <div className="absolute inset-0 bg-gray-800 opacity-60 z-10" />

      {/* Header with emoji */}
      <Header />

      {/* Main Button Content (centered) */}
      <div className="relative z-20 text-center">
        <LanguageButton onNavigate={handleNavigate} onHoverChange={() => {}} onLanguageChange={handleLanguageChange} />
      </div>

      {/* Speech bubble behind button */}
      <div className="absolute z-15 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Speech bubble */}
          <div className="absolute -inset-8 bg-white bg-opacity-20 rounded-full blur-sm"></div>
          <div className="absolute -inset-6 bg-white bg-opacity-30 rounded-full blur-md"></div>
        </div>
      </div>

      {/* Maxime's Portrait - positioned at bottom right of button */}
      <div className="absolute bottom-[15%] right-[20%] z-30 text-center">
        <Image
          src={getPortraitImage() || "/placeholder.svg"}
          alt="Maxime"
          width={150}
          height={150}
          className={`rounded-full border-4 border-white shadow-lg transition-all duration-100 ${
            isSpeaking ? "scale-105" : "scale-100"
          }`}
        />
        {/* Speaking indicator - now a heart! */}
        {isSpeaking && (
          <Heart className="absolute -top-2 -right-2 w-6 h-6 fill-heart-red text-heart-red animate-pulse" />
        )}
      </div>

      {/* Heart Particles */}
      <HeartParticles trigger={triggerHearts} />
    </div>
  )
}
