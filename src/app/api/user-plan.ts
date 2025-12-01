import { account } from "@/lib/appwrite.config";
import { databases } from "@/lib/appwriteServer";
import { NextApiRequest, NextApiResponse } from "next";


const DB_ID = process.env.APPWRITE_DATABASE_ID!;
const USER_PLAN_COLLECTION_ID = process.env.APPWRITE_USER_PLAN_COLLECTION_ID!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get current logged-in user
    const session = await account.getSession("current");
    const userId = session.userId;

    // Fetch user's plan
    const result = await databases.listDocuments(DB_ID, USER_PLAN_COLLECTION_ID, [
      // Optional: Query.equal("userId", userId)
    ]);

    const planDoc = result.documents.find(doc => doc.userId === userId);

    res.status(200).json({ ok: true, plan: planDoc?.plan || "free" });
  } catch (err: any) {
    console.error("Error fetching user plan:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
}
