"use client";

import Header from "@/components/Header";
import Stats from "@/components/Stats";
import Timer from "@/components/Timer";
import TypingBox from "@/components/TypingBox";
import Results from "@/components/Results";
import { useTyping } from "@/hooks/useTyping";

export default function Home() {
  const {
    text,
    userInput,
    phase,
    timeLeft,
    wpm,
    accuracy,
    handleInput,
    resetTyping
  } = useTyping();

  return (
    <main className="min-h-screen bg-[#0f1012] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-[#0f1012] to-black text-gray-300 flex flex-col font-mono selection:bg-yellow-500/30 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 relative z-10">

        {phase === "completed" ? (
          <Results
            wpm={wpm}
            accuracy={accuracy}
            onRestart={resetTyping}
          />
        ) : (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-500">
            {/* Control Bar */}
            <div className="w-full flex items-center justify-between mb-16 px-8 max-w-5xl">
              <Timer timeLeft={timeLeft} />
              <Stats wpm={wpm} accuracy={accuracy} />
            </div>

            {/* Typing Area */}
            <TypingBox
              text={text}
              userInput={userInput}
              onInputChange={handleInput}
              onReset={resetTyping}
              phase={phase}
            />
          </div>
        )}

        {/* Footer / Instructions (Optional) */}
        <div className={`text-sm opacity-50 mt-12 flex gap-8 ${phase === 'completed' ? 'invisible' : ''}`}>
          <span><kbd className="bg-gray-800 px-2 py-1 rounded">tab</kbd> + <kbd className="bg-gray-800 px-2 py-1 rounded">enter</kbd> restart test</span>
          <span><kbd className="bg-gray-800 px-2 py-1 rounded">esc</kbd> - command line</span>
        </div>
      </div>
    </main>
  );
}
