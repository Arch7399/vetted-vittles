// Import necessary libraries and modules
import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";

// Create an Express app instance
const app = express();

// Define the port for the server
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

// Asynchronous function to start the server
const start = async () => {
  // Initialize the Payload CMS client
  const payload = await getPayloadClient({
    initOptions: {
      express: app, // Pass the Express app to Payload for integration
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Use Next.js request handler as middleware
  app.use((req, res) => nextHandler(req, res));

  // Start Next.js app and log messages
  nextApp.prepare().then(() => {
    payload.logger.info("Nextjs started");

    // Start the Express server and log the server URL
    app.listen(PORT, async () => {
      payload.logger.info(
        `Nextjs app URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

// Invoke the start function to initiate the server
start();
