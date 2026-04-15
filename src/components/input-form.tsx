"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Send, Loader } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

const GENERATE_LYRICS_ENDPOINT =
  "https://otolinks-functions-ffg4e2bqa0byd6c2.japaneast-01.azurewebsites.net/api/generate_lyrics?code=ZYRBr3JNXRX89GQwTN6EXihiKiiV0f5LKx43QGuRBCrZAzFuu1X-rQ%3D%3D"

const EDIT_LYRICS_ENDPOINT =
  "https://otolinks-functions-ffg4e2bqa0byd6c2.japaneast-01.azurewebsites.net/api/edit_lyrics?code=ns7I4qeGzFFThvJfsxhBQdAGnYpoCNTeVFR_8jEMrojAAzFurMOwfA%3D%3D"

interface InputFormProps {
  selectedPurpose: string | null
  onChatStart: (started: boolean) => void
  chatStarted: boolean
}

interface ChatMessage {
  role: "user" | "ai"
  content: string
}

interface ApiResponse {
  lyrics: string
  analysis?: string
}

export default function InputForm({ selectedPurpose, onChatStart, chatStarted }: InputFormProps) {
  const [worry, setWorry] = useState("")
  const [favoriteSong, setFavoriteSong] = useState("")
  const [favoriteArtist, setFavoriteArtist] = useState("")
  const [favoriteGenre, setFavoriteGenre] = useState("")
  const [songMood, setSongMood] = useState("")
  const [agreeToPolicy, setAgreeToPolicy] = useState(false)
  const [errors, setErrors] = useState<{ worry?: string; policy?: string }>({})
  const [followUpInput, setFollowUpInput] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [analysisData, setAnalysisData] = useState<string | null>(null)
  const [instructionHistory, setInstructionHistory] = useState<string[]>([])
  const [currentLyrics, setCurrentLyrics] = useState<string>("")

  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: {
      worry?: string
      policy?: string
    } = {}

    if (!worry) {
      newErrors.worry = "悩みを入力してください"
    }

    if (!agreeToPolicy) {
      newErrors.policy = "プライバシーポリシーに同意する必要があります"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onChatStart(true)
      setErrorMessage(null)
      setIsLoading(true)

      try {
        const requestBody = {
          song: favoriteSong || "",
          artist: favoriteArtist || "",
          genre: favoriteGenre || "",
          mood: songMood || "",
          problem: worry,
        }

        console.log("[v0] Sending request to Azure Functions:", requestBody)

        const response = await fetch(GENERATE_LYRICS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        const data: ApiResponse = await response.json()
        console.log("[v0] API Response received:", data)

        setChatMessages([
          {
            role: "ai",
            content: data.lyrics,
          },
        ])

        setCurrentLyrics(data.lyrics)
        if (data.analysis) {
          setAnalysisData(data.analysis)
        }
      } catch (error) {
        console.error("[v0] API Error:", error)
        const errorMsg =
          error instanceof Error ? error.message : "歌詞の生成に失敗しました。もう一度お試しください。"
        setErrorMessage(errorMsg)
        setChatMessages([
          {
            role: "ai",
            content: `申し訳ありません。エラーが発生しました: ${errorMsg}`,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleFollowUp = async () => {
    if (followUpInput.trim()) {
      const userMessage = followUpInput.trim()
      setChatMessages((prev) => [...prev, { role: "user", content: userMessage }])
      
      // Update instruction history for next call
      const newHistory = [...instructionHistory, userMessage]
      setInstructionHistory(newHistory)
      
      setFollowUpInput("")
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const requestBody = {
          problem: worry,
          genre: favoriteGenre,
          mood: songMood,
          analysis: analysisData || "",
          lyrics: currentLyrics,
          mode: "full",
          target_section: "",
          instruction: userMessage,
          instruction_history: instructionHistory,
        }

        console.log("[v0] Sending edit request:", requestBody)

        const response = await fetch(EDIT_LYRICS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        const data: ApiResponse = await response.json()
        console.log("[v0] Edit API Response received:", data)

        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: data.lyrics,
          },
        ])

        setCurrentLyrics(data.lyrics)
        if (data.analysis) {
          setAnalysisData(data.analysis)
        }
      } catch (error) {
        console.error("[v0] Edit API Error:", error)
        const errorMsg =
          error instanceof Error ? error.message : "歌詞の編集に失敗しました。もう一度お試しください。"
        setErrorMessage(errorMsg)
        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `申し訳ありません。エラーが発生しました: ${errorMsg}`,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleStartChat}
        className="bg-gray-900/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-gray-800"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          {selectedPurpose === "gift"
            ? "贈りたい相手のことを教えてください"
            : selectedPurpose === "self"
              ? "あなたの気持ちを聞かせてください"
              : "詳細を入力してください"}
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="worry" className="block text-sm font-medium">
              {selectedPurpose === "gift"
                ? "贈りたい相手の悩み"
                : selectedPurpose === "self"
                  ? "あなたの悩み"
                  : "悩み"}
              <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <Textarea
                id="worry"
                name="entry.731280237"
                value={worry}
                onChange={(e) => setWorry(e.target.value)}
                disabled={chatStarted}
                className={cn(
                  "bg-black/50 border-gray-700 focus:border-teal-400 transition-all min-h-[120px]",
                  errors.worry ? "border-red-500" : "",
                  chatStarted ? "opacity-70 cursor-not-allowed" : "",
                )}
              />
              {errors.worry && (
                <div className="absolute right-3 top-6">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.worry && <p className="text-red-500 text-sm mt-1">{errors.worry}</p>}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">
                {selectedPurpose === "gift"
                  ? "どんな音楽を贈りたいか、イメージを教えてください"
                  : selectedPurpose === "self"
                    ? "どんな音楽を作りたいか、イメージを教えてください"
                    : "どんな音楽を贈りたいか、イメージを教えてください"}
              </h3>
              <p className="text-xs text-gray-400">（特に思い浮かばない場合は、空欄のままでも大丈夫です。）</p>
            </div>

            <div className="space-y-4 pl-4">
              <div className="space-y-2">
                <label htmlFor="favoriteSong" className="block text-sm font-medium">
                  参考にしたい曲の曲名
                </label>
                <Input
                  id="favoriteSong"
                  name="entry.787700534"
                  value={favoriteSong}
                  onChange={(e) => setFavoriteSong(e.target.value)}
                  disabled={chatStarted}
                  placeholder=""
                  className={cn("bg-black/50 border-gray-700 focus:border-teal-400 transition-all", chatStarted ? "opacity-70 cursor-not-allowed disabled:pointer-events-auto" : "")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="favoriteArtist" className="block text-sm font-medium">
                  イメージに近いアーティスト
                </label>
                <Input
                  id="favoriteArtist"
                  name="entry.787700535"
                  value={favoriteArtist}
                  onChange={(e) => setFavoriteArtist(e.target.value)}
                  disabled={chatStarted}
                  placeholder=""
                  className={cn("bg-black/50 border-gray-700 focus:border-teal-400 transition-all", chatStarted ? "opacity-70 cursor-not-allowed disabled:pointer-events-auto" : "")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="favoriteGenre" className="block text-sm font-medium">
                  {selectedPurpose === "gift"
                    ? "贈りたい曲のジャンル"
                    : selectedPurpose === "self"
                      ? "作りたい曲のジャンル"
                      : "贈りたい曲のジャンル"}
                </label>
                <Input
                  id="favoriteGenre"
                  name="entry.787700536"
                  value={favoriteGenre}
                  onChange={(e) => setFavoriteGenre(e.target.value)}
                  disabled={chatStarted}
                  placeholder="例：J-POP／ロック／バラード など"
                  className={cn("bg-black/50 border-gray-700 focus:border-teal-400 transition-all", chatStarted ? "opacity-70 cursor-not-allowed disabled:pointer-events-auto" : "")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="songMood" className="block text-sm font-medium">
                  {selectedPurpose === "gift"
                    ? "贈りたい曲の雰囲気"
                    : selectedPurpose === "self"
                      ? "作りたい曲の雰囲気"
                      : "贈りたい曲の雰囲気"}
                </label>
                <Input
                  id="songMood"
                  name="entry.787700537"
                  value={songMood}
                  onChange={(e) => setSongMood(e.target.value)}
                  disabled={chatStarted}
                  placeholder="例：明るい／切ない／落ち着いた など"
                  className={cn("bg-black/50 border-gray-700 focus:border-teal-400 transition-all", chatStarted ? "opacity-70 cursor-not-allowed disabled:pointer-events-auto" : "")}
                />
              </div>
            </div>
          </div>

          {!chatStarted && (
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">プライバシーポリシー</h3>
              <div className="bg-black/70 border border-gray-800 rounded-md p-4 mb-4 h-40 overflow-y-auto text-sm text-gray-300">
                <h4 className="font-bold mb-2">プライバシーポリシー</h4>
                <p className="mb-2">
                  当サービス「Oto Links」は、お客様の個人情報を大切に扱い、以下の方針に基づいて管理・保護いたします。
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>収集する情報：メールアドレス、お悩み内容、音楽の好みに関する情報</li>
                  <li>利用目的：AIによる音楽生成サービスの提供、サービス改善のための分析</li>
                  <li>第三者提供：法令に基づく場合を除き、お客様の同意なく第三者に提供することはありません</li>
                  <li>お問い合わせ：otolinks@ova-japan.org</li>
                </ol>
              </div>

              <div className="flex items-start space-x-2 mb-4">
                <Checkbox
                  id="policy"
                  checked={agreeToPolicy}
                  onCheckedChange={(checked) => setAgreeToPolicy(checked === true)}
                  className={cn(
                    "cursor-pointer",
                    errors.policy ? "border-red-500" : ""
                  )}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="policy"
                    className={cn(
                      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      errors.policy ? "text-red-500" : "",
                    )}
                  >
                    プライバシーポリシーに同意する <span className="text-pink-500">*</span>
                  </label>
                  {errors.policy && <p className="text-red-500 text-xs">{errors.policy}</p>}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg font-bold bg-gradient-to-r from-pink-500 via-teal-400 to-yellow-400 hover:opacity-90 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                歌詞の作成を開始する
              </Button>
              <div className="mt-4 text-center text-sm text-gray-400">
                <p>Oto LinksはNPO法人OVAによって提供されている無料のサービスです。料金は一切かかりません</p>
              </div>
            </div>
          )}
        </div>
      </form>

      {chatStarted && (
        <div className="mt-6 bg-gray-900/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-gray-800 space-y-6">
          {isLoading && (
            <div className="flex items-center justify-center gap-2 py-8">
              <Loader className="h-5 w-5 animate-spin text-teal-400" />
              <span className="text-gray-300">生成中...</span>
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <p className="text-red-400 text-sm">{errorMessage}</p>
            </div>
          )}

          <div className="bg-black/50 rounded-lg p-6 border border-gray-700 min-h-[300px] flex flex-col space-y-4 overflow-y-auto">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-xs lg:max-w-md px-4 py-2 rounded-lg whitespace-pre-wrap",
                    message.role === "user"
                      ? "bg-teal-500/30 text-gray-200 border border-teal-400/50"
                      : "bg-gray-800/50 text-gray-300 border border-gray-700"
                  )}
                >
                  <p className="leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <label htmlFor="followUp" className="block text-sm font-medium">
              追加の指示
            </label>
            <div className="flex gap-2">
              <Input
                id="followUp"
                value={followUpInput}
                onChange={(e) => setFollowUpInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleFollowUp()}
                placeholder="さらに指示を入力してください..."
                className="bg-black/50 border-gray-700 focus:border-teal-400 transition-all"
              />
              <Button
                onClick={handleFollowUp}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 via-teal-400 to-yellow-400 hover:opacity-90 hover:cursor-pointer transition-all"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
