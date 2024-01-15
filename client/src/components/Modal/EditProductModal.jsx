import { memo } from "react";

import { EditProductForm } from "../Forms/EditProductForm.jsx";
import { Modal } from "./Modal.jsx";

export const EditProductModal = memo(({ toggleModal, product }) => {
    return (
        <Modal title={'Edit product'} Content={() => <EditProductForm product={product} toggleModal={toggleModal} />} toggleModal={toggleModal} backdrop={false} />
    );
});

EditProductModal.displayName = 'EditProductModal';