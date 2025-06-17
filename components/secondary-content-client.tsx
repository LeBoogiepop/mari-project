"use client"

import Header from "@/components/header"
import LanguageSelector from "@/components/language-selector"
import DayCounter from "@/components/day-counter"
import MeetingCountdown from "@/components/meeting-countdown"
import LoveClicker from "@/components/love-clicker"
import GoalsTracker from "@/components/goals-tracker"
import ComplimentGenerator from "@/components/compliment-generator"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import DailyWidgets from "@/components/daily-widgets"

export default function SecondaryContentClient() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-off-white py-10 px-4 sm:px-6 lg:px-8">
      <Header />
      <LanguageSelector />

      <main className="max-w-4xl mx-auto space-y-12">
        {/* En-tête avec titre, sous-titre et compteur de jours */}
        <div className="text-center">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-bold text-mari-brown mb-3 relative z-10">{t("mari.title")}</h1>
            <div className="absolute -top-16 -right-12 md:-top-8 md:-right-16 z-0">
              <Image
                src="/mari-crown.png"
                alt="Crown"
                width={120}
                height={120}
                className="transform rotate-12 opacity-70"
                priority // Ajout de priority pour cette image above-the-fold
              />
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-500 font-light italic mb-2">{t("mari.subtitle")}</p>
          <DayCounter />
        </div>

        {/* Compte à rebours pour la prochaine rencontre */}
        <MeetingCountdown />

        {/* Compteur de Clics "Je t'aime" */}
        <LoveClicker />

        {/* Daily Widgets - Question et Challenge */}
        <DailyWidgets />

        {/* Goals Tracker */}
        <GoalsTracker />
      </main>

      {/* Compliment Generator - Position fixe en bas à droite */}
      <ComplimentGenerator />
    </div>
  )
}
