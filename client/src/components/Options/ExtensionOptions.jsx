import { useMemo } from 'react';

import { SORTING_KEYS } from '../../util/constants.js';

import { useModal } from '../../hooks/useModal.js';

import { ButtonPrimary } from '../Buttons/ButtonPrimary.jsx';
import { ButtonRefresh } from '../Buttons/ButtonRefresh.jsx';
import { AddExtensionModal } from '../Modal/AddExtensionModal.jsx';
import { OffsetSelector } from '../Pagination/OffsetSelector.jsx';
import { SearchInput } from './SearchInput.jsx';
import { DropdownSorts } from '../Sorts/DropdownSorts.jsx';

export const ExtensionOptions = ({ onRefresh }) => {
	const [extensionModal, toggleExtensionModal] = useModal();

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
			[SORTING_KEYS.EXTENSION_ERROR_DESC]: 'With Error',
			[SORTING_KEYS.EXTENSION_ERROR_ASC]: 'Without Error',
		});
	}, []);

	return (
		<div className="flex flex-col sm:flex-row sm:gap-2 gap-5 justify-between items-center">
			<div className="flex flex-col-reverse sm:flex-row sm:gap-2 gap-5 items-center sm:mb-0">
				<SearchInput />

				<ButtonRefresh onRefresh={onRefresh} />

				<ButtonPrimary title="Add Extension" toggle={toggleExtensionModal} >
					<svg
						className="w-5 h-5 inline-block mr-1"
						viewBox="0 0 512 512"
						fill="currentColor"
					>
						<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
					</svg>
				</ButtonPrimary>

				{extensionModal && <AddExtensionModal toggleModal={toggleExtensionModal} />}

			</div>

			<div className="flex gap-2">
				<DropdownSorts sortingCriteria={sortingCriteria} />

				<OffsetSelector />
			</div>
		</div>
	);
};