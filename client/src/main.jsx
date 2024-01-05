import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import { ErrorBoundary } from './guards/ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</BrowserRouter>
	</React.StrictMode>
);
