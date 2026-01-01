"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Stats from "@/components/Stats";
import Timer from "@/components/Timer";
import TypingBox from "@/components/TypingBox";
import Results from "@/components/Results";
import { useTyping } from "@/hooks/useTyping";


export default function Home() {
  const [timeOption, setTimeOption] = useState(30);
  const {
    text,
    userInput,
    phase,
    timeLeft,
    wpm,
    accuracy,
    handleInput,
    resetTyping,
    endTime // Added for Results
  } = useTyping(timeOption);

  return (
    <main className="min-h-screen bg-[#0f1012] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-[#0f1012] to-black text-gray-300 flex flex-col font-mono selection:bg-yellow-500/30 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 relative z-10">

        {/* Time Selector (Only show when not typing) */}
        {phase === "start" && (
          <div className="flex bg-gray-900/50 p-1 rounded-lg mb-8 backdrop-blur-sm border border-white/5 animate-in fade-in slide-in-from-top-4">
            {[15, 30, 60].map((t) => (
              <button
                key={t}
                onClick={() => setTimeOption(t)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${timeOption === t
                  ? "bg-yellow-500/10 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.1)]"
                  : "text-gray-500 hover:text-gray-300"
                  }`}
              >
                {t}s
              </button>
            ))}
          </div>
        )}

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

        {/* Footer / Instructions */}
        <div className={`text-sm opacity-50 mt-12 flex gap-8 ${phase === 'completed' ? 'invisible' : ''}`}>
          <span><kbd className="bg-gray-800 px-2 py-1 rounded">tab</kbd> + <kbd className="bg-gray-800 px-2 py-1 rounded">enter</kbd> restart test</span>
          <span><kbd className="bg-gray-800 px-2 py-1 rounded">esc</kbd> - command line</span>
        </div>
      </div>
    </main>
  );
}
