interface StatsProps {
    wpm: number;
    accuracy: number;
}

export default function Stats({ wpm, accuracy }: StatsProps) {
    return (
        <div className="flex gap-12 text-gray-400 font-mono text-lg bg-gray-900/30 px-8 py-4 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
            <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">wpm</span>
                <span className="text-4xl text-emerald-400 font-bold drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">{wpm}</span>
            </div>
            <div className="w-px bg-white/10 h-10 self-center"></div>
            <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">accuracy</span>
                <span className="text-4xl text-emerald-400 font-bold drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">{accuracy}%</span>
            </div>
        </div>
    );
}
