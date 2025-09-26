"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, CheckCircle } from "lucide-react"

interface CompletionModalProps {
  onClose: () => void
}

export default function CompletionModal({ onClose }: CompletionModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full cursor-pointer">
            <X className="h-4 w-4" />
            <span className="sr-only">閉じる</span>
          </Button>
        </div>

        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-teal-400 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8" />
          </div>

          <h2 className="text-2xl font-bold mb-4">送信ありがとうございます！</h2>
          <p className="text-gray-300 mb-6">数日以内に音楽と動画を<span className="inline-block">メールでお届けします。</span></p>

          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-pink-500 to-teal-400 hover:opacity-90 transition-all cursor-pointer"
          >
            閉じる
          </Button>
        </div>
      </div>
    </div>
  )
}
