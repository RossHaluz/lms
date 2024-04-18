import connect from "@/lib/mongodb";
import CategoryModel from "@/models/category";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = auth();
    const values = await req.json();
    await connect();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newCategory = await CategoryModel.create({ ...values });

    return NextResponse.json(newCategory);
  } catch (error) {
    console.log(error.message);
  }
}
