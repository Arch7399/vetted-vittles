// Import necessary modules and functions from external libraries
"use client";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/trpc/client";
import { httpBatchLink } from "@trpc/client";

// Define a React component called Providers that takes children as props
const Providers = ({ children }: PropsWithChildren) => {
  // Create a state variable queryClient using the useState hook
  const [queryClient] = useState(() => new QueryClient());

  // Create a state variable trpcClient using the useState hook
  const [trpcClient] = useState(() =>
    // Initialize a trpc (transport) client with a configuration object
    trpc.createClient({
      // Configure links for the trpc client, here using httpBatchLink
      links: [
        httpBatchLink({
          // Set the URL for trpc requests using the NEXT_PUBLIC_SERVER_URL environment variable
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
          // Customize the fetch function for handling requests
          fetch(url, options) {
            return fetch(url, {
              ...options,
              // Include credentials in the request for authentication purposes
              credentials: "include",
            });
          },
        }),
      ],
    })
  );

  // Render the trpc.Provider and QueryClientProvider components with the configured clients
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

// Export the Providers component as the default export of this module
export default Providers;
