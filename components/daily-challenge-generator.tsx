"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Target, Eye, EyeOff } from "lucide-react"

const challenges = [
  "Send me a photo of you with a smile right now",
  "Write me a compliment that I've never heard before",
  "Tell me a bad joke until I laugh",
  "Send me a voice message singing your favorite song",
  "Take a selfie making the silliest face possible",
  "Write me a short poem about our relationship",
  "Send me a photo of your current view",
  "Tell me 3 things you're grateful for today",
  "Send me a picture of your favorite snack",
  "Write me a message using only emojis",
  "Take a photo of something that reminds you of me",
  "Send me your best pickup line",
  "Tell me about the best part of your day so far",
  "Send me a photo of your workspace/study area",
  "Write me a message in a different language",
]

export default function DailyChallengeGenerator() {
  const [isVisible, setIsVisible] = useState(false)

  // Get challenge based on current date (changes daily)
  const getDailyChallenge = () => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    return challenges[dayOfYear % challenges.length]
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl shadow-lg p-6 border-2 border-pink-200">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-pink-800 mb-4 flex items-center justify-center">
          <Target className="w-6 h-6 mr-2" />
          Daily Challenge
        </h3>

        <Button
          onClick={toggleVisibility}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center mx-auto"
        >
          {isVisible ? (
            <>
              <EyeOff className="w-5 h-5 mr-2" />
              Hide Challenge
            </>
          ) : (
            <>
              <Eye className="w-5 h-5 mr-2" />
              Show Challenge
            </>
          )}
        </Button>

        {isVisible && (
          <div className="mt-6 p-4 bg-white rounded-xl border-2 border-pink-300 shadow-inner">
            <p className="text-lg font-bold text-gray-800">"{getDailyChallenge()}"</p>
            <div className="mt-3 text-sm text-gray-500">🎯 New challenge every day!</div>
          </div>
        )}
      </div>
    </div>
  )
}
