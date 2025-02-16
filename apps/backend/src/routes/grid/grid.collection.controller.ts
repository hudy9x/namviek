import { GridCollectionRepository } from '@database'
import {
  BaseController,
  Controller,
  Post,
  Get,
  Body,
  UseMiddleware,
  Query,
  Req,
  Param
} from '../../core'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'

interface CreateGridCollectionBody {
  title: string
  projectId: string
}

interface GetGridCollectionsQuery {
  projectId: string
}

@Controller('/grid-collections')
@UseMiddleware([authMiddleware])
export default class GridCollectionController extends BaseController {
  name: string
  private repository: GridCollectionRepository

  constructor() {
    super()
    this.name = 'grid-collection'
    this.repository = new GridCollectionRepository()
  }

  @Get('/')
  async getGridCollections(@Query() query: GetGridCollectionsQuery) {
    try {
      const { projectId } = query

      if (!projectId) {
        throw new Error('Project ID is required')
      }

      const collections = await this.repository.list(projectId)

      return collections
    } catch (error) {
      console.error('[Get Grid Collections] Error:', error)
      throw new Error('Failed to fetch grid collections')
    }
  }

  @Get('/:id')
  async getGridCollectionById(@Param() params) {
    try {
      const { id } = params

      if (!id) {
        throw new Error('Grid Collection ID is required')
      }

      const collection = await this.repository.findById(id)
      return collection
    } catch (error) {
      console.error('[Get Grid Collection] Error:', error)
      throw new Error('Failed to fetch grid collection')
    }
  }

  @Post('/')
  async createGridCollection(
    @Req() req: AuthRequest,
    @Body() body: CreateGridCollectionBody) {
    try {
      const { title, projectId } = body
      const { id: userId } = req.authen

      if (!title || !projectId) {
        throw new Error('Title and project ID are required')
      }

      const collection = await this.repository.create({
        title: title,
        projectId: projectId,
        icon: null,
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: null,
        updatedBy: null,
      })

      return collection
    } catch (error) {
      console.error('[Create Grid Collection] Error:', error)
      throw new Error('Failed to create grid collection')
    }
  }
} 
