import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useDataFetcher } from '../../hooks/useDataFetcher.js';

import { Footer } from './Footer.jsx';
import { Header } from './Header/Header.jsx';
import { SideBar } from './SideBar.jsx';
import { AlertError } from '../Alerts/AlertError.jsx';

export const Layout = ({ children }) => {
	const { isAuthenticated } = useAuthContext();
	const [serverErrorMessage, removeServerErrorMessageHandler] = useDataFetcher();

	return (
		<div className="flex h-screen bg-gray-200 font-roboto cursor-default">

			{serverErrorMessage && ((
				<div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<AlertError message={serverErrorMessage} close={removeServerErrorMessageHandler} />
				</div>
			))}

			{isAuthenticated && <SideBar />}

			<div className="flex-1 flex flex-col overflow-hidden">
				<Header />

				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
					<div className="container mx-auto px-6 py-8">
						{children}
					</div>
				</main>

				<Footer />
			</div>

		</div>
	);
};