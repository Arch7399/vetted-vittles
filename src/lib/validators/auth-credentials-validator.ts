// Importing the 'z' object from the "zod" library, which is a library for data validation.
import { z } from "zod";

// Defining a validation schema for authentication credentials using the 'z' library.
// The schema expects an object with 'email' and 'password' properties.
export const AuthCredentialsValidator = z.object({
    // Validating the 'email' property as a string with email format.
    email: z.string().email(),

    // Validating the 'password' property as a string with a minimum length of 8 characters.
    // A custom error message is provided for cases where the minimum length is not met.
    password: z.string().min(8, {
        message: "Required password length of at least 8 characters",
    })
});

// Defining a TypeScript type using the 'z.infer' utility to extract the type from the validation schema.
export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>;

// Explanation:
// - This code exports a validation schema named 'AuthCredentialsValidator' using the 'z' library.
// - The schema is designed to validate objects with 'email' and 'password' properties.
// - The 'email' property should be a string with a valid email format.
// - The 'password' property should be a string with a minimum length of 8 characters.
// - A custom error message is provided for the password validation.
// - Additionally, a TypeScript type 'TAuthCredentialsValidator' is defined to represent the inferred type from the validation schema.
