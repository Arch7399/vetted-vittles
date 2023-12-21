// Import necessary libraries and modules
import dotenv from 'dotenv';
import path from 'path';
import payload, { Payload } from 'payload';
import type { InitOptions } from 'payload/config';
import nodemailer from 'nodemailer';

// Configure dotenv to load environment variables
dotenv.config({
  path: path.resolve(__dirname, "../.env")
});

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth : {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  }
})

// Global cache to store the Payload CMS client and promise
let cached = (global as any).payload;

// Initialize the cache if it doesn't exist
if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  }
}

// Interface for function arguments
interface Args {
  initOptions?: Partial<InitOptions>,
}

// Function to get the Payload CMS client
export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
  // Check if the Payload secret is missing
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('Payload secret is missing');
  }

  // If a client is already cached, return it immediately
  if (cached.client) {
    return cached.client;
  }

  // If no promise is cached, initialize Payload with options
  if (!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: "onboarding@resend.dev",
        fromName: "vettedvittles"
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    // Await the client from the cached promise
    cached.client = await cached.promise;
  } catch (e: unknown) {
    // Handle any errors during initialization
    throw e;
  }

  return cached.client;
}
