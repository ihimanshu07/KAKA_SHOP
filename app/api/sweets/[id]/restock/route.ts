import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if user is admin
    const adminCheck = requireAdmin(req);
    if (adminCheck instanceof NextResponse) {
      return adminCheck; // Return error response if not admin
    }

    const { id } = await params;
    const { quantity } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    if (!quantity || quantity <= 0) {
      return NextResponse.json(
        { error: "Quantity must be greater than 0" },
        { status: 400 }
      );
    }

    // Check if sweet exists
    const sweet = await prisma.sweet.findUnique({
      where: { id },
    });

    if (!sweet) {
      return NextResponse.json(
        { error: "Sweet not found" },
        { status: 404 }
      );
    }

    // Update the sweet quantity (increase)
    const updatedSweet = await prisma.sweet.update({
      where: { id },
      data: {
        quantity: sweet.quantity + quantity,
      },
    });

    return NextResponse.json({
      message: "Restock successful",
      sweet: updatedSweet,
    });
  } catch (error) {
    console.error("Error processing restock:", error);
    return NextResponse.json(
      { error: "Failed to process restock" },
      { status: 500 }
    );
  }
}

