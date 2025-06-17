"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Heart, Sparkles } from "lucide-react"

// Liste unique de compliments sans traduction
const allCompliments: string[] = [
  "trop belle",
  "ur the love of my life",
  "jtm",
  "mon amour",
  "bebouuu",
  "ur so cute",
  "why are u so perfect wtf",
  "i think ur my type",
  "i love u",
  "я люблю тебя", // en cyrillique russe
  "je t'aime more than u",
  "i want to hug u",
  "miss u",
  "uh why aren't you with me ?",
  "hope u read all of that",
  "ur the best girlfriend",
  "i want to be with u",
  "i want u",
  "im tired of this intership",
  "im never tired of u",
]

export default function ComplimentGenerator() {
  const [currentCompliment, setCurrentCompliment] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  // État pour la liste mélangée et l'index actuel
  const [shuffledCompliments, setShuffledCompliments] = useState<string[]>([])
  const complimentIndexRef = useRef(0) // Utiliser useRef pour l'index pour éviter les dépendances dans useEffect

  // Fonction pour mélanger les compliments (algorithme de Fisher-Yates)
  const shuffleArray = useCallback((array: string[]) => {
    let currentIndex = array.length,
      randomIndex

    // Tant qu'il reste des éléments à mélanger.
    while (currentIndex !== 0) {
      // Choisir un élément restant.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // Et l'échanger avec l'élément actuel.
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
  }, [])

  // Initialiser la liste mélangée au premier rendu
  useEffect(() => {
    setShuffledCompliments(shuffleArray([...allCompliments]))
  }, [shuffleArray])

  const getNextCompliment = useCallback(() => {
    let currentShuffled = shuffledCompliments

    // Si l'index dépasse la taille de la liste, remélanger et réinitialiser l'index
    if (complimentIndexRef.current >= currentShuffled.length) {
      currentShuffled = shuffleArray([...allCompliments])
      setShuffledCompliments(currentShuffled)
      complimentIndexRef.current = 0
    }

    const compliment = currentShuffled[complimentIndexRef.current]
    complimentIndexRef.current++
    return compliment
  }, [shuffledCompliments, shuffleArray])

  useEffect(() => {
    // Initialiser le premier compliment
    if (shuffledCompliments.length > 0 && currentCompliment === "") {
      setCurrentCompliment(getNextCompliment())
    }
  }, [shuffledCompliments, currentCompliment, getNextCompliment])

  const handleMouseEnter = () => {
    setIsVisible(true)
    setCurrentCompliment(getNextCompliment()) // Obtenir le prochain compliment non répété
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <div
        className={`relative transition-all duration-500 ease-out cursor-pointer ${
          isVisible ? "transform translate-x-0" : "transform translate-x-[calc(100%-60px)]"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Languette principale */}
        <div
          className={`bg-gradient-to-r from-pink-400 to-heart-red rounded-l-2xl shadow-2xl flex items-center transition-all duration-500 ${
            isVisible ? "w-80 h-20 px-6" : "w-16 h-16 px-4"
          }`}
        >
          {/* Icône toujours visible */}
          <div className="flex-shrink-0">
            {isVisible ? (
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            ) : (
              <Heart className="w-6 h-6 text-white animate-pulse" />
            )}
          </div>

          {/* Contenu qui apparaît au survol */}
          <div
            className={`ml-4 text-white transition-all duration-500 ${
              isVisible ? "opacity-100 transform translate-x-0" : "opacity-0 transform translate-x-4"
            }`}
          >
            <div className="text-sm font-medium opacity-80">💕 Pour Mari</div>
            <div className="text-lg font-bold">{currentCompliment}</div>
          </div>
        </div>

        {/* Petit indicateur pour montrer qu'on peut hover */}
        {!isVisible && (
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-8 bg-pink-300 rounded-l-full opacity-60 animate-pulse" />
          </div>
        )}
      </div>

      {/* Petites particules qui apparaissent au survol */}
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-4 w-2 h-2 bg-pink-300 rounded-full animate-ping opacity-75" />
          <div className="absolute bottom-3 right-8 w-1 h-1 bg-white rounded-full animate-ping opacity-75 animation-delay-300" />
          <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-pink-200 rounded-full animate-ping opacity-75 animation-delay-500" />
        </div>
      )}
    </div>
  )
}
