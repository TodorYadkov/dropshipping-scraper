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

function App() {
	const [heading, setHeading] = useState(null);

	useEffect(() => {
		api.get('/').then((data) => setHeading(data.hello));
	}, []);

	return (
		<>
			<Modal></Modal>
		</>
	);
}

export default App;
