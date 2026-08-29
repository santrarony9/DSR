import mongoose from "mongoose";

let MONGODB_URI = process.env.MONGODB_URI || "";
if (MONGODB_URI && !MONGODB_URI.includes("dsrevent_db")) {
  const parts = MONGODB_URI.split("mongodb.net");
  if (parts.length === 2) {
    MONGODB_URI = parts[0] + "mongodb.net/dsrevent_db" + (parts[1].startsWith("/") ? parts[1].substring(1) : parts[1]);
  }
}
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
