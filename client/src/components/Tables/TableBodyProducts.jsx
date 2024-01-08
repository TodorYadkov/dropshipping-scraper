import { Link } from "react-router-dom";
import { formatDateToTimeAgo } from "../../util/formatDateToTimeAgo.js";

export const TableBodyProducts = ({ products }) => {
    return (
        <tbody>
            {products.length === 0 && <tr><td colSpan={5}>No products yet!</td></tr>}
            {products.length > 0 && products.map(product => (
                <tr key={product._id} className="bg-white">
                    <td className="px-5 py-5 text-sm  border-b border-gray-200">
                        <Link to={product.amazonUrl} target="_blank" rel="noopener noreferrer">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                    <img
                                        className="w-full h-full"
                                        src={product.imageURL}
                                        alt={product.name}
                                    />
                                </div>

                                <div className="ml-3">
                                    {/* TODO Chose how to show long text */}
                                    {/* <p className="text-gray-900 whitespace-nowrap max-w-xs overflow-hidden overflow-ellipsis"> */}
                                    <p className="text-gray-900 hover:text-indigo-700">
                                        {product.name}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200">
                        <p className="text-gray-900 whitespace-nowrap text-center">
                            {`${product.price} ${product.currency}`}
                        </p>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200">
                        <p className="text-gray-900 whitespace-nowrap text-center">
                            {product.availability}
                        </p>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200">
                        <p className="text-gray-900 whitespace-nowrap text-center">
                            {product.rating}
                        </p>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200">
                        <p className="text-gray-900 whitespace-nowrap text-center">
                            {formatDateToTimeAgo(product.updatedAt)}
                        </p>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200">
                        <p className="text-gray-900 whitespace-nowrap flex items-center justify-center">
                            {product.error
                                ? <div class="relative group">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="fill-red-600 group-hover:text-gray-900"
                                        height="24"
                                        width="24"
                                        viewBox="0 0 512 512">
                                        <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                    </svg>
                                    <span class="tooltip-text absolute right-full bottom-full z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded-lg p-2 mr-2" id="left">
                                        {product.error}
                                    </span>
                                </div>
                                : '-'
                            }
                        </p>
                    </td>
                </tr>
            ))}
        </tbody >
    );
};