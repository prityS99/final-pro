// import { Client, Account, Databases, Storage } from "appwrite";

// const client = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// export const account = new Account(client);
// export const databases = new Databases(client);
// export const storage = new Storage(client);


import { Client, Databases, Storage, ID, Account, TablesDB } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const tableDb = new TablesDB(client);
export const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string;
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE as string;

export { ID, client };
