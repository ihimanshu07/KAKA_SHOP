import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const payload = authenticateRequest(req);

    if (!payload) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid or missing token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      id: payload.id,
      role: payload.role,
    });
  } catch (error) {
    console.error("Error getting user info:", error);
    return NextResponse.json(
      { error: "Failed to get user info" },
      { status: 500 }
    );
  }
}

