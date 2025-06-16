"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

interface TimeLeft {
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function DayCounter() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const { t, language } = useLanguage()

  useEffect(() => {
    const calculateTimeLeft = () => {
      const startDate = new Date("2025-01-26") // 26 janvier 2025
      const now = new Date()
      const difference = now.getTime() - startDate.getTime()

      if (difference > 0) {
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44)) // Moyenne de jours par mois
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ months, days, hours, minutes, seconds })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTimeString = () => {
    const { months, days, hours, minutes, seconds } = timeLeft

    if (language === "fr") {
      return `${months} mois, ${days} jours, ${hours}h ${minutes}min ${seconds}s`
    } else if (language === "ru") {
      return `${months} мес., ${days} дн., ${hours}ч ${minutes}мин ${seconds}с`
    } else {
      return `${months} months, ${days} days, ${hours}h ${minutes}min ${seconds}s`
    }
  }

  const text = t("mari.days").replace("***", formatTimeString())

  return <p className="text-xl md:text-2xl text-gray-500 font-medium mt-4 font-mono">{text}</p>
}
