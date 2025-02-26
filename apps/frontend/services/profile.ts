import { httpGet, httpPut } from "./_req";

export interface ProfileUpdateData {
  name?: string;
  bio?: string;
  photo?: string
}

export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const profileService = {
  /**
   * Get user profile information
   */
  getProfile() {
    return httpGet("/api/profile");
  },

  /**
   * Update user profile information
   */
  updateProfile(data: ProfileUpdateData) {
    return httpPut("/api/profile", data);
  },

  /**
   * Update user password
   */
  updatePassword(data: PasswordUpdateData) {
    return httpPut("/api/profile/password", data);
  },
}; 
