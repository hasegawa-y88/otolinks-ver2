import { Music } from "lucide-react"

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-teal-400 to-yellow-400 flex items-center justify-center">
        <Music className="w-6 h-6 text-black" />
      </div>
      <span className="text-xl font-bold">Oto Links</span>
    </div>
  )
}
