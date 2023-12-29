import { useEffect, useState } from 'react';
import { api } from './util/http-requester.js';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Dashboard } from './pages/Dashboard.jsx';

function App() {
	const [heading, setHeading] = useState(null);

	useEffect(() => {
		api.get('/').then((data) => setHeading(data.hello));
	}, []);

	return (
		<>
			<Dashboard></Dashboard>
		</>
	);
}

export default App;
