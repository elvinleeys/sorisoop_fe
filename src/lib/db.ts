import mongoose, { Mongoose } from "mongoose";

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(".env.local에 MONGODB_URI를 설정해주세요.");
}

/**
 * Mongoose global 캐싱 (Next.js Hot Reload 방지)
 */
const cached: Cached = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;