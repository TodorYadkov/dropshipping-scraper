import { useModal } from '../../hooks/useModal.js';

import { ButtonPrimary } from '../Buttons/ButtonPrimary.jsx';
import { AddProductModal } from '../Modal/AddProductModal.jsx';

import { ProductOffsetSelector } from '../Pagination/ProductOffsetSelector.jsx';
import { SearchInput } from '../SearchInput.jsx';
import { DropdownSorts } from '../Sorts/DropdownSorts.jsx';

export const ProductOptions = () => {
	const [productModal, toggleProductModal] = useModal();

	return (
		<div className="flex flex-col sm:flex-row sm:gap-2 gap-5 justify-between items-center">
			<div className="flex flex-col-reverse sm:flex-row sm:gap-2 gap-5 items-center sm:mb-0">
				<SearchInput />

				<ButtonPrimary title="Add Product" toggle={toggleProductModal}/>
                
				{productModal && <AddProductModal toggleModal={toggleProductModal} />}
			</div>

			<div className="flex gap-2">
				<DropdownSorts />

				<ProductOffsetSelector />
			</div>
		</div>
	);
};
