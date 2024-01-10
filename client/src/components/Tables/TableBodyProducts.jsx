import { Link } from "react-router-dom";

import { useModal } from "../../hooks/useModal.js";
import { formatDateToTimeAgo } from "../../util/formatDateToTimeAgo.js";

import { AddProductModal } from "../Modal/AddProductModal.jsx";
import { Tooltip } from "../Tooltip.jsx";

export const TableBodyProducts = ({ products }) => {
    const [productModal, toggleProductModal] = useModal();

    return (
        <tbody className="cursor-default">
            {products.length === 0 && (
                <tr className="text-center bg-white">
                    <td colSpan={9} className="gap-2 py-5 text-lg border-b border-gray-200">
                        <svg className="inline-block w-8 h-8 text-gray-900" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                            <path d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z" stroke="currentColor" strokeWidth="2"></path>
                            <text x="50%" y="65%" textAnchor="middle" alignmentBaseline="middle" fontSize="12" fill="#fff" fontWeight="bold">x</text>
                        </svg>

                        <p className="inline-block align-middle ml-1 text-2xl font-semibold text-gray-900">No products added yet!
                            <span className="cursor-pointer hover:opacity-70" onClick={toggleProductModal}> Add from here.</span>
                        </p>
                    </td>
                </tr>
            )}

            {products.length > 0 && products.map(product => (
                <tr key={product._id} className="bg-white hover:bg-gray-50">
                    <td className="px-5 py-5 text-sm  border-b border-gray-200 w-1/4">
                        <div className="flex items-center">

                            <div className="flex-shrink-0 w-10 h-10 hover:opacity-70">
                                <img
                                    className="w-full h-full"
                                    src={product.imageURL}
                                    alt={product.name}
                                />
                            </div>

                            <div className="ml-3 cursor-pointer">
                                <p className="text-gray-900">
                                    {product.name}
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <Link to={product.amazonUrl} target="_blank" rel="noopener noreferrer">
                            <p className="text-gray-900 whitespace-wrap text-center hover:text-indigo-500 relative group">
                                {`${product.priceAmazon} ${product.currency}`}
                                <Tooltip message={'Open Amazon Product'} />
                            </p>
                        </Link>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <Link to={product.ebayUrl} target="_blank" rel="noopener noreferrer">
                            <p className="text-gray-900 whitespace-wrap text-center hover:text-indigo-500 relative group">
                                TODO
                                <Tooltip message={'Open eBay Product'} />
                            </p>
                        </Link>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            TODO
                            <Tooltip message={'Profit'} />
                        </p>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {product.availability}
                            <Tooltip message={'Availability'} />
                        </p>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {product.rating}
                            <Tooltip message={'Rating'} />
                        </p>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {formatDateToTimeAgo(product.updatedAt)}
                            <Tooltip message={'Last Updated'} />
                        </p>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap flex items-center justify-center">
                            {product.error
                                ? <div className="relative group">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="fill-red-600 group-hover:text-gray-900"
                                        height="24"
                                        width="24"
                                        viewBox="0 0 512 512">
                                        <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                    </svg>

                                    <Tooltip message={product.error} direction="left" customTailwindClass="mb-1" />
                                </div>
                                : '-'
                            }
                        </p>
                    </td>
                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <div className="flex justify-center gap-2">
                            <div className="relative group">
                                <svg className="block w-6 h-6 fill-indigo-600 cursor-pointer p-1 hover:opacity-70"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                </svg>
                                <Tooltip message="Edit" />
                            </div>

                            <div className="relative group">
                                <svg
                                    className="block w-6 h-6 fill-red-600 cursor-pointer p-1 hover:opacity-70"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg>
                                <Tooltip message="Delete" />
                            </div>
                        </div>
                    </td>
                </tr>
            ))
            }

            {productModal && <AddProductModal toggleModal={toggleProductModal} />}
        </tbody >
    );
};