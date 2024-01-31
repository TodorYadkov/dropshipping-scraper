export const ButtonPrimary = ({ title, toggle, children }) => {
	return (
		<button
			onClick={toggle}
			className="flex items-center justify-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
		>
			{children && children}
			{title}
		</button>
	);
};