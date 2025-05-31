import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currency = await prisma.currency.findMany();

    if (!currency) {
      return NextResponse.json(
        { error: "No categories found" },
        { status: 404 }
      );
    }
    console.log("currency", currency);

    return NextResponse.json({ currency }, { status: 200 });
  } catch (error) {
    console.error("Error creating license:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
