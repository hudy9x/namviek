import { FieldType } from "@prisma/client";
import { BaseController, UseMiddleware, Controller, Put, Post, Body, Req, Delete, Param, Query } from "../../core";
import { authMiddleware, beProjectMemberMiddleware } from "../../middlewares";
import GridService, { IFilterAdvancedData } from "../../services/grid/grid.service";
import { AuthRequest } from "../../types";
import { pusherTrigger } from "../../lib/pusher-server";
import { WebhookTriggerService } from '../../services/webhook/webhook.trigger.service'


@Controller('/project/grid')
@UseMiddleware([authMiddleware, beProjectMemberMiddleware])
export default class GridController extends BaseController {
  private gridService: GridService
  private webhookTriggerService: WebhookTriggerService

  constructor() {
    super()
    this.gridService = new GridService()
    this.webhookTriggerService = new WebhookTriggerService()
  }

  @Put('')
  async update(@Req() req: AuthRequest, @Body() body: { value: string | string[], rowId: string, fieldId: string, type: FieldType }) {
    const { id: uid } = req.authen
    const ret = await this.gridService.update(uid, body)

    // Trigger webhooks
    await this.webhookTriggerService.trigger(
      ret.gridCollectionId,
      'grid:row:updated',
      ret
    )

    // Trigger real-time update
    pusherTrigger('team-collab', `grid:changes.${ret.gridCollectionId}`, {
      action: 'update',
      data: ret,
      triggerBy: uid
    })

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
    const { id: uid } = req.authen
    const ret = await this.gridService.createRow(uid, {
      gridCollectionId: body.gridCollectionId,
      data: body.row
    })

    // Trigger webhooks
    await this.webhookTriggerService.trigger(
      body.gridCollectionId,
      'grid:row:created',
      ret
    )

    // Trigger real-time update
    pusherTrigger('team-collab', `grid:changes.${body.gridCollectionId}`, {
      action: 'create',
      data: ret,
      triggerBy: uid
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
    const result = await this.gridService.createRows(uid, {
      gridCollectionId: body.gridCollectionId,
      rows: body.rows
    });

    // Trigger real-time update for new rows
    // result.forEach(row => {
    //   pusherTrigger('team-collab', `grid:changes.${body.gridCollectionId}`, {
    //     action: 'create',
    //     data: row,
    //     triggerBy: uid
    //   })
    // })

    return result;
  }

  @Delete('/delete')
  async deleteRows(@Req() req: AuthRequest, @Query() params: {
    rowIds: string[]
  }) {
    const { id: uid } = req.authen
    const { result, row } = await this.gridService.deleteRows(params.rowIds)

    // Trigger webhooks
    await this.webhookTriggerService.trigger(
      row.gridCollectionId,
      'grid:row:deleted',
      { rowIds: params.rowIds, gridCollectionId: row.gridCollectionId }
    )

    // Trigger real-time update
    pusherTrigger('team-collab', `grid:changes.${row.gridCollectionId}`, {
      action: 'delete',
      data: params.rowIds,
      triggerBy: uid
    })

    return result
  }
}
