import { useModal } from "../../hooks/useModal.js";

import { ButtonPrimary } from "../Buttons/ButtonPrimary.jsx";
import { AddProductModal } from "../Modal/AddProductModal.jsx";

import { ProductOffsetSelector } from "../Pagination/ProductOffsetSelector.jsx";
import { SearchInput } from "../SearchInput.jsx";
import { DropdownSorts } from "../Sorts/DropdownSorts.jsx";

export const TableOptions = () => {
    const [productModal, toggleProductModal] = useModal();

    return (
        <div className="flex justify-between">
            <div className="flex gap-2">
                <SearchInput />

                <ButtonPrimary title="Add Product" toggle={toggleProductModal} />
                {productModal && <AddProductModal toggleModal={toggleProductModal} />}
            </div>

            <div className="flex gap-2">
                <DropdownSorts />

                <ProductOffsetSelector />
            </div>
        </div>
    );
};