"use client"

import { useState } from "react"
import { Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ClickMessage {
  min: number
  max: number
  message: string
}

const clickMessages: ClickMessage[] = [
  { min: 0, max: 10, message: "just say u don't love me..." },
  { min: 10, max: 20, message: "meme pas un peu ?" },
  { min: 20, max: 30, message: "okay it's like jtm" },
  { min: 30, max: 40, message: "are u rlly clicking that much?" },
  { min: 40, max: 50, message: "wow ur rlly wasting ur time on that button haha" },
  { min: 50, max: 60, message: "don't u have exam?" },
  { min: 60, max: 70, message: "im in love i think" },
  { min: 70, max: 80, message: "did u see the compliment stuff in that website?" },
  { min: 80, max: 90, message: "nearlyy the enddddd" },
  { min: 90, max: 99, message: "i love u a lot" },
  {
    min: 100,
    max: 999,
    message: "bravoooo ur trully the love of my life then i cant do anything about it now u won mon coeur",
  },
]

export default function LoveClicker() {
  const [clickCount, setClickCount] = useState(0)
  const [showHearts, setShowHearts] = useState(false)

  const getCurrentMessage = () => {
    for (const messageObj of clickMessages) {
      if (clickCount >= messageObj.min && clickCount < messageObj.max) {
        return messageObj.message
      }
    }
    return clickMessages[clickMessages.length - 1].message // Message final pour 100+
  }

  const handleClick = () => {
    setClickCount((prev) => prev + 1)

    // Animation de cœurs à certains paliers
    if (clickCount % 10 === 9 || clickCount === 99) {
      setShowHearts(true)
      setTimeout(() => setShowHearts(false), 2000)
    }
  }

  const getButtonColor = () => {
    if (clickCount >= 100) return "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
    if (clickCount >= 80) return "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
    if (clickCount >= 60)
      return "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
    if (clickCount >= 40) return "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
    if (clickCount >= 20) return "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
    return "bg-gradient-to-r from-heart-red to-pink-500 hover:from-red-600 hover:to-pink-600"
  }

  const getProgressPercentage = () => {
    return Math.min((clickCount / 100) * 100, 100)
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-mari-brown mb-6 flex items-center justify-center">
          <Heart className="w-8 h-8 mr-3 text-heart-red" />
          "I Love You" Click Counter
        </h2>

        {/* Compteur principal */}
        <div className="mb-6">
          <div className="text-4xl md:text-5xl font-bold text-heart-red mb-2">{clickCount}</div>
          <div className="text-lg text-gray-600">{clickCount === 1 ? "click" : "clicks"}</div>
        </div>

        {/* Barre de progression vers 100 */}

        {/* Bouton principal */}
        <Button
          onClick={handleClick}
          className={`text-2xl md:text-3xl px-8 py-6 md:px-12 md:py-8 rounded-full shadow-xl transition-all duration-300 ease-in-out text-white font-bold transform hover:scale-105 active:scale-95 ${getButtonColor()}`}
        >
          <Heart className="w-6 h-6 mr-3 fill-current" />
          Je t'aime
          <Heart className="w-6 h-6 ml-3 fill-current" />
        </Button>

        {/* Message selon le palier - EN GRAS au lieu d'italique */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
          <div className="text-lg md:text-xl font-bold text-gray-700">"{getCurrentMessage()}"</div>
          {clickCount >= 100 && (
            <div className="mt-4 flex justify-center">
              <Sparkles className="w-8 h-8 text-yellow-500 animate-spin" />
            </div>
          )}
        </div>

        {/* Section "Prochain palier" supprimée comme demandé */}
      </div>

      {/* Animation de cœurs */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {[...Array(20)].map((_, i) => (
            <Heart
              key={i}
              className="absolute fill-heart-red text-heart-red animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 15}px`,
                height: `${Math.random() * 20 + 15}px`,
                animationDelay: `${Math.random() * 1000}ms`,
                animationDuration: `${Math.random() * 1000 + 1000}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
