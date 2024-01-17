export const AlertError = ({ message, close }) => {
	return (
		<div className="flex w-full max-w-screen-sm ml-3 overflow-hidden bg-white rounded-lg shadow-md">
			<div className="flex items-center justify-center w-12 bg-red-500">
				<svg
					className="w-6 h-6 text-white fill-current"
					viewBox="0 0 40 40"
				>
					<path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
				</svg>
			</div>

			<div className="px-4 py-2 -mx-3">
				<div className="mx-3">
					<span className="font-semibold text-red-500">Error</span>
					<p className="text-sm text-gray-600">
						{message}
					</p>
				</div>
			</div>

			<div className="cursor-pointer ml-auto mr-2 mt-2" onClick={close}>
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
