import { User } from "@prisma/client";

export type GoalieUser = Pick<User, 'id' | 'name' | 'email' | 'photo'>;

export interface GoalieContext {
	user: GoalieUser;
}
