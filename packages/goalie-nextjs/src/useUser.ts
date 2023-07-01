import { useContext } from "react";
import { GoalieContext } from "./GoalierProvider";

export const useUser = () => {
	const { user, setUser } = useContext(GoalieContext);

	return {
    user,
		setUser
	};
};
