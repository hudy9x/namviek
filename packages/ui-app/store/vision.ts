import { create } from 'zustand';

interface Vision {
  id: string,
  vision: string,
  dueDate: number,
}


interface VisionsState {
  visions: Vision[]
}

export const useVisionStore = create<VisionsState>(set => ({
  visions: [{
    id: '123-456',
    vision: 'testing',
    dueDate: Date.now()

  }]
}))
