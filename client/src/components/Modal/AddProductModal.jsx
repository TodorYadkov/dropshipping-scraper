import { ProductForm } from "../Forms/ProductForm.jsx";
import { Modal } from "./Modal.jsx";

export const AddProductModal = ({ toggleModal }) => {

    return (
        <Modal title={'Add Product'} Content={ProductForm} toggleModal={toggleModal} />
    );
};