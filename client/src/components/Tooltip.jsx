import { useState } from "react";

export const Tooltip = ({ message, direction = 'center', customTailwindClass }) => {
    const [currentDirection] = useState(() => {
        switch (direction) {
            case 'left':
                return 'right-0'
            case 'center':
                return 'left-1/2 -translate-x-1/2'
            case 'right':
                return 'left-full'
        }
    });

    const c = customTailwindClass || '';

    return (
        <span className={`${currentDirection} tooltip-text bottom-full absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs whitespace-nowrap rounded-lg py-1 px-2${c && ' ' + c}`} >
            {message}
        </span>
    );
};