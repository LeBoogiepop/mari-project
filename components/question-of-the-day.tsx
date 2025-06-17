"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HelpCircle, Eye, EyeOff } from "lucide-react"

const questions = [
  "send me ur top 3 musicians right now",
  "what's ur biggest fear that u never told anyone?",
  "if u could live anywhere in the world, where would it be?",
  "what's the weirdest dream u remember having?",
  "what's ur guilty pleasure that u're embarrassed about?",
  "if u could have dinner with anyone dead or alive, who?",
  "what's the most spontaneous thing u've ever done?",
  "what's ur favorite memory from childhood?",
  "if u had to eat one food for the rest of ur life, what?",
  "what's something u wish u were better at?",
  "what's the best compliment u've ever received?",
  "if u could change one thing about the world, what?",
]

export default function QuestionOfTheDay() {
  const [isVisible, setIsVisible] = useState(false)

  // Get question based on current date (changes daily)
  const getDailyQuestion = () => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    return questions[dayOfYear % questions.length]
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center justify-center">
          <HelpCircle className="w-6 h-6 mr-2" />
          Question of the Day
        </h3>

        <Button
          onClick={toggleVisibility}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center mx-auto"
        >
          {isVisible ? (
            <>
              <EyeOff className="w-5 h-5 mr-2" />
              Hide Question
            </>
          ) : (
            <>
              <Eye className="w-5 h-5 mr-2" />
              Show Question
            </>
          )}
        </Button>

        {isVisible && (
          <div className="mt-6 p-4 bg-white rounded-xl border-2 border-blue-300 shadow-inner">
            <p className="text-lg font-bold text-gray-800">"{getDailyQuestion()}"</p>
            <div className="mt-3 text-sm text-gray-500">💡 This question changes every day!</div>
          </div>
        )}
      </div>
    </div>
  )
}
