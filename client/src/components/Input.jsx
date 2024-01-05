export const Input = ({ text, type, name, value, error, onChange, onBlur }) => {
	return (
		<label className="block mb-3">
			<span className="text-sm text-gray-700">{text}</span>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className="block indent-2 w-full mt-1 border border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
			/>
			{error && <p className="text-xs -mb-4 text-red-600">{error}</p>}
		</label>
	);
};
