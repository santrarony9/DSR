import mongoose from "mongoose";

let MONGODB_URI = process.env.MONGODB_URI || "";
if (MONGODB_URI && !MONGODB_URI.includes("dsrevent_db")) {
  MONGODB_URI = MONGODB_URI.replace("mongodb.net/?", "mongodb.net/dsrevent_db?");
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
