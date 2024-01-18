import { useModal } from '../../hooks/useModal.js';

import { ButtonPrimary } from '../Buttons/ButtonPrimary.jsx';
import { ButtonRefresh } from '../Buttons/ButtonRefresh.jsx';
import { AddProductModal } from '../Modal/AddProductModal.jsx';

import { ProductOffsetSelector } from '../Pagination/ProductOffsetSelector.jsx';
import { SearchInput } from '../SearchInput.jsx';
import { DropdownSorts } from '../Sorts/DropdownSorts.jsx';

export const ProductOptions = ({ onRefresh }) => {
	const [productModal, toggleProductModal] = useModal();

	return (
		<div className="flex flex-col sm:flex-row sm:gap-2 gap-5 justify-between items-center">
			<div className="flex flex-col-reverse sm:flex-row sm:gap-2 gap-5 items-center sm:mb-0">
				<SearchInput />

				<ButtonRefresh onRefresh={onRefresh} />

				<ButtonPrimary title="Add Product" toggle={toggleProductModal} >
					<svg
						className="w-5 h-5 inline-block mr-1"
						viewBox="0 0 512 512"
						fill="currentColor"
					>
						<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
					</svg>
				</ButtonPrimary>

				{productModal && <AddProductModal toggleModal={toggleProductModal} />}

			</div>

			<div className="flex gap-2">
				<DropdownSorts />

				<ProductOffsetSelector />
			</div>
		</div>
	);
};
