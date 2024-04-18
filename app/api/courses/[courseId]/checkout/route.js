import { stripe } from "@/lib/stripe";
import CourseModel from "@/models/course";
import PurchasesModel from "@/models/purchases";
import stripeCustomerModel from "@/models/stripeCustomer";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const user = await currentUser();

    if (!user || !user?.id || !user?.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unouthorized", { status: 401 });
    }

    const course = await CourseModel.findOne({
      _id: params?.courseId,
      isPublished: true,
    });

    const purchase = await PurchasesModel.findOne({
      userId: user?.id,
      courseId: params?.courseId,
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const line_items = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course?.title,
            description: course?.description,
          },
          unit_amount: Math.round(course?.price * 100),
        },
      },
    ];

    let stripeCustomer = await stripeCustomerModel
      .findOne({
        userId: user?.id,
      })
      .select("stripeCustomerId");

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user?.emailAddresses[0]?.emailAddress,
      });

      stripeCustomer = await stripeCustomerModel.create({
        userId: user?.id,
        stripeCustomerId: customer?.id,
      });
    }

    const session = await stripe?.checkout?.sessions?.create({
      customer: stripeCustomer?.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course?._id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course?._id}?canceled=1`,
      metadata: {
        courseId: course?._id.toString(),
        userId: user?.id.toString(),
      },
    });

    return NextResponse.json({ url: session?.url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
