import { Timer } from '@prisma/client'
import { pmClient } from './_prisma'

const mdTimer = pmClient.timer

export class TimerRepository {
  async create(data: Omit<Timer, 'id' | 'createdAt' | 'updatedAt'>) {
    return mdTimer.create({
      data
    })
  }

  async update(id: string, data: Partial<Timer>) {
    return mdTimer.update({
      where: { id },
      data
    })
  }

  async findRunningTimerByUserId(userId: string) {
    return mdTimer.findFirst({
      where: {
        userId,
        endTime: null
      }
    })
  }

  async findById(id: string) {
    return mdTimer.findUnique({
      where: { id }
    })
  }

  async findByTaskIdPaginated(taskId: string, userId: string, page = 1, limit = 7) {
    const skip = (page - 1) * limit;
    
    return mdTimer.findMany({
      where: { 
        taskId,
        userId 
      },
      orderBy: {
        startTime: 'desc'
      },
      skip,
      take: limit
    });
  }

  async countByTaskId(taskId: string, userId: string) {
    return mdTimer.count({
      where: {
        taskId,
        userId
      }
    });
  }

  async findByTaskId(taskId: string) {
    return mdTimer.findMany({
      where: { taskId },
      orderBy: {
        startTime: 'desc'
      },
      take: 15
    })
  }
} 