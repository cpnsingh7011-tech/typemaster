import { useState, useCallback, useEffect } from "react";
import { generateText } from "@/utils/textGenerator";
import { useCountdown } from "./useCountdown";

export type TypingPhase = "start" | "typing" | "completed";

interface UseTypingReturn {
    text: string;
    userInput: string;
    phase: TypingPhase;
    startTime: number | null;
    endTime: number | null;
    timeLeft: number;
    wpm: number;
    accuracy: number;
    handleInput: (input: string) => void;
    resetTyping: () => void;
}

export const useTyping = (initialTime: number = 30): UseTypingReturn => {
    const [text, setText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [phase, setPhase] = useState<TypingPhase>("start");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);

    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);

    const { timeLeft, startCountdown, stopCountdown, resetCountdown } = useCountdown(initialTime);

    useEffect(() => {
        // Initial load
        resetTyping();
    }, []);

    useEffect(() => {
        if (timeLeft === 0 && phase === "typing") {
            setPhase("completed");
            setEndTime(Date.now());
        }
    }, [timeLeft, phase]);

    const calculateStats = useCallback((input: string) => {
        const chars = input.split("");
        let correctChars = 0;

        chars.forEach((char, index) => {
            if (char === text[index]) {
                correctChars++;
            }
        });

        const accuracyVal = input.length > 0 ? (correctChars / input.length) * 100 : 100;

        // WPM: (Correct Chars / 5) / (Time Elapsed / 60)
        // If not completed, use elapsed time from start.
        // Ensure we don't divide by zero.

        let timeElapsed = 0;
        if (startTime) {
            timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
        }

        // Fallback for very start to avoid Infinity
        const wpmVal = timeElapsed > 0 ? Math.round((correctChars / 5) / timeElapsed) : 0;

        setWpm(wpmVal);
        setAccuracy(Math.round(accuracyVal));
    }, [text, startTime]);

    const resetTyping = useCallback(() => {
        const newText = generateText(100); // More text
        setText(newText);
        setUserInput("");
        setPhase("start");
        setStartTime(null);
        setEndTime(null);
        setWpm(0);
        setAccuracy(100);
        resetCountdown();
    }, [resetCountdown]);

    const handleInput = useCallback((input: string) => {
        if (phase === "completed") return;

        if (phase === "start" && input.length > 0) {
            setPhase("typing");
            setStartTime(Date.now());
            startCountdown();
        }

        setUserInput(input);
        calculateStats(input);

        if (input.length === text.length) {
            setPhase("completed");
            setEndTime(Date.now());
            stopCountdown();
        }
    }, [phase, text, startCountdown, stopCountdown, calculateStats]);

    return {
        text,
        userInput,
        phase,
        startTime,
        endTime,
        timeLeft,
        wpm,
        accuracy,
        handleInput,
        resetTyping
    };
};
