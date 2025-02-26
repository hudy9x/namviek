import {
  BaseController,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseMiddleware,
} from "../../core";
import { authMiddleware } from "../../middlewares";
import { UserRepository } from "@database";
import { AuthRequest } from "../../types";
import { compareHashPassword, hashPassword } from "../../lib/password";
import { CKEY, findNDelCaches } from "../../lib/redis";

@Controller("/profile")
@UseMiddleware([authMiddleware])
export class ProfileController extends BaseController {
  private userRepo: UserRepository;

  constructor() {
    super();
    this.userRepo = new UserRepository();
  }

  @Get("")
  async getProfile(@Req() req: AuthRequest) {
    const userId = req.authen.id;
    const user = await this.userRepo.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    // Remove sensitive information
    const { password, ...userInfo } = user;
    return userInfo;
  }

  @Put("")
  async updateProfile(
    @Req() req: AuthRequest,
    @Body() body: { name?: string; bio?: string; photo?: string }
  ) {
    const userId = req.authen.id;
    const { name, bio, photo } = body;
    
    const updatedUser = await this.userRepo.update(userId, {
      name: name !== undefined ? name : undefined,
      bio: bio !== undefined ? bio : undefined,
      photo
    });

    // Remove sensitive information
    const { password, ...userInfo } = updatedUser;


    await Promise.all([
        findNDelCaches([CKEY.USER_PROJECT]),
        findNDelCaches([CKEY.PROJECT_MEMBER])
    ])

    console.log('updated', userInfo)
    
    return userInfo
  }

  @Put("/password")
  async updatePassword(
    @Req() req: AuthRequest,
    @Body() body: { currentPassword: string; newPassword: string; confirmPassword: string }
  ) {
    const { currentPassword, newPassword, confirmPassword } = body;
    const userId = req.authen.id;
    
    // Validation
    if (!currentPassword) {
      throw new Error("Current password is required");
    }
    
    if (!newPassword) {
      throw new Error("New password is required");
    }
    
    if (newPassword.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    
    if (newPassword !== confirmPassword) {
      throw new Error("Password confirmation does not match");
    }
    
    // Get user with password
    const user = await this.userRepo.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    // Verify current password
    const isPasswordValid = await compareHashPassword(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    
    // Update password
    await this.userRepo.update(userId, {
      password: hashedPassword,
    });
    
    return { message: "Password updated successfully" };
  }
} 
