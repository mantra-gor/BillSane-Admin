import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRazorpay } from "@/lib/razorpay";

// Creates a Razorpay order for the chosen plan. The amount comes from the plan
// row, never from the client.
export async function POST(req: Request) {
  try {
    const { businessId, userId, planId } = await req.json();

    const [plan, user] = await Promise.all([
      prisma.plan.findUnique({ where: { id: Number(planId) } }),
      prisma.user.findFirst({ where: { id: Number(userId), businessId: Number(businessId) } }),
    ]);
    if (!plan || !user) {
      return NextResponse.json({ error: "Plan or user not found" }, { status: 404 });
    }

    const amount = Math.round(Number(plan.price) * 100); // rupees -> paise
    const { client, keyId } = getRazorpay();
    const order = await client.orders.create({
      amount,
      currency: "INR",
      receipt: `biz_${businessId}_${Date.now()}`,
    });

    await prisma.payment.create({
      data: {
        razorpayOrderId: order.id,
        amount,
        currency: "INR",
        userId: user.id,
        businessId: user.businessId,
        planId: plan.id,
      },
    });

    return NextResponse.json(
      { orderId: order.id, amount, currency: "INR", keyId, planName: plan.name },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Could not start the payment" }, { status: 500 });
  }
}
