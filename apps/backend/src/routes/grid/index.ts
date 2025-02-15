import { FieldType } from "@prisma/client";
import { BaseController, UseMiddleware, Controller, Put, Post, Body, Req, Delete, Param, Query } from "../../core";
import { authMiddleware, beProjectMemberMiddleware } from "../../middlewares";
import GridService, { IFilterAdvancedData } from "../../services/grid/grid.service";
import { AuthRequest } from "../../types";


@Controller('/project/grid')
@UseMiddleware([authMiddleware, beProjectMemberMiddleware])
export default class GridController extends BaseController {
  private gridService: GridService

  constructor() {
    super()
    this.gridService = new GridService()
  }

  @Put('')
  async update(@Req() req: AuthRequest, @Body() body: { value: string | string[], taskId: string, fieldId: string, type: FieldType }) {
    const { id: uid } = req.authen
    const ret = await this.gridService.update(uid, body)
    return ret
  }

  @Put('/update-many')
  async updateMany(@Req() req: AuthRequest, @Body() body: {
    taskIds: string[],
    data: {
      [fieldId: string]: { value: string, type: FieldType }
    }
  }) {

    console.log('Update multi field called')
    const { id: uid } = req.authen
    const ret = await this.gridService.updateMany(uid, body.taskIds, body.data)

    return ret

  }

  @Post('/query')
  async queryCustomField(@Body() body: {
    gridCollectionId: string,
    filter: IFilterAdvancedData,
    options: {
      cursor?: string
      limit?: number
      orderBy?: { [key: string]: 'asc' | 'desc' }
    }
  }) {
    try {
      const { filter, gridCollectionId, options } = body
      console.log('body', body)
      const result = await this.gridService.queryCustomField(gridCollectionId, filter, {
        limit: options ? options.limit : 50,
        cursor: options ? options.cursor : ''
      })
      return result
    } catch (error) {
      console.error('Custom query error:', error)
      return { status: 500, error: error.message }
    }
  }

  @Post('/create-row')
  async createRow(@Req() req: AuthRequest, @Body() body: {
    gridCollectionId: string,
    row: Record<string, string>
  }) {
    console.log('1')
    const { id: uid } = req.authen
    const ret = await this.gridService.createRow(uid, {
      gridCollectionId: body.gridCollectionId,
      data: body.row
    })
    return ret
  }

  @Post('/create')
  async create(@Req() req: AuthRequest, @Body() body: {
    gridCollectionId: string,
  }) {
    const { id: uid } = req.authen
    console.log('grid-row:create', body)
    const ret = await this.gridService.create(uid, {
      gridCollectionId: body.gridCollectionId
    })
    return ret
  }

  @Post('/create-rows')
  async createRows(@Req() req: AuthRequest, @Body() body: {
    gridCollectionId: string,
    rows: Record<string, string>[]
  }) {
    const { id: uid } = req.authen
    console.log('rows', body.rows)
    const result = await this.gridService.createRows(uid, {
      gridCollectionId: body.gridCollectionId,
      rows: body.rows
    });
    return result;
  }

  @Delete('/delete')
  async deleteRows(@Req() req: AuthRequest, @Query() params: {
    rowIds: string[]
  }) {
    const { id: uid } = req.authen
    console.log('params delete', params)
    const result = await this.gridService.deleteRows(params.rowIds);
    return result;
  }
}
