import { EditProductForm } from "../Forms/EditProductForm.jsx";
import { Modal } from "./Modal.jsx";

export const EditProductModal = ({ toggleModal, product }) => {

    return (
        <Modal title={'Edit product'} Content={() => <EditProductForm product={product} toggleModal={toggleModal} />} toggleModal={toggleModal} backdrop={false} />
    );
};