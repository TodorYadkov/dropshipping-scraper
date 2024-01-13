import { AddProductForm } from "../Forms/AddProductForm.jsx";
import { Modal } from "./Modal.jsx";

export const AddProductModal = ({ toggleModal }) => {

    return (
        <Modal title={'Add Product'} Content={AddProductForm} toggleModal={toggleModal} backdrop={false} />
    );
};