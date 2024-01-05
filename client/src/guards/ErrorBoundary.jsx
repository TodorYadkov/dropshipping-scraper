import React from 'react';

// This is the official React ErrorBoundary
// https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    // eslint-disable-next-line no-unused-vars
    static getDerivedStateFromError(error) {

        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log('React info for crash: ', info);
        console.error('React ErrorBoundary message: ', error);
    }

    render() {
        if (this.state.hasError) {

            return (
                <div className={`${styles['not-found']} max-width`}>
                    <h2>Oops! An unexpected type error occurred!</h2>
                    <p>Please try again later or contact support.</p>
                    <a
                        href="/dashboard"
                        className='
                        px-4
                        py-2
                        font-medium
                        tracking-wide
                        text-white
                        capitalize
                        transition-colors
                        duration-200
                        transform
                        bg-indigo-600
                        rounded-md
                        hover:bg-indigo-500
                        focus:outline-none
                        focus:bg-indigo-500
                        '>
                        Back to homepage
                    </a>
                </div >
            );
        }

        return this.props.children;
    }
}