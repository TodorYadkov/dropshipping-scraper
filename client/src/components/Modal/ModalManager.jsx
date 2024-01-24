import { AddEbayProductModal } from './AddEbayProductModal.jsx';
import { AddProductModal } from './AddProductModal.jsx';
import { DeleteExtensionModal } from './DeleteExtensionModal.jsx';
import { DeleteProductModal } from './DeleteProductModal.jsx';
import { EditExtensionModal } from './EditExtensionModal.jsx';
import { EditProductModal } from './EditProductModal.jsx';
import { LogoutExtensionModal } from './LogoutExtensionModal.jsx';
import { ResetErrorExtensionModal } from './ResetErrorExtensionModal.jsx';
import { StartExtensionModal } from './StartExtensionModal.jsx';
import { StopExtensionModal } from './StopExtensionModal.jsx';

export const ModalManager = ({ useModal, data, closeModal }) => {

    return (
        <>
            {useModal === 'AddProductModal' && <AddProductModal toggleModal={closeModal} />}
            {useModal === 'AddEbayProductModal' && <AddEbayProductModal toggleModal={closeModal} product={data} />}
            {useModal === 'EditProductModal' && <EditProductModal toggleModal={closeModal} product={data} />}
            {useModal === 'DeleteProductModal' && <DeleteProductModal toggleModal={closeModal} product={data} />}

            {useModal === 'DeleteExtensionModal' && <DeleteExtensionModal toggleModal={closeModal} extension={data} />}
            {useModal === 'EditExtensionModal' && <EditExtensionModal toggleModal={closeModal} extension={data} />}

            {useModal === 'ResetErrorExtensionModal' && <ResetErrorExtensionModal toggleModal={closeModal} extension={data} />}

            {useModal === 'StartExtensionModal' && <StartExtensionModal toggleModal={closeModal} extension={data} />}
            {useModal === 'StopExtensionModal' && <StopExtensionModal toggleModal={closeModal} extension={data} />}
            {useModal === 'LogoutExtensionModal' && <LogoutExtensionModal toggleModal={closeModal} extension={data} />}

        </>
    );
};