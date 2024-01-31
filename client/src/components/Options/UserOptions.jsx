import { useMemo } from 'react';

import { SORTING_KEYS } from '../../util/constants.js';

import { ButtonRefresh } from '../Buttons/ButtonRefresh.jsx';
import { OffsetSelector } from '../Pagination/OffsetSelector.jsx';
import { SearchInput } from './SearchInput.jsx';
import { DropdownSorts } from '../Sorts/DropdownSorts.jsx';

export const UserOption = ({ onRefresh }) => {

	const sortingCriteria = useMemo(() => {
		return ({
			[SORTING_KEYS.USER_NAME_ASC]: 'Name 🠅',
			[SORTING_KEYS.USER_NAME_DESC]: 'Name 🠇',
			[SORTING_KEYS.USER_EMAIL_ASC]: 'Email 🠅',
			[SORTING_KEYS.USER_EMAIL_DESC]: 'Email 🠇',
			[SORTING_KEYS.USER_LOGIN_STATUS_ASC]: 'Logged In',
			[SORTING_KEYS.USER_LOGIN_STATUS_DESC]: 'Not Logged In',
			[SORTING_KEYS.USER_EXTENSIONS_ASC]: 'Extensions 🠅',
			[SORTING_KEYS.USER_EXTENSIONS_DESC]: 'Extensions 🠇',
			[SORTING_KEYS.USER_PRODUCTS_ASC]: 'Products 🠅',
			[SORTING_KEYS.USER_PRODUCTS_DESC]: 'Products 🠇',
			[SORTING_KEYS.USER_ROLE_USER]: 'User',
			[SORTING_KEYS.USER_ROLE_PREMIUM]: 'Premium',
			[SORTING_KEYS.USER_ROLE_ADMIN]: 'Admin',
			[SORTING_KEYS.USER_ACCOUNT_STATUS_ASC]: 'Account Status 🠅',
			[SORTING_KEYS.USER_ACCOUNT_STATUS_DESC]: 'Account Status 🠇',
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