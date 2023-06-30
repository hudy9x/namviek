'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { GoalieUser } from './types';
import { getGoalieUser } from './lib/util';
import useGoalieInProtectionMode from './useGoalieInProtectionMode';

interface IGoalieContext {
	user: GoalieUser | null;
	setUser: Dispatch<SetStateAction<GoalieUser | null>>;
}

export const GoalieContext = createContext<IGoalieContext>({
	user: null,
	setUser: user => {
		console.log('empty setUser function');
	}
});

export const GoalieProvider = function ({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<GoalieUser | null>(getGoalieUser());
  console.log('user', user)
  useGoalieInProtectionMode({user})

	return (
		<GoalieContext.Provider
			value={{
				user: user,
				setUser
			}}>
			{children}
		</GoalieContext.Provider>
	);
};

