"use client"

import type React from "react"
import { useState } from "react"

import HeroSection from "@/components/hero-section"
import PurposeCards from "@/components/purpose-cards"
import InputForm from "@/components/input-form"
import ProcessFlow from "@/components/process-flow"
import Logo from "@/components/logo"
import Footer from "@/components/footer"
export default function Home() {
  const [selectedPurpose, setSelectedPurpose] = useState<string>("gift")
  const [chatStarted, setChatStarted] = useState(false)

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Logo />
        </div>
        {!chatStarted && (
          <>
            <HeroSection />
            <div className="mt-12 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">あなたの目的を選んでください</h2>
              <PurposeCards selectedPurpose={selectedPurpose} setSelectedPurpose={setSelectedPurpose} />
            </div>
          </>
        )}
        <InputForm selectedPurpose={selectedPurpose} onChatStart={setChatStarted} />
        <Footer />
      </div>
    </main>
  )
}
