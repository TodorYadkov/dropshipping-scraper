export const ButtonPrimary = ({ title, toggle }) => {
	return (
		<button
			onClick={toggle}
			className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
		>
			{title}
		</button>
	);
};
