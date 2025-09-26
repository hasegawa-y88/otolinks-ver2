"use client"

import { Gift, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface PurposeCardsProps {
  selectedPurpose: string | null
  setSelectedPurpose: (purpose: string) => void
}

export default function PurposeCards({ selectedPurpose, setSelectedPurpose }: PurposeCardsProps) {
  const purposes = [
    {
      id: "gift",
      title: "他の人に音楽を贈りたい",
      description: "大切な人へ、あなたの気持ちを音楽に込めて",
      icon: <Gift className="w-8 h-8" />,
      color: "from-pink-500 to-purple-500",
    },
    {
      id: "self",
      title: "自分の気持ちを表現したい",
      description: "あなた自身の悩みや想いを音楽で表現",
      icon: <Heart className="w-8 h-8" />,
      color: "from-teal-400 to-cyan-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {purposes.map((purpose) => (
        <div
          key={purpose.id}
          onClick={() => setSelectedPurpose(purpose.id)}
          className={cn(
            "p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 flex flex-col items-center text-center",
            selectedPurpose === purpose.id
              ? `border-transparent bg-gradient-to-r ${purpose.color} shadow-lg scale-[1.02]`
              : "border-gray-700 hover:border-gray-500 bg-black/40",
          )}
        >
          <div
            className={cn(
              "p-4 rounded-full mb-4",
              selectedPurpose === purpose.id ? "bg-white/20" : `bg-gradient-to-r ${purpose.color} bg-opacity-20`,
            )}
          >
            {purpose.icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{purpose.title}</h3>
          <p className="text-gray-300 text-sm">{purpose.description}</p>
        </div>
      ))}
    </div>
  )
}
