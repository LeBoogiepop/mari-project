"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Photo } from "@/types/app-types"

const photos: Photo[] = [
  { src: "/placeholder.svg?height=400&width=400", alt: "Photo 1", caption: "nous 2 💌" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Photo 2", caption: "nous 2 💌" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Photo 3", caption: "nous 2 💌" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Photo 4", caption: "nous 2 💌" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Photo 5", caption: "nous 2 💌" },
  { src: "/placeholder.svg?height=400&width=400", alt: "Photo 6", caption: "nous 2 💌" },
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = (photo: Photo) => {
    setSelectedPhoto(photo)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setSelectedPhoto(null)
    setIsDialogOpen(false)
  }

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-mari-brown">Nos moments précieux</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
            onClick={() => openDialog(photo)}
          >
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              width={400}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading={index < 2 ? "eager" : "lazy"} // Lazy loading pour toutes les images sauf les 2 premières
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-off-white text-xl font-semibold">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-2xl lg:max-w-4xl p-0">
          {selectedPhoto && (
            <>
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                width={800}
                height={800}
                className="w-full h-auto object-contain rounded-t-lg"
              />
              <DialogHeader className="p-4">
                <DialogTitle className="text-2xl font-bold text-mari-brown">Un souvenir</DialogTitle>
                <DialogDescription className="text-lg text-gray-600">{selectedPhoto.caption}</DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
