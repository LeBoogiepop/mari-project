"use client"

import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

interface HeartParticle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface HeartParticlesProps {
  trigger: boolean
}

export default function HeartParticles({ trigger }: HeartParticlesProps) {
  const [particles, setParticles] = useState<HeartParticle[]>([])

  useEffect(() => {
    if (trigger) {
      const newParticles: HeartParticle[] = []
      for (let i = 0; i < 50; i++) {
        // Augmenté de 20 à 50 cœurs
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight, // Start from bottom
          size: Math.random() * 30 + 15, // 15 to 45px (plus gros)
          duration: Math.random() * 4 + 3, // 3 to 7 seconds (plus long)
          delay: Math.random() * 1.5, // 0 to 1.5 seconds delay (plus de délai)
        })
      }
      setParticles(newParticles)

      // Clear particles after animation
      const timer = setTimeout(() => {
        setParticles([])
      }, 8000) // Augmenté de 4000 à 8000ms

      return () => clearTimeout(timer)
    }
  }, [trigger])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <Heart
          key={p.id}
          className="absolute fill-heart-red text-heart-red"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: 0, // Start invisible
            animation: `heart-fall ${p.duration}s ease-out ${p.delay}s forwards`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes heart-fall {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translateY(-20vh) scale(1);
          }
          100% {
            transform: translateY(-100vh) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
