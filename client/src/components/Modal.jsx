import { useState } from "react"

export const Modal = () => {

    const [modalState, setModalState] = useState(true);

    return (
        // 'opacity-0 pointer-events-none'      add this to hide it
        <div className={`z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center ${!modalState ? 'opacity-0 pointer-events-none' : ''}`}>

            <div className="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay" onClick={() => setModalState(false)} />

            <div className="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md" >
                <div className="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close" >
                    <svg
                        className="text-white fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                    >
                        <path
                            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                        />
                    </svg>
                    <span className="text-sm">(Esc)</span>
                </div>

                {/* <!-- Add margin if you want to see some of the overlay behind the modal --> */}
                <div className="px-6 py-4 text-left modal-content">
                    {/* <!-- Title --> */}
                    <div className="flex items-center justify-between pb-3">
                        <p className="text-2xl font-bold">
                            Modal Title
                        </p>
                        <div className="z-50 cursor-pointer modal-close" onClick={() => setModalState(false)}>
                            <svg
                                className="text-black fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                            >
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* <!-- Body --> */}
                    <p>Modal content.</p>

                    {/* <!-- Footer --> */}
                    <div className="flex justify-end pt-2">
                        <button className="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none" onClick={() => setModalState(false)} >
                            Close
                        </button>
                        <button className="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none" onClick={() => setModalState(false)} >
                            Action
                        </button>
                    </div>
                </div >
            </div >
        </div >
    );
}