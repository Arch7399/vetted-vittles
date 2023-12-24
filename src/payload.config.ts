// Import necessary modules and functions from Payload CMS and other libraries
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";
import { ProductFiles } from "./collections/ProductFile";
import { Orders } from "./collections/Orders";

dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});

// Export the configuration object using buildConfig from Payload
export default buildConfig({
    // Set the server URL, using the above environment variable in path
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',

    // Define collections 
    collections: [Users, Products, Media, ProductFiles, Orders],

    // Specify custom routes, such as the admin route
    routes: {
        admin: '/sell', // Custom admin route, accessible at /sell
    },

    // Configuration for the Payload CMS admin interface
    admin: {
        user: 'users', //checks the users collection for everything auth related
        // Use the webpack bundler for asset bundling
        bundler: webpackBundler(),

        // Meta configuration for the admin interface
        meta: {
            titleSuffix: '- VettedVittles', // Set a title suffix for the admin interface
            favicon: '/favicon.ico', // Specify the favicon path
            ogImage: '/thumbnail.jpg', // Specify the Open Graph image path
        },
    },

    // Rate-limiting configuration for API requests
    rateLimit: {
        max: 2000, // Set the maximum number of requests within the specified time frame
    },

    // Configuration for the rich text editor (using Slate)
    editor: slateEditor({}),

    // Database configuration using the MongoDB adapter
    db: mongooseAdapter({
        url: process.env.MONGODB_URL!, // MongoDB connection URL from environment variable
    }),

    // TypeScript configuration for Payload CMS
    typescript: {
        // Specify the output file for TypeScript types
        outputFile: path.resolve(__dirname, 'payload-types.ts'), // Output types to payload-types.ts
    },
});
