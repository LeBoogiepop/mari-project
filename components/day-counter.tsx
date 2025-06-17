"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import DayNightGlobe from "./day-night-globe"

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
  const [parisTime, setParisTime] = useState("")
  const [busanTime, setBusanTime] = useState("")
  const { t, language } = useLanguage()

  useEffect(() => {
    const calculateAndSetTimes = () => {
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

      // Mettre à jour les heures de Paris et Busan
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Format 24h
      }

      setParisTime(
        now.toLocaleTimeString(language === "fr" ? "fr-FR" : "en-US", { ...options, timeZone: "Europe/Paris" }),
      )
      setBusanTime(
        now.toLocaleTimeString(language === "fr" ? "fr-FR" : "en-US", { ...options, timeZone: "Asia/Seoul" }),
      )
    }

    calculateAndSetTimes() // Appel initial
    const timer = setInterval(calculateAndSetTimes, 1000) // Mise à jour chaque seconde

    return () => clearInterval(timer)
  }, [language]) // Dépendance à 'language' pour que les formats d'heure se mettent à jour

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

  const daysText = t("mari.days").replace("***", formatTimeString())

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-xl md:text-2xl text-gray-500 font-medium mt-4 font-mono">{daysText}</p>
      <div className="mt-2 text-lg md:text-xl text-gray-600 font-mono space-y-1">
        <p>
          {t("time.paris")}: {parisTime}
        </p>
        <p>
          {t("time.busan")}: {busanTime}
        </p>
      </div>

      {/* Globe Widget - Prend toute la largeur */}
      <DayNightGlobe />
    </div>
  )
}
