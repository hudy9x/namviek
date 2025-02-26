import { User } from '@prisma/client'
import { pmClient } from './_prisma'

const mdUser = pmClient.user

export class UserRepository {
  /**
   * Find a user by ID
   */
  async findById(id: string) {
    return mdUser.findUnique({
      where: { id }
    })
  }

  /**
   * Find a user by email
   */
  async findByEmail(email: string) {
    return mdUser.findUnique({
      where: { email }
    })
  }

  /**
   * Create a new user
   */
  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return mdUser.create({
      data
    })
  }

  /**
   * Update a user
   */
  async update(id: string, data: Partial<User>) {
    return mdUser.update({
      where: { id },
      data
    })
  }

  /**
   * Delete a user
   */
  async delete(id: string) {
    return mdUser.delete({
      where: { id }
    })
  }
} 