import styles from './goalie-nextjs.module.css';

/* eslint-disable-next-line */
export interface GoalieNextjsProps {}

export function GoalieNextjs(props: GoalieNextjsProps) {
	return (
		<div className={styles['container']}>
			<h1>Welcome to GoalieNextjs!</h1>
		</div>
	);
}

export default GoalieNextjs;
