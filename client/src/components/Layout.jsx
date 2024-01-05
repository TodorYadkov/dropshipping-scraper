import { Footer } from './Footer.jsx';
import { Header } from './Header.jsx';
import { SideBar } from './SideBar.jsx';

export const Layout = ({ children }) => {
	return (
		<div className="flex h-screen bg-gray-200 font-roboto">
			<SideBar />

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
