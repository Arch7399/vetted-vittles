import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    myApiRoute: publicProcedure.query(() => {
        return "7399"
    }),
});

export type AppRouter = typeof appRouter;