"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function MeetingCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const { t } = useLanguage()

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2025-07-20T00:00:00") // 20 juillet 2025
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-heart-red to-pink-500 rounded-2xl shadow-2xl p-8 text-center text-white">
      <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-wider">{t("meeting.title")}</h2>
      <div className="text-2xl md:text-3xl font-light mb-4">{t("meeting.date")}</div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <div className="bg-white bg-opacity-20 rounded-xl p-4 md:p-6">
          <div className="text-3xl md:text-5xl font-bold">{timeLeft.days}</div>
          <div className="text-sm md:text-lg font-medium opacity-80">{t("meeting.days")}</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-xl p-4 md:p-6">
          <div className="text-3xl md:text-5xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm md:text-lg font-medium opacity-80">{t("meeting.hours")}</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-xl p-4 md:p-6">
          <div className="text-3xl md:text-5xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm md:text-lg font-medium opacity-80">{t("meeting.minutes")}</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-xl p-4 md:p-6">
          <div className="text-3xl md:text-5xl font-bold">{timeLeft.seconds}</div>
          <div className="text-sm md:text-lg font-medium opacity-80">{t("meeting.seconds")}</div>
        </div>
      </div>
    </div>
  )
}
