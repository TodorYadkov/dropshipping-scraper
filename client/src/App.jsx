import { useEffect, useState } from 'react';
import { api } from './util/http-requester.js';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Table1 } from './components/Table1.jsx';
import { Table2 } from './components/Table2.jsx';
import { Table3 } from './components/Table3.jsx';
import { Card } from './components/Card.jsx';
import { Modal } from './components/Modal.jsx';
import { Header } from './components/Header.jsx';
import { SideBar } from './components/SideBar.jsx';
import { StateProvider } from './contexts/StateContext.jsx';
import { Layout } from './components/Layout.jsx';
import { SearchInput } from './components/SearchInput.jsx';
import { AlertSuccess } from './components/Alerts/AlertSuccess.jsx';
import { AlertInfo } from './components/Alerts/AlertInfo.jsx';
import { AlertWarning } from './components/Alerts/AlertWarning.jsx';
import { AlertError } from './components/Alerts/AlertError.jsx';
import { ButtonPrimary } from './components/Buttons/ButtonPrimary.jsx';
import { ButtonRefresh } from './components/Buttons/ButtonRefresh.jsx';

function App() {
	const [heading, setHeading] = useState(null);

	useEffect(() => {
		api.get('/').then((data) => setHeading(data.hello));
	}, []);

	return (
		<>
			<StateProvider>
				<Layout>
					<h2>Test</h2>
					<ButtonRefresh></ButtonRefresh>
				</Layout>
			</StateProvider>
		</>
	);
}

export default App;
