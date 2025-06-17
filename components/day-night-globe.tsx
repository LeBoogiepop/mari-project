"use client"

import { useEffect, useRef, useState } from "react"
import type { GlobePoint } from "@/types/app-types"

declare global {
  interface Window {
    Globe: any
    THREE: any
  }
}

// Composant de fallback en cas d'erreur
function GlobeFallback() {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border-2 border-gray-700 w-full h-[300px] flex items-center justify-center">
      <div className="text-center p-6">
        <div className="text-cyan-300 text-4xl mb-4">🌍</div>
        <h3 className="text-white text-xl font-bold mb-2">Globe indisponible</h3>
        <p className="text-gray-400">Le globe 3D n'a pas pu être chargé.</p>
      </div>
    </div>
  )
}

export default function DayNightGlobe() {
  const globeRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef<HTMLDivElement>(null)
  const globeInstanceRef = useRef<any>(null)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    // Fonction pour charger les scripts dynamiquement
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const script = document.createElement("script")
        script.src = src
        script.onload = () => resolve()
        script.onerror = (e) => {
          console.error(`Erreur de chargement du script: ${src}`, e)
          reject(new Error(`Erreur de chargement du script: ${src}`))
        }
        document.head.appendChild(script)
      })
    }

    const initGlobe = async () => {
      try {
        // Charger Three.js d'abord
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js")

        // Puis charger globe.gl
        await loadScript("//cdn.jsdelivr.net/npm/globe.gl")

        // Attendre que les librairies soient disponibles
        if (!window.Globe || !window.THREE) {
          throw new Error("Libraries not loaded")
        }

        const { TextureLoader, ShaderMaterial, Vector2 } = window.THREE

        const VELOCITY = 2 // minutes per frame

        // Données des points pour Paris et Busan
        const locations: GlobePoint[] = [
          {
            lat: 48.8566,
            lng: 2.3522,
            name: "Paris",
            person: "Maxime",
            color: "#4A90E2", // Bleu pour Paris
            size: 0.8,
          },
          {
            lat: 35.1796,
            lng: 129.0756,
            name: "Busan",
            person: "Mari",
            color: "#FF6B6B", // Rouge pour Busan
            size: 0.8,
          },
        ]

        // Calculs solaires simplifiés
        const getSunPosition = (date: Date): [number, number] => {
          const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
          const hour = date.getUTCHours() + date.getUTCMinutes() / 60

          // Déclinaison solaire approximative
          const declination = 23.45 * Math.sin((((360 * (284 + dayOfYear)) / 365) * Math.PI) / 180)

          // Longitude solaire (basée sur l'heure UTC)
          const longitude = (hour - 12) * 15 // 15 degrés par heure

          return [longitude, declination]
        }

        // Custom shader pour le cycle jour/nuit
        const dayNightShader = {
          vertexShader: `
            varying vec3 vNormal;
            varying vec2 vUv;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            #define PI 3.141592653589793
            uniform sampler2D dayTexture;
            uniform sampler2D nightTexture;
            uniform vec2 sunPosition;
            varying vec3 vNormal;
            varying vec2 vUv;

            float toRad(in float a) {
              return a * PI / 180.0;
            }

            void main() {
              // Calcul simplifié de l'illumination
              float sunLng = toRad(sunPosition.x);
              float sunLat = toRad(sunPosition.y);
              
              // Position du point sur la sphère
              float pointLng = (vUv.x - 0.5) * 2.0 * PI;
              float pointLat = (0.5 - vUv.y) * PI;
              
              // Calcul de l'angle entre le soleil et le point
              float cosAngle = sin(sunLat) * sin(pointLat) + cos(sunLat) * cos(pointLat) * cos(sunLng - pointLng);
              
              // Facteur de mélange basé sur l'illumination
              float blendFactor = smoothstep(-0.2, 0.2, cosAngle);
              
              vec4 dayColor = texture2D(dayTexture, vUv);
              vec4 nightColor = texture2D(nightTexture, vUv);
              
              gl_FragColor = mix(nightColor, dayColor, blendFactor);
            }
          `,
        }

        let currentTime = new Date()

        if (!globeRef.current) return

        const world = new window.Globe(globeRef.current)
        globeInstanceRef.current = world

        // Configuration du globe - prend toute la largeur
        world
          .width(globeRef.current.clientWidth)
          .height(300) // Plus haut pour mieux voir
          .backgroundColor("rgba(0,0,0,0)")
          .showAtmosphere(true)
          .atmosphereColor("#4A90E2")
          .atmosphereAltitude(0.1)

        // Ajouter les points pour Paris et Busan
        world
          .pointsData(locations)
          .pointColor("color")
          .pointAltitude(0.02)
          .pointRadius("size")
          .pointLabel(
            (d: GlobePoint) => `
            <div style="
              background: rgba(0,0,0,0.8); 
              color: white; 
              padding: 8px 12px; 
              border-radius: 8px; 
              font-family: monospace;
              border: 2px solid ${d.color};
            ">
              <strong>${d.name}</strong><br/>
              ${d.person} ❤️
            </div>
          `,
          )

        // Charger les textures
        Promise.all([
          new TextureLoader().loadAsync("//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg"),
          new TextureLoader().loadAsync("//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"),
        ])
          .then(([dayTexture, nightTexture]) => {
            const material = new ShaderMaterial({
              uniforms: {
                dayTexture: { value: dayTexture },
                nightTexture: { value: nightTexture },
                sunPosition: { value: new Vector2() },
              },
              vertexShader: dayNightShader.vertexShader,
              fragmentShader: dayNightShader.fragmentShader,
            })

            world
              .globeMaterial(material)
              .backgroundImageUrl("//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png")

            // Animation du cycle jour/nuit
            const animate = () => {
              currentTime = new Date(currentTime.getTime() + VELOCITY * 60 * 1000)

              if (timeRef.current) {
                timeRef.current.textContent = currentTime.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }

              const [lng, lat] = getSunPosition(currentTime)
              material.uniforms.sunPosition.value.set(lng, lat)

              requestAnimationFrame(animate)
            }

            // Initialiser la position du soleil
            const [initialLng, initialLat] = getSunPosition(currentTime)
            material.uniforms.sunPosition.value.set(initialLng, initialLat)

            requestAnimationFrame(animate)
          })
          .catch((error) => {
            console.error("Erreur lors du chargement des textures:", error)
            // Fallback: globe simple sans textures
            try {
              world.globeImageUrl("//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg")
            } catch (e) {
              console.error("Fallback failed:", e)
              setError(true)
            }
          })

        // Positionner la caméra pour voir l'Europe et l'Asie
        world.pointOfView({ lat: 45, lng: 65, altitude: 2 })
      } catch (error) {
        console.error("Erreur lors de l'initialisation du globe:", error)
        setError(true)
      }
    }

    initGlobe()

    // Cleanup
    return () => {
      if (globeInstanceRef.current) {
        globeInstanceRef.current = null
      }
    }
  }, [])

  if (error) {
    return <GlobeFallback />
  }

  return (
    <div className="mt-6 bg-gray-900 rounded-lg shadow-xl overflow-hidden border-2 border-gray-700 w-full">
      <div className="relative">
        <div ref={globeRef} className="w-full h-[300px]" />
        <div
          ref={timeRef}
          className="absolute bottom-3 left-3 text-cyan-300 text-sm font-mono bg-black bg-opacity-70 px-3 py-2 rounded-lg"
        />
        <div className="absolute top-3 left-3 text-cyan-300 text-sm font-mono bg-black bg-opacity-70 px-3 py-2 rounded-lg">
          🌍 Notre Monde
        </div>
        <div className="absolute top-3 right-3 text-white text-xs font-mono bg-black bg-opacity-70 px-3 py-2 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Paris - Maxime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Busan - Mari</span>
          </div>
        </div>
      </div>
    </div>
  )
}
