/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
    kakao: any;
  }
  var mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null } | undefined;
}