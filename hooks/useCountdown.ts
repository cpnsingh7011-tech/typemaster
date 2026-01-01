import { useState, useEffect, useCallback, useRef } from "react";

export const useCountdown = (initialTime: number) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isActive, setIsActive] = useState(false);

    const startCountdown = useCallback(() => {
        if (!isActive && timeLeft > 0) {
            setIsActive(true);
        }
    }, [isActive, timeLeft]);

    const stopCountdown = useCallback(() => {
        setIsActive(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, []);

    const resetCountdown = useCallback(() => {
        stopCountdown();
        setTimeLeft(initialTime);
    }, [initialTime, stopCountdown]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            stopCountdown();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isActive, timeLeft, stopCountdown]);

    return { timeLeft, startCountdown, stopCountdown, resetCountdown };
};
