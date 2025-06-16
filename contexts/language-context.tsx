"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "fr" | "en" | "ru"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    "mari.title": "Mari the queen",
    "mari.subtitle": "for the love of my life",
    "mari.days": "ça fait *** que tu es ma copine 🎉",
    "coming.title": "Come back later le sang",
    "coming.subtitle": "Возвращайся позже, может, тебя тут ждёт сюрприз…",
    "coming.button": "you : 😾",
    "song.title": "Notre Chanson",
    "song.description": "La mélodie de nos cœurs...",
    "song.fallback": "Ton navigateur ne supporte pas l'élément audio.",
  },
  en: {
    "mari.title": "Mari the queen",
    "mari.subtitle": "for the love of my life",
    "mari.days": "it's been *** since ur my girlfriend 🎉",
    "coming.title": "Come back later bro",
    "coming.subtitle": "Come back later, maybe there's a surprise waiting for you…",
    "coming.button": "you : 😾",
    "song.title": "Our Song",
    "song.description": "The melody of our hearts...",
    "song.fallback": "Your browser does not support the audio element.",
  },
  ru: {
    "mari.title": "Мари королева",
    "mari.subtitle": "для любви всей моей жизни",
    "mari.days": "прошло *** с тех пор, как ты моя девушка 🎉",
    "coming.title": "Возвращайся позже братан",
    "coming.subtitle": "Возвращайся позже, может, тебя тут ждёт сюрприз…",
    "coming.button": "ты : 😾",
    "song.title": "Наша Песня",
    "song.description": "Мелодия наших сердец...",
    "song.fallback": "Ваш браузер не поддерживает аудио элемент.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr") // Default to French

  // La fonction 't' simple et efficace
  const t = (key: string): string => {
    const langTranslations = translations[language]
    // @ts-ignore
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
