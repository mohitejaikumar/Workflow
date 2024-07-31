"use client"

import { z } from "zod"

export const formSchema = z.object({
    title: z.string().min(2, {message: "Title must be at least 2 characters"}).max(100, {message: "Title must be less than 100 characters"}),
    description: z.string().min(2,{message:"Description must be at least 2 characters"}).max(1000,{message:"Description must be less than 1000 characters"}),
    priority: z.enum(["Urgent", "Low", "Medium"]),
    status: z.enum(["To do", "In progress", "Under review", "Finished"]),
    deadline: z.date(),
    createdDate:z.date(),
})

