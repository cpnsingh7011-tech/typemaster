import { useRef, useEffect, useState } from "react";
import { FaRotateRight } from "react-icons/fa6";

interface TypingBoxProps {
    text: string;
    userInput: string;
    onInputChange: (value: string) => void;
    onReset: () => void;
    phase: "start" | "typing" | "completed";
}

export default function TypingBox({ text, userInput, onInputChange, onReset, phase }: TypingBoxProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (phase === "start" || phase === "typing") {
            inputRef.current?.focus();
        }
    }, [phase]);

    return (
        <div className="relative w-full max-w-5xl mx-auto mb-20" onClick={handleFocus}>
            {/* Hidden Input field to capture typing */}
            <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => onInputChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="absolute inset-0 opacity-0 cursor-default z-0 h-full w-full"
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                disabled={phase === "completed"}
            />

            {/* Restart Button Overlay when completed (optional here, but good for UX) */}
            <div className="absolute top-0 right-0 -mt-10">
                <button
                    onClick={onReset}
                    className="text-gray-500 hover:text-white transition-colors p-2"
                    aria-label="Restart Test"
                >
                    <FaRotateRight className="text-xl" />
                </button>
            </div>

            {/* Text Display Area */}
            <div
                className="relative text-3xl md:text-4xl leading-relaxed font-mono font-medium tracking-wide outline-none min-h-[200px] break-words whitespace-pre-wrap select-none"
                style={{ textShadow: "0 0 5px rgba(0,0,0,0.3)" }}
            >
                {text.split("").map((char, index) => {
                    let className = "text-gray-600 opacity-60"; // Default (untyped)
                    const isCurrent = index === userInput.length;

                    if (index < userInput.length) {
                        // Already typed
                        className = userInput[index] === char
                            ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" // Correct (Green with glow)
                            : "text-rose-500 underline decoration-rose-500 underline-offset-4 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]"; // Incorrect (Red with glow)
                    }

                    return (
                        <span key={index} className={`relative transition-colors duration-100 ${className}`}>
                            {/* Cursor (smooth caret) */}
                            {isCurrent && (
                                <span className="absolute left-0 -top-1 w-[3px] h-10 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse rounded-full z-10"></span>
                            )}
                            {char}
                        </span>
                    );
                })}
            </div>

            {/* Focus overlay */}
            <div
                className={`absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-[1px] text-gray-400 text-lg transition-opacity duration-200 pointer-events-none rounded-lg ${phase !== "completed" && !isFocused ? "opacity-100" : "opacity-0"
                    }`}
            >
                Click here to focus
            </div>
        </div>
    );
}
