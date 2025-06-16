import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="text-center py-8 bg-mari-sky-blue text-off-white rounded-t-3xl shadow-md mt-12">
      <div className="flex items-center justify-center mb-4">
        <Heart className="w-8 h-8 fill-heart-red text-heart-red animate-heart-beat" />
      </div>
      <Link href="#" className="text-lg hover:underline">
        📸 Voir tous nos souvenirs
      </Link>
    </footer>
  )
}
