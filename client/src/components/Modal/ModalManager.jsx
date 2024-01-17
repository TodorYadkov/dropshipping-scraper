import { AddEbayProductModal } from './AddEbayProductModal.jsx';
import { AddProductModal } from './AddProductModal.jsx';
import { DeleteProductModal } from './DeleteProductModal.jsx';
import { EditProductModal } from './EditProductModal.jsx';

export const ModalManager = ({ useModal, data, closeModal }) => {

    return (
        <>
            {useModal === 'AddProductModal' && <AddProductModal toggleModal={closeModal} />}
            {useModal === 'AddEbayProductModal' && <AddEbayProductModal toggleModal={closeModal} product={data} />}
            {useModal === 'EditProductModal' && <EditProductModal toggleModal={closeModal} product={data} />}
            {useModal === 'DeleteProductModal' && <DeleteProductModal toggleModal={closeModal} product={data} />}
        </>
    );
};