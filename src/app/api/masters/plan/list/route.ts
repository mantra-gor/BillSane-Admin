import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const planIdParam = searchParams.get("planId");
    const planId = planIdParam ? parseInt(planIdParam) : null;

    // if planId is passed, return that only
    if (planId) {
      const plantList = await prisma.plan.findFirst({
        where: {
          id: planId,
        },
      });
      return NextResponse.json({ plantList }, { status: 200 });
    }

    // if parameters are not passed, return all plans
    const planList = await prisma.plan.findMany();
    if (!planList) {
      return NextResponse.json({ error: "No plant found" }, { status: 404 });
    }
    return NextResponse.json({ planList }, { status: 200 });
  } catch (error) {
    console.error("Error creating license:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
