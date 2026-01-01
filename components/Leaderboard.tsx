"use client";

import { useEffect, useState } from "react";
import { FaTrophy, FaUser } from "react-icons/fa";

interface Result {
    _id: string;
    wpm: number;
    accuracy: number;
    email?: string;
    name?: string;
    createdAt: string;
}

export default function Leaderboard() {
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch("/api/results", { cache: "no-store" }); // Disable cache
                const data = await res.json();
                console.log("Leaderboard data:", data);
                if (data.success) {
                    setResults(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="flex items-center gap-4 mb-8">
                <FaTrophy className="text-4xl text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-200">Leaderboard</h2>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading rankings...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-500 text-sm uppercase tracking-wider border-b border-gray-800">
                                <th className="py-4 px-6 font-medium">Rank</th>
                                <th className="py-4 px-6 font-medium">User</th>
                                <th className="py-4 px-6 font-medium text-right">WPM</th>
                                <th className="py-4 px-6 font-medium text-right">Accuracy</th>
                                <th className="py-4 px-6 font-medium text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            {results.map((result, index) => (
                                <tr
                                    key={result._id}
                                    className="hover:bg-gray-800/50 transition-colors border-b border-gray-800/50 last:border-none"
                                >
                                    <td className="py-4 px-6">
                                        {index + 1 === 1 ? (
                                            <span className="text-yellow-500 font-bold text-xl">1</span>
                                        ) : index + 1 === 2 ? (
                                            <span className="text-gray-400 font-bold text-xl">2</span>
                                        ) : index + 1 === 3 ? (
                                            <span className="text-amber-700 font-bold text-xl">3</span>
                                        ) : (
                                            <span className="text-gray-600 font-mono">#{index + 1}</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                                                <FaUser className="text-gray-500 text-xs" />
                                            </div>
                                            <span className={result.name || result.email ? "text-white font-medium" : "text-gray-500 italic"}>
                                                {result.name || (result.email ? result.email.split('@')[0] : 'Anonymous')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right font-mono text-xl text-yellow-500 font-bold">
                                        {result.wpm}
                                    </td>
                                    <td className="py-4 px-6 text-right font-mono text-gray-400">
                                        {result.accuracy}%
                                    </td>
                                    <td className="py-4 px-6 text-right text-sm text-gray-600">
                                        {new Date(result.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {results.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-600">
                                        No results yet. Be the first!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
