import z from "zod"

export const postCreateSchema = z.object({
    title: z.string().max(200),
    post: z.string()
})


export const postEditSchema = z.object({
    id: z.number(),
    title: z.string().max(200),
    post: z.string()
})
//type infer in zod
export type PostEditInput = z.infer<typeof postEditSchema>
export type PostCreateInput = z.infer<typeof postCreateSchema>