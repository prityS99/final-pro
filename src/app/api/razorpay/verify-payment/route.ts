import { NextResponse } from "next/server";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import { InputFile } from "node-appwrite/file";
import { databases, storage, IDHelper } from "@/lib/appwriteServer";

const DB_ID = process.env.APPWRITE_DATABASE_ID!;
const SUBSCRIPTIONS_COLLECTION_ID = process.env.APPWRITE_SUBSCRIPTIONS_COLLECTION_ID!;
const INVOICE_BUCKET_ID = process.env.APPWRITE_INVOICE_BUCKET_ID!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;

// ------------------------------------------------------------
// Validate Razorpay Signature
// ------------------------------------------------------------
function verifyRazorpay(orderId: string, paymentId: string, signature: string) {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return expected === signature;
}

// ------------------------------------------------------------
// Generate Invoice PDF → Return Buffer
// ------------------------------------------------------------
async function createInvoicePDF(data: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(20).text("Subscription Invoice", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Customer: ${data.name}`);
    doc.text(`Email: ${data.email}`);
    doc.text(`Phone: ${data.phone}`);
    doc.text(`User ID: ${data.userId}`);
    doc.moveDown();

    doc.text(`Plan: ${data.planName}`);
    doc.text(`Plan ID: ${data.planId}`);
    doc.text(`Billing Cycle: ${data.billingCycle}`);
    doc.text(`Amount Paid: ₹${data.price}`);
    doc.moveDown();

    doc.text(`Order ID: ${data.razorpay_order_id}`);
    doc.text(`Payment ID: ${data.razorpay_payment_id}`);
    doc.text(`Payment Status: Paid`);
    doc.moveDown();

    doc.text(`Invoice Date: ${new Date().toLocaleString()}`);
    doc.moveDown();

    doc.text("Thank you for your purchase!", { align: "center" });

    doc.end();
  });
}

// ------------------------------------------------------------
// POST Handler
// ------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user,
      plan,
    } = body;

    // 1. Verify Razorpay Signature
    if (
      !verifyRazorpay(razorpay_order_id, razorpay_payment_id, razorpay_signature)
    ) {
      return NextResponse.json(
        { ok: false, message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // 2. Prepare Subscription Document
    const now = Date.now();
    const nextMonth = now + 30 * 24 * 60 * 60 * 1000;

    const subscription = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,

      planId: plan.planId,
      planName: plan.planName,
      price: plan.price,
      billingCycle: plan.billingCycle,
      currency: "INR",

      startDate: new Date(now).toISOString(),
      endDate: new Date(nextMonth).toISOString(),
      nextBillingDate: new Date(nextMonth).toISOString(),

      status: "active",

      razorpay_order_id,
      razorpay_payment_id,
      paymentStatus: "paid",

      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    };

    // 3. Generate Invoice PDF
    const pdfBuffer = await createInvoicePDF({
      ...subscription,
      razorpay_order_id,
      razorpay_payment_id,
    });

    // 4. Upload Invoice to Appwrite Storage
const uploaded = await storage.createFile(
  INVOICE_BUCKET_ID,
  IDHelper.unique(),
  InputFile.fromBuffer(pdfBuffer, `invoice_${Date.now()}.pdf`),
  [
    "read(\"role:guests\")",      
    "read(\"role:users\")",         
    "create(\"role:guests\")",    
    "create(\"role:users\")"
  ],
);

    
const fileUrl = `${ENDPOINT}/v1/storage/buckets/${INVOICE_BUCKET_ID}/files/${uploaded.$id}/download?project=${PROJECT_ID}`;


    // 6. Save Subscription Record With Invoice Info
    const docToSave = {
      ...subscription,
      invoice_file_id: uploaded.$id,
      invoice_url: fileUrl,
    };

    const saved = await databases.createDocument(
      DB_ID,
      SUBSCRIPTIONS_COLLECTION_ID,
      IDHelper.unique(),
      docToSave
    );

    return NextResponse.json({
      ok: true,
      subscription: saved,
      invoice: uploaded,
      invoice_url: fileUrl,
    });
  } catch (err: any) {
    console.error("verify-payment error:", err);
    return NextResponse.json(
      { ok: false, message: err.message },
      { status: 500 }
    );
  }
}
