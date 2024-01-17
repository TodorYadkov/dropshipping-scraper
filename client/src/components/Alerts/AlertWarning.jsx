export const AlertWarning = () => {
	return (
		<div className="inline-flex w-full max-w-sm ml-3 overflow-hidden bg-white rounded-lg shadow-md">
			<div className="flex items-center justify-center w-12 bg-yellow-500">
				<svg
					className="w-6 h-6 text-white fill-current"
					viewBox="0 0 40 40"
				>
					<path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
				</svg>
			</div>

			<div className="px-4 py-2 -mx-3">
				<div className="mx-3">
					<span className="font-semibold text-yellow-500">
						Warning
					</span>
					<p className="text-sm text-gray-600">
						Image size is too large.
					</p>
				</div>
			</div>

			<div className="cursor-pointer ml-auto mr-2 mt-2" >
				<svg
					className="text-black fill-current"
					width="18"
					height="18"
					viewBox="0 0 18 18"
				>
					<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
				</svg>
			</div>
		</div>
	);
};
