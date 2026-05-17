import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("doc-appoint-project-db");

export const auth = betterAuth({
  // Enabling email and password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production for better security
  },

//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//   },

  // Database adapter
  database: mongodbAdapter(db, {
    client,
  }),
});