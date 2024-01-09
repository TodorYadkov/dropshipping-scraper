import { Link } from "react-router-dom";

import { useModal } from "../../hooks/useModal.js";
import { formatDateToTimeAgo } from "../../util/formatDateToTimeAgo.js";

import { AddProductModal } from "../Modal/AddProductModal.jsx";

export const TableBodyProducts = ({ products }) => {
    const [productModal, toggleProductModal] = useModal();

    return (
        <tbody className="cursor-default">
            {products.length === 0 && (
                <tr className="text-center bg-white">
                    <td colSpan={6} className="gap-2 py-5 text-lg border-b border-gray-200">
                        <svg className="inline-block w-8 h-8 text-zinc-500" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                            <path d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z" stroke="currentColor" strokeWidth="2"></path>
                            <text x="50%" y="65%" textAnchor="middle" alignmentBaseline="middle" fontSize="12" fill="#fff" fontWeight="bold">x</text>
                        </svg>

                        <p className="inline-block align-middle ml-1 text-2xl font-semibold text-zinc-500">No products added yet!
                            <span className="cursor-pointer hover:opacity-70" onClick={toggleProductModal}> Add from here.</span>
                        </p>
                    </td>
                </tr>
            )}

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
                                ? <div className="relative group">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="fill-red-600 group-hover:text-gray-900"
                                        height="24"
                                        width="24"
                                        viewBox="0 0 512 512">
                                        <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                    </svg>
                                    <span className="tooltip-text absolute right-full bottom-full z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded-lg p-2 mr-2" id="left">
                                        {product.error}
                                    </span>
                                </div>
                                : '-'
                            }
                        </p>
                    </td>
                </tr>
            ))}

            {productModal && <AddProductModal toggleModal={toggleProductModal} />}
        </tbody >
    );
};