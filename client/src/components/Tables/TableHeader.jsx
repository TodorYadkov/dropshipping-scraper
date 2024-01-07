export const TableHeader = ({ headings }) => {

    return (
        <thead>
            <tr>
                {headings.map((heading, index) => (
                    <th key={index} className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                        {heading}
                    </th>
                ))}
            </tr>
        </thead>
    );
};