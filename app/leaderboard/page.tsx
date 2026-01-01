import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Leaderboard | TypeMaster",
    description: "Top typing speeds and rankings on TypeMaster.",
};

export default function LeaderboardPage() {
    return (
        <main className="min-h-screen bg-[#323437] text-[#646669] flex flex-col font-mono selection:bg-yellow-500/30">
            <Header />
            <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
                <Leaderboard />
            </div>
        </main>
    );
}
