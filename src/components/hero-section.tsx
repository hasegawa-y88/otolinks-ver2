import { Music } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Enhanced decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/30 via-transparent to-teal-400/30"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 opacity-30 blur-3xl"></div>

      <div className="relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
          <Music className="w-6 h-6" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-teal-400 to-yellow-400 leading-tight">
          あなたや大切な人の<br/>&quot;今&quot;を、音にする。
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
          悩みや想いを送るだけで、<span className="inline-block">AIが気持ちに寄り添う音楽を届けます。</span>
        </p>
      </div>
    </section>
  )
}
