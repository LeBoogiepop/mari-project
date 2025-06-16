"use client"

import Header from "@/components/header"
import LanguageSelector from "@/components/language-selector"
import DayCounter from "@/components/day-counter"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Music2 } from "lucide-react"

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
              />
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-500 font-light italic mb-2">{t("mari.subtitle")}</p>
          <DayCounter />
        </div>

        {/* Section Notre Chanson (la seule qui reste) */}
        <Card className="shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-mari-brown flex items-center">
              <Music2 className="w-8 h-8 mr-3 text-heart-red" />
              {t("song.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{t("song.description")}</p>
            <audio controls className="w-full rounded-md shadow-sm">
              <source src="/our-song.mp3" type="audio/mpeg" />
              {t("song.fallback")}
            </audio>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
