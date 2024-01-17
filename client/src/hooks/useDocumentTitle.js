import { useRef, useEffect } from 'react'

export const useDocumentTitle = (title, prevailOnUnmount = false) => {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }
    }, []);
}