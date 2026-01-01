import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Result from "@/models/Result";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { wpm, accuracy } = await req.json();

        // Check for user session
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        const result = await Result.create({
            wpm,
            accuracy,
            email // Save email if present, otherwise null
        });

        return NextResponse.json({ success: true, data: result }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to save result" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const results = await Result.find({}).sort({ createdAt: -1 }).limit(10);
        return NextResponse.json({ success: true, data: results });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch results" }, { status: 500 });
    }
}
