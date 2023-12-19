// Import the Next.js library
import next from "next";

// Define the port for the Next.js app
const PORT = Number(process.env.PORT) || 3000;

// Create a Next.js app instance
export const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
  port: PORT,
});

// Export the request handler for the Next.js app
export const nextHandler = nextApp.getRequestHandler();
