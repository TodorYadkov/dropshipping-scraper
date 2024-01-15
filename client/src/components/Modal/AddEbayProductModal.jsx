import { memo } from "react";

import { AddEbayUrlForm } from "../Forms/AddEbayUrlForm.jsx";
import { Modal } from "./Modal.jsx";

export const AddEbayProductModal = memo(({ toggleModal, product }) => {

    return (
        <Modal title={'Add eBay URL'} Content={() => <AddEbayUrlForm product={product} toggleModal={toggleModal} />} toggleModal={toggleModal} backdrop={false} />
    );
});

AddEbayProductModal.displayName = 'AddEbayProductModal';