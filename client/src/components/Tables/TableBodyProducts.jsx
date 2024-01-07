import { formatDateToTimeAgo } from "../../util/formatDateToTimeAgo.js";

export const TableBodyProducts = ({ products }) => {
    return (
        <tbody>
            {products.length === 0 && <tr><td colSpan={5}>No products yet!</td></tr>}
            {products.length > 0 && products.map(product => (
                <tr key={product._id}>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                                <img
                                    className="w-full h-full"
                                    src={product.imageURL}
                                    alt={name}
                                />
                            </div>

                            <div className="ml-3">
                                <p className="text-gray-900 whitespace-nowrap">
                                    {product.name}
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-nowrap">
                            {`${product.price} ${product.currency}`}
                        </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-nowrap">
                            {product.availability}
                        </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-nowrap">
                            {product.rating}
                        </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-nowrap">
                            {formatDateToTimeAgo(product.updatedAt)}
                        </p>
                    </td>
                </tr>
            ))}
        </tbody >
    );
};