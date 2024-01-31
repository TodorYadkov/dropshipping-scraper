import { useDocumentTitle } from '../../hooks/useDocumentTitle.js';

export const PageTitle = ({ title, children }) => {
	const titlePrefix = 'Amazon Scraper | ';

	useDocumentTitle(`${titlePrefix}${title}`);

	return <>{children}</>;
};