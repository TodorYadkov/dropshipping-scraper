import { Link } from 'react-router-dom';

import { formatDateToTimeAgo } from '../../util/formatDateToTimeAgo.js';

import { Tooltip } from '../Tooltip.jsx';

export const TableExtensionsData = ({ extensionsData, onModalClick }) => {
    // TODO
    return (
        <tbody className="cursor-default">

            {extensionsData.length === 0 && (
                <tr className="text-center bg-white">
                    <td colSpan={9} className="gap-2 py-5 text-lg border-b border-gray-200">
                        <svg className="inline-block w-8 h-8 text-gray-900" viewBox="0 0 28 28" fill="none">
                            <path d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                            <path d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z" stroke="currentColor" strokeWidth="2"></path>
                            <text x="50%" y="65%" textAnchor="middle" alignmentBaseline="middle" fontSize="12" fill="#fff" fontWeight="bold">x</text>
                        </svg>

                        <p className="inline-block align-middle ml-1 text-2xl font-semibold text-gray-900">No extension added yet!
                            <span className="cursor-pointer hover:text-indigo-600" onClick={() => onModalClick('AddProductModal')}> Add from here.</span>
                        </p>
                    </td>
                </tr>
            )}

            {extensionsData.length > 0 && extensionsData.map(extension => (
                <tr key={extension._id} className="bg-white hover:bg-gray-50">

                    <td className="px-5 py-5 text-sm  border-b border-gray-200 w-1/4">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {extension.extensionName}
                            <Tooltip message={'Extension Name'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {extension.priceAmazon ? `${extension.priceAmazon.toFixed(2)} ${extension.currencyAmazon}` : 'No price'}
                            <Tooltip message={'Is Logged'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        {extension.priceEbay ? (
                            <>
                                <Link to={extension.ebayUrl} target="blank" rel="noopener noreferrer">
                                    <p className="text-gray-900 whitespace-wrap text-center hover:text-indigo-500 relative group">
                                        {extension.priceEbay && `${extension.priceEbay.toFixed(2)} ${extension.currencyEbay}`}
                                        <Tooltip message={'Open eBay Product'} />
                                    </p>
                                </Link>
                                {extension?.currencyEbayOriginal && (
                                    <p className='italic text-xs text-center cursor-default relative group'>({`${extension.priceEbayOriginal.toFixed(2)} ${extension.currencyEbayOriginal}`})
                                        <Tooltip message={'Original eBay Price'} direction="bottom" customTailwindClass="not-italic" />
                                    </p>
                                )}
                            </>
                        ) : (
                            <>
                                {!extension.ebayUrl && (
                                    <p className="text-gray-900 whitespace-wrap text-center hover:text-indigo-500 cursor-cell relative group" onClick={() => onModalClick('AddEbayProductModal', { ...extension })}>
                                        Add eBay product
                                        <Tooltip message={'Add eBay Product'} />
                                    </p>
                                )}
                            </>
                        )}
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">

                        {extension?.profit ? (
                            <p className={`${extension.profit > 0 ? 'text-green-600 fill-green-600' : 'fill-red-500 text-red-500'} flex gap-1 justify-center items-center whitespace-wrap text-center relative group`}>
                                {extension.profit !== 0 ? `${extension.profit} ${extension.currencyAmazon}` : '-'}
                                {extension.profit <= 0 ? (
                                    <svg
                                        className="w-4 h-4"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                                        {/* <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /> */}
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-4 h-4"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                                    </svg>
                                )}
                                {extension.profit >= 0 ? <Tooltip message={'Profit'} /> : <Tooltip message={'The product is sold at a loss!'} customTailwindClass="bg-red-500" />}
                            </p>
                        ) : (
                            <>
                                {!extension.ebayUrl ? (
                                    <p className="text-gray-900 whitespace-wrap text-center relative group">
                                        -
                                        <Tooltip message={'No eBay product'} />
                                    </p>
                                ) : (
                                    <p className="text-gray-900 whitespace-wrap text-center relative group">
                                        Calculating...
                                        <Tooltip message={'Waiting scraping'} />
                                    </p>
                                )}
                            </>
                        )}

                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {extension.availability || '-'}
                            {extension.availability && <Tooltip message={'Availability'} />}
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {extension.rating || '-'}
                            {extension.rating && <Tooltip message={'Rating'} />}
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {extension.updatedAt !== '1970-01-01T00:00:00.000Z' ? formatDateToTimeAgo(extension.updatedAt) : "-"}
                            {extension.updatedAt !== '1970-01-01T00:00:00.000Z' && <Tooltip message={'Last Updated'} />}
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap flex items-center justify-center relative group">
                            {extension.error
                                ? (
                                    <>
                                        <svg
                                            className="fill-red-600 group-hover:text-gray-900"
                                            height="24"
                                            width="24"
                                            viewBox="0 0 512 512">
                                            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                        </svg>
                                        <Tooltip message={extension.error} direction="left" customTailwindClass="mb-1" />
                                    </>
                                ) : (
                                    '-'
                                )}
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <div className="flex justify-center gap-2">
                            <div className="relative group">
                                <svg
                                    className="block w-6 h-6 fill-indigo-600 cursor-pointer p-1 hover:opacity-70"
                                    viewBox="0 0 512 512"
                                    onClick={() => onModalClick('EditProductModal', { ...extension })}
                                >
                                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                </svg>
                                <Tooltip message="Edit" />
                            </div>

                            <div className="relative group">
                                <svg
                                    className="block w-6 h-6 fill-red-600 cursor-pointer p-1 hover:opacity-70"
                                    viewBox="0 0 448 512"
                                    onClick={() => onModalClick('DeleteProductModal', { ...extension })}
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

        </tbody >
    );
};