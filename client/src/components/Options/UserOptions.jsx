import { useMemo } from 'react';

import { ButtonRefresh } from '../Buttons/ButtonRefresh.jsx';

import { OffsetSelector } from '../Pagination/OffsetSelector.jsx';
import { SearchInput } from './SearchInput.jsx';
import { DropdownSorts } from '../Sorts/DropdownSorts.jsx';
import { SORTING_KEYS } from '../../util/constants.js';

export const UserOption = ({ onRefresh }) => {

	const sortingCriteria = useMemo(() => {
		return ({
			[SORTING_KEYS.EXTENSION_NAME_ASC]: 'Name 🠅',
			[SORTING_KEYS.EXTENSION_NAME_DESC]: 'Name 🠇',
			[SORTING_KEYS.EXTENSION_LOGGED_ASC]: 'Logged In',
			[SORTING_KEYS.EXTENSION_LOGGED_DESC]: 'Not Logged In',
			[SORTING_KEYS.EXTENSION_WORKING_ASC]: 'Working',
			[SORTING_KEYS.EXTENSION_WORKING_DESC]: 'Not Working',
			[SORTING_KEYS.EXTENSION_LAST_SEEN_ASC]: 'Last Seen 🠅',
			[SORTING_KEYS.EXTENSION_LAST_SEEN_DESC]: 'Last Seen 🠇',
		});
	}, []);

	return (
		<div className="flex flex-col sm:flex-row sm:gap-2 gap-5 justify-between items-center">
			<div className="flex flex-col-reverse sm:flex-row sm:gap-2 gap-5 items-center sm:mb-0">
				<SearchInput />

				<ButtonRefresh onRefresh={onRefresh} />

			</div>

			<div className="flex gap-2">
				<DropdownSorts sortingCriteria={sortingCriteria} />

				<OffsetSelector />
			</div>
		</div>
	);
};
