import { Mail, Music, Send } from "lucide-react"

export default function ProcessFlow() {
  const steps = [
    {
      icon: <Send className="w-8 h-8" />,
      title: "フォームに入力して送信",
      description: (
        <>
          あなたや大切な人の、<span className="inline-block">悩みや想いを教えてください</span>
        </>
      ),
      color: "bg-pink-500",
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "AIが音楽を生成",
      description: (
        <>
          入力内容をもとに、<span className="inline-block">あなただけの音楽を作成します</span>
        </>
      ),
      color: "bg-teal-400",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "メールで受け取り",
      description: (
        <>
          数日以内に、<span className="inline-block">音楽と動画をメールでお届けします</span>
        </>
      ),
      color: "bg-yellow-400",
    },
  ]

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">ご利用の流れ</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connect steps with horizontal arrow on desktop */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-12 -right-4 w-8 h-2 bg-gradient-to-r from-pink-500 via-teal-400 to-yellow-400 z-10"></div>
            )}

            {/* Connect steps with vertical arrow on mobile */}
            {index < steps.length - 1 && (
              <div className="md:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-pink-500 via-teal-400 to-yellow-400 z-10"></div>
            )}

            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 h-full flex flex-col items-center text-center">
              <div className={`${step.color} p-4 rounded-full mb-4`}>{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.description}</p>

              {index === 0 && (
                <div className="mt-4 bg-black/50 p-3 rounded-md text-xs text-left text-gray-400 w-full">
                  <p className="italic">
                    例：「生まれて半年の子どもがなきやまなくて、毎日夜が怖いです。子どもが生まれる前に引っ越しをして、ママ友もいません。地元から離れていて、友達とも親とも会えず、孤独です。」
                  </p>
                </div>
              )}

              {index === 2 && (
                <div className="mt-4 w-full">
                  <p className="text-xs text-gray-400 mb-2">音楽イメージ：</p>
                  <a
                    href="https://youtu.be/0d45JGGFhxM?si=A_fMcDnu7ZPBi_T5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 text-sm underline"
                  >
                    サンプル音楽を聴く
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
