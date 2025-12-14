import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        });
        // Return user object or null - both are valid JSON responses
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error checking existing user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}