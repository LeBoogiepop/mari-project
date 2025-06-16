"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LoveButton() {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    try {
      const audio = new Audio("/pop.mp3")
      audio.crossOrigin = "anonymous" // Ensure CORS is handled for the audio
      audio.play().catch((e) => console.error("Audio playback failed:", e))
    } catch (e) {
      console.error("Error creating or playing audio:", e)
    }
  }

  return (
    <section className="py-12 text-center">
      <Button
        className={`relative text-xl md:text-2xl lg:text-3xl px-8 py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out
          ${clicked ? "bg-heart-red text-white animate-none" : "bg-mari-sky-blue text-off-white hover:animate-pulse"}
        `}
        onClick={handleClick}
        disabled={clicked}
      >
        {clicked ? "❤️" : "❤️ Clique ici si tu m'aimes aussi ❤️"}
        <span className="sr-only">Clique ici si tu m'aimes aussi</span>
      </Button>

      {clicked && (
        <div className="mt-8 text-2xl md:text-3xl font-semibold text-mari-brown space-y-4">
          <p>🇫🇷 Je t’aime</p>
          <p>🇬🇧 I love you</p>
          <p>🇷🇺 Я тебя люблю</p>
        </div>
      )}
    </section>
  )
}
