"use client"

import { useState } from "react"
import { Check, Target } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Goal {
  id: number
  text: string
  completed: boolean
}

export default function GoalsTracker() {
  const { language } = useLanguage()
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, text: "Finish this fucking paper with all ur friends", completed: false },
    { id: 2, text: "Powerpoint of each other", completed: false },
    { id: 3, text: "See full speed of each other", completed: false },
    { id: 4, text: "Play Minecraft", completed: false },
    { id: 5, text: "Playing flavored lip stick game", completed: false },
    { id: 6, text: "Live together", completed: false },
  ])

  const toggleGoal = (id: number) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)))
  }

  const completedCount = goals.filter((goal) => goal.completed).length
  const progressPercentage = (completedCount / goals.length) * 100

  const getTitle = () => {
    switch (language) {
      case "en":
        return "Goals Tracker"
      case "ru":
        return "Трекер Целей"
      default:
        return "Goals Tracker"
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-mari-brown flex items-center">
          <Target className="w-8 h-8 mr-3 text-heart-red" />
          {getTitle()}
        </h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-heart-red">
            {completedCount}/{goals.length}
          </div>
          <div className="text-sm text-gray-500">completed</div>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-heart-red to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Liste des objectifs */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`flex items-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${
              goal.completed
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-gray-50 border-gray-200 hover:border-heart-red hover:bg-red-50"
            }`}
            onClick={() => toggleGoal(goal.id)}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-300 ${
                goal.completed
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300 hover:border-heart-red hover:bg-heart-red hover:bg-opacity-10"
              }`}
            >
              {goal.completed && <Check className="w-4 h-4 text-white" />}
            </div>
            <span
              className={`text-lg font-medium transition-all duration-300 ${
                goal.completed ? "line-through opacity-75" : ""
              }`}
            >
              {goal.text}
            </span>
          </div>
        ))}
      </div>

      {/* Message de félicitations si tout est terminé */}
      {completedCount === goals.length && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-400 to-green-600 rounded-xl text-white text-center">
          <div className="text-2xl font-bold mb-2">🎉 Félicitations ! 🎉</div>
          <div className="text-lg">Tous les objectifs sont atteints !</div>
        </div>
      )}
    </div>
  )
}
