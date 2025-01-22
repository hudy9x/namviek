import { User, Organization } from '@prisma/client';

export type GoalieUser = Pick<User, 'id' | 'name' | 'email' | 'photo'> & { exp: number };

export interface GoalieContext {
  user: GoalieUser;
}

export type GoalieOrg = Pick<Organization, 'id' | 'name' | 'cover' | 'avatar' | 'desc'>;
