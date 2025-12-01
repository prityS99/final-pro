import { NextApiRequest, NextApiResponse } from "next";
import { databases, IDHelper } from "@/lib/appwriteServer";
import { account } from "@/lib/appwrite.config";

const DB_ID = process.env.APPWRITE_DATABASE_ID!;
const USER_PLAN_COLLECTION_ID = process.env.APPWRITE_USER_PLAN_COLLECTION_ID!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, message: "Method not allowed" });
    }

    const { plan } = req.body;
    if (!plan) return res.status(400).json({ ok: false, message: "Plan is required" });

    // Get logged-in user
    const session = await account.getSession("current");
    const userId = session.userId;

    // Check if user already has a plan
    const existing = await databases.listDocuments(DB_ID, USER_PLAN_COLLECTION_ID, []);

    const userPlan = existing.documents.find(doc => doc.userId === userId);

    if (userPlan) {
      // Update existing plan
      const updated = await databases.updateDocument(
        DB_ID,
        USER_PLAN_COLLECTION_ID,
        userPlan.$id,
        { plan, updatedAt: new Date().toISOString() }
      );
      return res.status(200).json({ ok: true, updated });
    }

    // Create new plan record
    const created = await databases.createDocument(
      DB_ID,
      USER_PLAN_COLLECTION_ID,
      IDHelper.unique(),
      {
        userId,
        plan,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );

    res.status(200).json({ ok: true, created });
  } catch (err: any) {
    console.error("Error saving user plan:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
}
