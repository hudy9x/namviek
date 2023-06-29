import { GoalieUser } from '../types';

const GOALIE_USER = 'GOALIE_USER';

export const saveGoalieUser = (user: GoalieUser) => {
	try {
		window.localStorage.setItem(GOALIE_USER, JSON.stringify(user));
	} catch (error) {
		return;
	}
};

export const getGoalieUser = () => {
	try {
		return JSON.parse(window.localStorage.getItem(GOALIE_USER) || '{}');
	} catch (error) {
		return null;
	}
};
