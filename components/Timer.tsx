interface TimerProps {
    timeLeft: number;
}

export default function Timer({ timeLeft }: TimerProps) {
    return (
        <div className="text-yellow-400 text-3xl font-mono font-bold drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">
            {timeLeft}s
        </div>
    );
}
