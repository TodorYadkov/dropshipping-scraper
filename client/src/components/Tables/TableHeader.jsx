export const TableHeader = ({ headings }) => {
    return (
        <thead>
            <tr>
                {headings.map((heading, index) => (
                    <th key={index} className="px-5 py-3 text-xs font-bold tracking-wider text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200 whitespace-nowrap cursor-default">
                        {heading}
                    </th>
                ))}
            </tr>
        </thead>
    );
};