import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectDB from "@/utils/db";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }: { user: any }) {
            try {
                await connectDB();

                // Check if user exists
                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    // Create new user
                    await User.create({
                        email: user.email,
                        name: user.name,
                        image: user.image,
                    });
                    console.log(`New user created: ${user.email}`);
                } else {
                    console.log(`User already exists: ${user.email}`);
                }

                return true;
            } catch (error) {
                console.error("Error saving user to DB:", error);
                return false;
            }
        },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
