import { useEffect, useState } from 'react';
import { api } from './util/http-requester.js';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Table1 } from './pages/Table1.jsx';
import { Table2 } from './pages/Table2.jsx';
import { Table3 } from './pages/Table3.jsx';
import { Card } from './components/Card.jsx';
import { Modal } from './components/Modal.jsx';
import { Header } from './components/Header.jsx';
import { SideBar } from './components/SideBar.jsx';
import { StateProvider } from './contexts/StateContext.jsx';

function App() {
	const [heading, setHeading] = useState(null);

	useEffect(() => {
		api.get('/').then((data) => setHeading(data.hello));
	}, []);

	return (
		<>
			<StateProvider>
				<div className="flex h-screen bg-gray-200 font-roboto">
					<SideBar></SideBar>

					<div className="flex-1 flex flex-col overflow-hidden">
						<Header></Header>

						<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
							<div className="container mx-auto px-6 py-8">
								<slot />
							</div>
						</main>
					</div>
				</div>
			</StateProvider>
		</>
	);
}

export default App;
