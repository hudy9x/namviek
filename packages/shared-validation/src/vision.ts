import { z } from "zod";
import { safeParse } from "./lib";
import { Vision } from '@prisma/client';

const vision = z.object({
  title: z.string().min(1, 'Vision name is required '),
  assigneeIds: z.array(z.string()).nonempty(),
  orgId: z.string().min(1, 'Organization is required'),
  projectId: z.string().min(1, 'Project is required'),
  dueDate: z.date(),
  desc: z.string(),

  createdBy: z.string(),
  createdAt: z.date(),
  updatedBy: z.string(),
  updatedAt: z.date()
}).partial()

const visionSchema = vision.required({
  title: true,
  assigneeIds: true,
  orgId: true,
  projectId: true,
  dueDate: true,
})

export const validateVision = (data: Partial<Vision>) => {
  return safeParse(visionSchema, data)
}
