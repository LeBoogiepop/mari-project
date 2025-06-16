"use client"

import { useLanguage } from "@/contexts/language-context"

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: "fr" as const, flag: "🇫🇷", name: "Français" },
    { code: "en" as const, flag: "🇬🇧", name: "English" },
    { code: "ru" as const, flag: "🇷🇺", name: "Русский" },
  ]

  return (
    <div className="absolute top-4 right-4 z-20">
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`text-2xl p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              language === lang.code ? "bg-white bg-opacity-20 scale-110" : "bg-white bg-opacity-10 hover:bg-opacity-20"
            }`}
            title={lang.name}
          >
            {lang.flag}
          </button>
        ))}
      </div>
    </div>
  )
}
