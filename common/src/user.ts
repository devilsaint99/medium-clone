import z from "zod";

export const signUpSchema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6)
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
})


//type inference in zod
export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
