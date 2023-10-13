import { create } from 'zustand';
import { Vision } from '@prisma/client';



interface VisionsState {
  visions: Vision[]
}

export const useVisionStore = create<VisionsState>(set => ({
  visions: [{
    id: '123-456',
    title: 'testing',
    assigneeIds: [''],
    orgId: '',
    projectId: '',
    dueDate: new Date(),
    desc: 'testing',
    createdBy: '',
    createdAt: new Date(),
    updatedBy: '',
    updatedAt: new Date(),
  }]
}))
