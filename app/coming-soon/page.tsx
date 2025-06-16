"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Construction } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import LanguageSelector from "@/components/language-selector"

export default function ComingSoonPage() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 font-sans relative">
      <LanguageSelector />

      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        <Construction className="w-16 h-16 mx-auto mb-6 text-yellow-400" />

        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("coming.title")}</h1>

        <div className="w-16 h-1 bg-yellow-400 mx-auto my-4"></div>

        <p className="text-gray-300 mb-8">{t("coming.subtitle")}</p>

        <Button
          onClick={() => router.push("/")}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-full transition-all duration-300"
        >
          {t("coming.button")}
        </Button>
      </div>
    </div>
  )
}
