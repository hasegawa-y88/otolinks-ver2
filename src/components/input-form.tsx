"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

interface InputFormProps {
  onSubmit: (e: React.FormEvent) => void
  selectedPurpose: string | null
}

export default function InputForm({ onSubmit, selectedPurpose }: InputFormProps) {
  const [worry, setWorry] = useState("")
  const [favoriteSong, setFavoriteSong] = useState("")
  const [favoriteArtist, setFavoriteArtist] = useState("")
  const [favoriteGenre, setFavoriteGenre] = useState("")
  const [songMood, setSongMood] = useState("")
  const [agreeToPolicy, setAgreeToPolicy] = useState(false)
  const [errors, setErrors] = useState<{ worry?: string; policy?: string }>({})
  const formRef = useRef<HTMLFormElement>(null)

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
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
      formRef.current?.submit()
      setIsSubmitted(true)
      onSubmit(e)
    }
  }

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-gray-900/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-gray-800"
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfIeDV6G5U2U2zYGRCQNIa28zNtuEpn7lkiaa1H0b8F2_SAHw/formResponse"
        method="post"
        target="dummyIframe"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          {selectedPurpose === "gift"
            ? "贈りたい相手のことを教えてください"
            : selectedPurpose === "self"
              ? "あなたの気持ちを聞かせてください"
              : "詳細を入力してください"}
        </h2>
        <input
          type="text"
          name="entry.769498571"
          value={selectedPurpose ?? ""}
          readOnly
          className="hidden"
        />
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
                className={cn(
                  "bg-black/50 border-gray-700 focus:border-teal-400 transition-all min-h-[120px]",
                  errors.worry ? "border-red-500" : "",
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
                  ? "どんな音楽を届けたいか、イメージを教えてください"
                  : selectedPurpose === "self"
                    ? "どんな音楽を作りたいか、イメージを教えてください"
                    : "どんな音楽を届けたいか、イメージを教えてください"}
              </h3>
              <p className="text-xs text-gray-400">（特に思い浮かばない場合は、空欄のままでも大丈夫です。）</p>
            </div>

            <div className="space-y-4 pl-4">
              <div className="space-y-2">
                <label htmlFor="favoriteSong" className="block text-sm font-medium">
                  参考にしたい曲
                </label>
                <Input
                  id="favoriteSong"
                  name="entry.787700534"
                  value={favoriteSong}
                  onChange={(e) => setFavoriteSong(e.target.value)}
                  placeholder=""
                  className="bg-black/50 border-gray-700 focus:border-teal-400 transition-all"
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
                  placeholder=""
                  className="bg-black/50 border-gray-700 focus:border-teal-400 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="favoriteGenre" className="block text-sm font-medium">
                  曲のジャンル
                </label>
                <Input
                  id="favoriteGenre"
                  name="entry.787700536"
                  value={favoriteGenre}
                  onChange={(e) => setFavoriteGenre(e.target.value)}
                  placeholder="例：J-POP／ロック／バラード など"
                  className="bg-black/50 border-gray-700 focus:border-teal-400 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="songMood" className="block text-sm font-medium">
                  曲の雰囲気
                </label>
                <Input
                  id="songMood"
                  name="entry.787700537"
                  value={songMood}
                  onChange={(e) => setSongMood(e.target.value)}
                  placeholder="例：明るい／切ない／落ち着いた など"
                  className="bg-black/50 border-gray-700 focus:border-teal-400 transition-all"
                />
              </div>
            </div>
          </div>

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
                <li>第三者提供：法令に基��く場合を除き、お客様の同意なく第三者に提供することはありません</li>
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
              AIと歌詞の作成を開始する
            </Button>
            
            <div className={cn("mt-4 text-center text-sm", !isSubmitted && "hidden")}>
              <p>入力した内容は正常に送信されました</p>
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
              <p>Oto LinksはNPO法人OVAによって提供されている無料のサービスです。料金は一切かかりません</p>
            </div>
          </div>
        </div>
      </form>
      <iframe name="dummyIframe" className="hidden" />
    </>
  )
}
