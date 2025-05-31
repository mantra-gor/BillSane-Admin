import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryIdParam = searchParams.get("countryId");
    const countryId = countryIdParam ? parseInt(countryIdParam) : null;

    // if countryId is passed, return states for that country
    if (countryId) {
      const stateList = await prisma.state.findMany({
        where: {
          countryId: countryId,
        },
      });
      return NextResponse.json({ stateList }, { status: 200 });
    }

    // if parameters are not passed, return all states
    const stateList = await prisma.state.findMany();
    if (!stateList) {
      return NextResponse.json({ error: "No states found" }, { status: 404 });
    }
    return NextResponse.json({ stateList }, { status: 200 });
  } catch (error) {
    console.error("Error creating license:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
