import { createInvoiceTs } from "@/lib/createInvoicePdf";
import { NextResponse } from "next/server";
import { Client, Databases, ID } from "node-appwrite";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const invoice = createInvoiceTs({
      userId: body.userId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      planName: body.planName,
      planPrice: body.planPrice,
      paymentId: body.paymentId,
      orderId: body.orderId,
      subscriptionDate: body.subscriptionDate,
      expiryDate: body.expiryDate
    });

    // Init Appwrite
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setKey(process.env.APPWRITE_API_KEY!);

    const databases = new Databases(client);

    // Save invoice into database
    const saved = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      ID.unique(),
      invoice
    );

    return NextResponse.json({
      success: true,
      invoice: saved
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
