import { User } from '@prisma/client';
import { httpPost } from './_req';

export const settingPeopleSv = {

  async create(data: Partial<User>) {
    return httpPost(`/api/auth/sign-up-private`, data);
  }
}
