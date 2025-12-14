import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    console.log("List users")
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}