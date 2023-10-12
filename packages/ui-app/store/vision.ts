import { create } from 'zustand';

export interface Vision {
  id: string,
  title: string
  assigneeIds: string[],
  orgId: string,
  projectId: string,
  dueDate: Date,
  desc: string,
  createdBy: string,
  createdAt: Date,
  updatedBy: string,
  updatedAt: Date,
}


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
