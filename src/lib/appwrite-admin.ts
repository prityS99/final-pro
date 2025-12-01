// lib/appwrite-admin.ts
import { Client, Account, Databases, Users } from 'node-appwrite';

export const adminClient = new Client()
  .setEndpoint('https://tor.cloud.appwrite.io/v1') 
  .setProject('69156bc600281430dd89') 
  .setKey('standard_f04c6c2b42c3acfb917fec4667359f2f5068b708c1c8c2933acde3ce562dbffab511cc0a704fc99d0d628a4654638099eab39c4479def5ffc7ebb7f5ffd4a7e0af0195bfe924115ca4b4f4f94b037920e8e77e7c44a7c62a14523a37a3f196c8c9a5f4d72317b9c6bda8c32802af918247620ad65872cfab5f668b59bf8b1264'); // ⚠️ Admin API Key (server-only!)

export const adminAccount = new Account(adminClient);
export const adminDatabases = new Databases(adminClient);
export const adminUsers = new Users(adminClient);

// TypeScript helper for your database IDs
export const DATABASE = '692735a1001ef785fa25';
export const SUBSCRIPTIONS_COLLECTION_ID = '692735a1001ef785fa25';
