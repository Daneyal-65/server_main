import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);
export const close = client
let conn;
try {
  conn = await client.connect();
  console.log("conn success!!!")
} catch(e) {
  console.error(e);
}

let db = conn.db("credential");

export default db;