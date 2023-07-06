import { z } from "zod";
import { Task } from "@prisma/client";
import { safeParse } from "./lib";

const task = z.object({
  title: z.string().min(3),
  desc: z.string(),
  dueDate: z.date(),
  startDate: z.date(),
  projectId: z.string(),
  priority: z.string(),
  assigneeIds: z.array(z.string()),

  createdBy: z.string(),
  createdAt: z.date(),
  updatedBy: z.string(),
  updatedAt: z.date()
}).partial()

const taskSchema = task.required({
  title: true,
  desc: true,
  projectId: true
})

export const validateTask = (data: Partial<Task>) => {
  return safeParse(taskSchema, data)
}
