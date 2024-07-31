import * as z from 'zod'

export const todoSchema = z.object({
    title: z.string().min(2,{message:"Title must be at least 2 characters"}),
    description: z.string().min(2,{message:"Description must be at least 2 characters"}),
    deadline: z.string(),
    status: z.enum(["To do","In progress","Under review","Finished"]),
    priority: z.enum(["Low","Medium","Urgent"]),
    createdDate: z.string(),
})