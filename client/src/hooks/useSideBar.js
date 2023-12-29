import { useState } from "react"

export function useSidebar() {

    const [isOpen, setIsOpen] = useState(false);

    function changeSideBarState(state) {
        setIsOpen(state);
    }

    return {
        isOpen,
        changeSideBarState
    }
}