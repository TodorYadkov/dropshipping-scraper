import { AddEbayUrlForm } from "../Forms/AddEbayUrlForm.jsx";
import { Modal } from "./Modal.jsx";

export const AddEbayProductModal = ({ toggleModal, product }) => {

    return (
        <Modal title={'Add eBay URL'} Content={() => <AddEbayUrlForm product={product} toggleModal={toggleModal} />} toggleModal={toggleModal} backdrop={false} />
    );
};