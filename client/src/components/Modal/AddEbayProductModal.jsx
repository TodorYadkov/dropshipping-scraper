import { EbayUrlForm } from "../Forms/EbayUrlForm.jsx";
import { Modal } from "./Modal.jsx";

export const AddEbayProductModal = ({ toggleModal }) => {

    return (
        <Modal title={'Add eBay URL'} Content={EbayUrlForm} toggleModal={toggleModal} backdrop={false} />
    );
};