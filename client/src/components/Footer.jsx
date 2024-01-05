export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-3 flex flex-col items-center text-center text-gray-500">
            <div className="w-full bg-gray-900 p-4 text-center">
                <p>
                    <span className="ml-1">Copyright © </span>
                    2023-{currentYear}
                    <a
                        className="ml-1 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
                        href="https://github.com/TodorYadkov/dropshipping-scraper"
                        rel="noreferrer nofollow"
                        target="blank"
                    >
                        Amazon Scraper
                    </a>
                </p>
            </div>
        </footer>
    );
};