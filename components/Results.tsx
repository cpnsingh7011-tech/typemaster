"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaRotateRight } from "react-icons/fa6";

interface ResultsProps {
    wpm: number;
    accuracy: number;
    onRestart: () => void;
}

// Dummy data for now - in a real app, this would be passed from the typing history
const data = [
    { name: '0s', wpm: 0 },
    { name: '5s', wpm: 20 },
    { name: '10s', wpm: 35 },
    { name: '15s', wpm: 45 },
    { name: '20s', wpm: 42 },
    { name: '25s', wpm: 55 },
    { name: '30s', wpm: 60 },
];

import { useEffect } from "react";

export default function Results({ wpm, accuracy, onRestart }: ResultsProps) {
    useEffect(() => {
        const saveResult = async () => {
            try {
                console.log("Attempting to save result:", { wpm, accuracy });
                const res = await fetch("/api/results", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ wpm, accuracy }),
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                console.log("Save result success:", data);
            } catch (error) {
                console.error("Failed to save result:", error);
            }
        };

        if (wpm > 0) {
            saveResult();
        }
    }, [wpm, accuracy]);

    return (
        <div className="flex flex-col items-center justify-center w-full animate-in fade-in zoom-in duration-300">
            <h2 className="text-3xl font-bold text-gray-200 mb-8">Test Completed</h2>

            <div className="grid grid-cols-2 gap-12 mb-12">
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500 uppercase tracking-widest mb-2">WPM</span>
                    <span className="text-6xl font-bold text-yellow-500">{wpm}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500 uppercase tracking-widest mb-2">Accuracy</span>
                    <span className="text-6xl font-bold text-yellow-500">{accuracy}%</span>
                </div>
            </div>

            <div className="w-full h-64 mb-12">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#666" tick={{ fill: '#666' }} />
                        <YAxis stroke="#666" tick={{ fill: '#666' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }}
                            itemStyle={{ color: '#eab308' }}
                        />
                        <Line type="monotone" dataKey="wpm" stroke="#eab308" strokeWidth={3} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <button
                onClick={onRestart}
                className="flex items-center gap-2 px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
            >
                <FaRotateRight />
                Restart Test
            </button>
        </div>
    );
}
