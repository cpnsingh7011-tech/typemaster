import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Leaderboard | TypeMaster",
    description: "Top typing speeds and rankings on TypeMaster.",
};

export default function LeaderboardPage() {
    return (
        <main className="min-h-screen bg-[#0f1012] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-[#0f1012] to-black text-gray-300 flex flex-col font-mono selection:bg-yellow-500/30 overflow-hidden">
            <Header />
            <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 relative z-10">
                <Leaderboard />
            </div>
        </main>
    );
}
