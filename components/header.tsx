"use client"

import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()

  return (
    <header className="absolute top-4 left-4 z-20">
      <div
        className="bg-opacity-70 rounded-full p-3 leading-7 opacity-20 hover:opacity-100 transition-opacity duration-300 cursor-pointer bg-transparent"
        onClick={() => router.push("/coming-soon")}
      >
        <span className="text-3xl">👀</span>
      </div>
    </header>
  )
}
