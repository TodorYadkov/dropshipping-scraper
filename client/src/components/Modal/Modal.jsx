import { ModalHeader } from "./ModalHeader.jsx";

export const Modal = ({ title, Content, toggleModal }) => {

	return (
		<div className={`z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`} >

			<div className="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay" onClick={toggleModal} />

			<div className="z-50 w-full mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
				< div className="text-left modal-content" >
					{/* <!-- Header --> */}
					<ModalHeader title={title} toggleModal={toggleModal} />

					{/* <!-- Body --> */}
					<Content toggleModal={toggleModal} />
				</div>
			</div>
		</div>
	);
};
