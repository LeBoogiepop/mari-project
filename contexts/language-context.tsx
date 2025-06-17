"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Language, Translations } from "@/types/app-types"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Translations = {
  fr: {
    "mari.title": "Mari the queen",
    "mari.subtitle": "for the love of my life",
    "mari.days": "ça fait *** que tu es ma copine 🎉",
    "coming.title": "Come back later le sang",
    "coming.subtitle": "Возвращайся позже, может, тебя тут ждёт сюрприз…",
    "coming.button": "you : 😾",
    "time.paris": "Heure de Paris",
    "time.busan": "Heure de Busan",
    "meeting.title": "PROCHAINE RENCONTRE",
    "meeting.date": "20 Juillet 2025",
    "meeting.days": "JOURS",
    "meeting.hours": "HEURES",
    "meeting.minutes": "MIN",
    "meeting.seconds": "SEC",
    "goals.title": "Goals Tracker",
  },
  en: {
    "mari.title": "Mari the queen",
    "mari.subtitle": "for the love of my life",
    "mari.days": "it's been *** since ur my girlfriend 🎉",
    "coming.title": "Come back later bro",
    "coming.subtitle": "Come back later, maybe there's a surprise waiting for you…",
    "coming.button": "you : 😾",
    "time.paris": "Paris Time",
    "time.busan": "Busan Time",
    "meeting.title": "NEXT MEETING",
    "meeting.date": "July 20th, 2025",
    "meeting.days": "DAYS",
    "meeting.hours": "HOURS",
    "meeting.minutes": "MIN",
    "meeting.seconds": "SEC",
    "goals.title": "Goals Tracker",
  },
  ru: {
    "mari.title": "Мари королева",
    "mari.subtitle": "для любви всей моей жизни",
    "mari.days": "прошло *** с тех пор, как ты моя девушка 🎉",
    "coming.title": "Возвращайся позже братан",
    "coming.subtitle": "Возвращайся позже, может, тебя тут ждёт сюрприз…",
    "coming.button": "ты : 😾",
    "time.paris": "Время в Париже",
    "time.busan": "Время в Пусане",
    "meeting.title": "СЛЕДУЮЩАЯ ВСТРЕЧА",
    "meeting.date": "20 июля 2025",
    "meeting.days": "ДНИ",
    "meeting.hours": "ЧАСЫ",
    "meeting.minutes": "МИН",
    "meeting.seconds": "СЕК",
    "goals.title": "Трекер Целей",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en") // Changé de "fr" à "en" pour l'anglais par défaut

  // La fonction 't' simple et efficace
  const t = (key: string): string => {
    const langTranslations = translations[language]
    return langTranslations[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
