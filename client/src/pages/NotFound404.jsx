import { Link } from "react-router-dom";

export const NotFound404 = () => {

    return (
        <section className="flex items-center h-full p-16 dark:text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold dark:text-gray-600 md:text-3xl">Sorry, we couldn&apos;t find this page.</p>
                    <p className="mt-4 mb-8 dark:text-gray-400">But don&apos;t worry, you can find plenty of other things on our dashboard.</p>
                    <Link rel="noopener noreferrer" to="/" className="px-8 py-3 font-semibold rounded dark:bg-indigo-600 dark:text-white">Back to Dashboard</Link>
                </div>
            </div>
        </section>
    );
};

