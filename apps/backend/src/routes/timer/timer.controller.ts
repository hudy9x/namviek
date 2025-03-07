import {
  BaseController,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseMiddleware,
} from "../../core";
import { authMiddleware } from "../../middlewares";
import { TimerRepository } from "@database";
import { AuthRequest } from "../../types";

@Controller("/timer")
@UseMiddleware([authMiddleware])
export class TimerController extends BaseController {
  private timerRepo: TimerRepository;

  constructor() {
    super();
    this.timerRepo = new TimerRepository();
  }

  @Post("/start")
  async startTimer(
    @Req() req: AuthRequest,
    @Body() body: { taskId: string }
  ) {
    const { taskId } = body;
    const userId = req.authen.id;

    if (!taskId) {
      throw new Error('Task ID is required');
    }

    // Check if there's already a running timer
    const runningTimer = await this.timerRepo.findRunningTimerByUserId(userId);
    
    if (runningTimer) {
      throw new Error('You already have a running timer. Please stop it before starting a new one.');
    }

    const timer = await this.timerRepo.create({
      taskId,
      userId,
      startTime: new Date(),
      endTime: null,
      duration: 0
    });

    return timer;
  }

  @Post("/stop")
  async stopTimer(
    @Req() req: AuthRequest,
    @Body() body: { timerId?: string }
  ) {
    const { timerId } = body;
    const userId = req.authen.id;

    let timer;
    
    if (timerId) {
      // If timerId is provided, find that specific timer
      timer = await this.timerRepo.findById(timerId);
      
      if (!timer || timer.userId !== userId || timer.endTime !== null) {
        throw new Error('No running timer found with the provided ID');
      }
    } else {
      // If timerId is not provided, find the running timer for this user
      timer = await this.timerRepo.findRunningTimerByUserId(userId);
      
      if (!timer) {
        throw new Error('No running timer found');
      }
    }

    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - timer.startTime.getTime()) / 1000);

    const updatedTimer = await this.timerRepo.update(timer.id, {
      endTime,
      duration
    });

    return updatedTimer;
  }

  @Get("/current")
  async getCurrentTimer(@Req() req: AuthRequest) {
    const userId = req.authen.id;
    
    const timer = await this.timerRepo.findRunningTimerByUserId(userId);
    
    if (!timer) {
      throw new Error('No running timer found');
    }

    return timer;
  }

  @Get("/logs/:taskId")
  async getTimerLogs(@Req() req: AuthRequest) {
    const { taskId } = req.params;
    const userId = req.authen.id;
    
    // Get pagination parameters from query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 7;
    
    // Get total count for pagination
    const totalCount = await this.timerRepo.countByTaskId(taskId, userId);
    
    // Get paginated timer logs
    const timerLogs = await this.timerRepo.findByTaskIdPaginated(
      taskId, 
      userId,
      page,
      limit
    );
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    
    return {
      data: timerLogs,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages
      }
    };
  }
} 