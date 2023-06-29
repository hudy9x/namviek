import { render } from '@testing-library/react';

import GoalieNextjs from './goalie-nextjs';

describe('GoalieNextjs', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<GoalieNextjs />);
		expect(baseElement).toBeTruthy();
	});
});
