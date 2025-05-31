import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      business_name,
      categoryId,
      gst_no,
      business_branches,
      no_of_staff,
      countryId,
      stateId,
      adminUser, // Contains admin user data: name, email, phone
    } = body;

    const business = await prisma.business.create({
      data: {
        business_name,
        categoryId,
        gst_no,
        business_branches,
        no_of_staff,
        countryId,
        stateId,
      },
    });

    const admin = await prisma.user.create({
      data: {
        businessId: business.id,
        is_admin: true,
        name: adminUser.name,
        email: adminUser.email,
        phone: adminUser.phone,
      },
    });

    return NextResponse.json({ business, admin }, { status: 201 });
  } catch (error) {
    console.error("Error creating business/admin:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
