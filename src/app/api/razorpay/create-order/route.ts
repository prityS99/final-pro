import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = body.amount; // amount in rupees
    const receipt = body.receipt || `rcpt_${Date.now()}`;

    if (!amount) {
      return NextResponse.json(
        { ok: false, message: "Amount is required" },
        { status: 400 }
      );
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // Create order in paise
    const order = await razorpay.orders.create({
      amount: 499 * 100,   // Convert rupees -> paise
      currency: "INR",
      receipt,
    });

    return NextResponse.json({
      ok: true,
      order,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });

  } catch (err: any) {
    console.error("Razorpay Order Error:", err);
    return NextResponse.json(
      { ok: false, message: err.message },
      { status: 500 }
    );
  }
}


// import Razorpay from "razorpay";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const amount = body.amount; 
//     const receipt = body.receipt || `rcpt_${Date.now()}`;

//     if (!amount) {
//       return NextResponse.json({ ok: false, message: "amount required" }, { status: 400 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     // create order in paise
//     const order = await razorpay.orders.create({
//       amount: 499*100,
//       currency: "INR",
//       receipt: "receipt_"+Math.random().toString(36).substring(7)
//     });

//     return NextResponse.json({
//       ok: true,
//       order,
//       key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
//   }
// }
