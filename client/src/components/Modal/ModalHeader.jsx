export const ModalHeader = ({ title, toggleModal }) => {
    return (
        < div className="flex items-center justify-between px-6 py-4" >
            <p className="text-2xl font-bold">{title}</p>
            <div className="z-50 cursor-pointer modal-close" onClick={toggleModal} >
                <svg
                    className="text-black fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 18 18"
                >
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                </svg>
            </div>
        </div >
    );
};