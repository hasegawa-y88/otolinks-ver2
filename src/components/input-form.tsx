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
  const [email, setEmail] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [worry, setWorry] = useState("")
  const [music, setMusic] = useState("")
  const [agreeToPolicy, setAgreeToPolicy] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; nameInput?: string; worry?: string; policy?: string }>({})
  const formRef = useRef<HTMLFormElement>(null)

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: {
      nameInput?: string
      email?: string
      worry?: string
      policy?: string
    } = {}

    if (!nameInput) {
      newErrors.nameInput = "お名前を入力してください"
    }

    if (!email) {
      newErrors.email = "メールアドレスを入力してください"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "有効なメールアドレスを入力してください"
    }

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
            <label htmlFor="email" className="block text-sm font-medium">
              あなたのメールアドレス <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <Input
                id="email"
                name="entry.511433383"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className={cn(
                  "bg-black/50 border-gray-700 focus:border-teal-400 transition-all",
                  errors.email ? "border-red-500" : "",
                )}
              />
              {errors.email && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="nameInput" className="block text-sm font-medium">
              あなたの名前 <span className="text-gray-400 text-xs">※仮名やニックネームでも可</span> <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <Input
                id="nameInput"
                name="entry.1769110912"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className={cn(
                  "bg-black/50 border-gray-700 focus:border-teal-400 transition-all",
                  errors.nameInput ? "border-red-500" : "",
                )}
              />
              {errors.nameInput && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.nameInput && <p className="text-red-500 text-sm mt-1">{errors.nameInput}</p>}
          </div>
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

          <div className="space-y-2">
            <label htmlFor="music" className="block text-sm font-medium">
              {selectedPurpose === "gift"
                ? "贈りたい相手が好きな 曲／歌手／音楽ジャンル"
                : selectedPurpose === "self"
                  ? "あなたが好きな 曲／歌手／音楽ジャンル"
                  : "好きな 曲／歌手／音楽ジャンル"}
            </label>
            <Input
              id="music"
              name="entry.787700534"
              value={music}
              onChange={(e) => setMusic(e.target.value)}
              placeholder="ここに記入したものに寄せた音楽を作成します。特に希望が無ければ空欄のままで大丈夫です。"
              className="bg-black/50 border-gray-700 focus:border-teal-400 transition-all"
            />
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
              送信する
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
