import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, category, price, quantity } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
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

    // Build update data object
    const data: any = {};

    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length === 0) {
        return NextResponse.json(
          { error: "Name must be a non-empty string" },
          { status: 400 }
        );
      }
      data.name = name.trim();
    }

    if (category !== undefined) {
      if (typeof category !== "string" || category.trim().length === 0) {
        return NextResponse.json(
          { error: "Category must be a non-empty string" },
          { status: 400 }
        );
      }
      data.category = category.trim();
    }

    if (price !== undefined) {
      if (typeof price !== "number" || price < 0) {
        return NextResponse.json(
          { error: "Price must be a non-negative number" },
          { status: 400 }
        );
      }
      data.price = price;
    }

    if (quantity !== undefined) {
      if (typeof quantity !== "number" || quantity < 0) {
        return NextResponse.json(
          { error: "Quantity must be a non-negative number" },
          { status: 400 }
        );
      }
      data.quantity = quantity;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No fields provided to update" },
        { status: 400 }
      );
    }

    const updatedSweet = await prisma.sweet.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedSweet);
  } catch (error) {
    console.error("Error updating sweet:", error);
    return NextResponse.json(
      { error: "Failed to update sweet" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
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

    // Delete the sweet
    await prisma.sweet.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Sweet deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting sweet:", error);
    return NextResponse.json(
      { error: "Failed to delete sweet" },
      { status: 500 }
    );
  }
}

