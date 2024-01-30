import { useState } from 'react';

// To use this component: On parent element add this tailwind styles:  relative group
export const Tooltip = ({ message, direction = 'center', customTailwindClass }) => {
    const [currentDirection] = useState(() => {
        switch (direction) {
            case 'center':
                return 'bottom-full left-1/2 -translate-x-1/2';
            case 'left':
                return 'bottom-full right-0';
            case 'right':
                return 'bottom-full left-full';
            case 'bottom':
                return 'top-full left-1/2 -translate-x-1/2';
            case 'bottom-left':
                return 'top-full -translate-x-1/2';
            case 'bottom-right':
                return 'top-full translate-x-1/2';
            case 'top-right':
                return 'bottom-full translate-x-1/2';
        }
    });

    const c = customTailwindClass || '';

    return (
        <span className={`${currentDirection} tooltip-text absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs whitespace-nowrap rounded-lg py-1 px-2${c && ' ' + c}`} >
            {message}
        </span>
    );
};