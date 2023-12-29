import { useEffect, useState } from 'react';
import { api } from './util/http-requester.js';

function App() {
	const [heading, setHeading] = useState(null);

	useEffect(() => {
		api.get('/').then((data) => setHeading(data.hello));
	}, []);

	return (
		<>
			{/* <h1>{heading}</h1> */}
			<h1 className="text-3xl font-bold underline">
				Hello world!!!
			</h1>
		</>
	);
}

export default App;
