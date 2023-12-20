import { z } from "zod";

export const AuthCredentialsValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Required password length atleast 8 characters",
    })
});

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>;