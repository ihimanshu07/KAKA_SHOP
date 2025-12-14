import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    // Check if there's enough quantity
    if (sweet.quantity < quantity) {
      return NextResponse.json(
        { error: "Insufficient quantity available" },
        { status: 400 }
      );
    }

    // Update the sweet quantity (decrease)
    const updatedSweet = await prisma.sweet.update({
      where: { id },
      data: {
        quantity: sweet.quantity - quantity,
      },
    });

    return NextResponse.json({
      message: "Purchase successful",
      sweet: updatedSweet,
    });
  } catch (error) {
    console.error("Error processing purchase:", error);
    return NextResponse.json(
      { error: "Failed to process purchase" },
      { status: 500 }
    );
  }
}

