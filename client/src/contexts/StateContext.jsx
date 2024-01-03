import { createContext, useState } from "react";

export const StateContext = createContext();
StateContext.displayName = 'StateContext';

export const StateProvider = ({ children }) => {

    const [isOpenSideBar, setIsOpenSideBar] = useState(false);


    function changeSideBarState(state) {
        setIsOpenSideBar(state);
    }

    const values = {
        isOpenSideBar,
        changeSideBarState
    };

    return (
        <StateContext.Provider value={values} >
            {children}
        </StateContext.Provider>
    );
}