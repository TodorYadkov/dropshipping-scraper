import { Component } from 'react';

import { CLIENT_PATHS } from '../util/paths.js';

export class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		console.log('React info for crash: ', info);
		console.error('React ErrorBoundary message: ', error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="flex gap-3 h-screen flex-col items-center justify-center bg-indigo-200">
					<h2>Oops! An unexpected error occurred!</h2>
					<p className="mb-2">
						Please try again later or contact support.
					</p>
					<a
						href={CLIENT_PATHS.DASHBOARD}
						className="px-4 py-2 font-medium tracking-wide  text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
					>
						Go back
					</a>
				</div>
			);
		}

		return this.props.children;
	}
}