import { Inngest } from "inngest";

// Fix Node.js 18+ fetch localhost IPv6 resolution issue with Inngest Dev Server
if (process.env.NODE_ENV === 'development' && !process.env.INNGEST_BASE_URL) {
  process.env.INNGEST_BASE_URL = "http://127.0.0.1:8288/";
}

// Create a client to send and receive events
export const inngest = new Inngest({ id: "lms-platform" });
