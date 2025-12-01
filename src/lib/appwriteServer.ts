import { Client, Databases, Storage, ID } from "node-appwrite";

const client = new Client()
  .setEndpoint("https://tor.cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const IDHelper = ID;
