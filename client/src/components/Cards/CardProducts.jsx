import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { REDUCER_TYPES } from '../../util/constants.js';
import { formatDateToTimeAgo } from '../../util/formatDateToTimeAgo.js';

import { useAppStateContext } from '../../hooks/useAppStateContext.js';

import { Tooltip } from '../Shared/Tooltip.jsx';

export const CardProducts = ({ products, onModalClick }) => {
	const [isVisible, setIsVisible] = useState(false);

	const { appState } = useAppStateContext();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setIsVisible(true);
		}, 500);

		return () => clearTimeout(timeoutId);

	}, []);

	return (
		<div className="flex flex-col items-center cursor-default">

			{(isVisible && appState[REDUCER_TYPES.PRODUCTS].length === 0) && (
				<div className="flex flex-col items-center justify-center p-10 mt-4 bg-white rounded-md">
					<svg
						className="inline-block w-8 h-8 text-gray-900"
						viewBox="0 0 28 28"
						fill="none"
					>
						<path
							d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
							fill="currentColor"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinejoin="round"
						></path>
						<path
							d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
							stroke="currentColor"
							strokeWidth="2"
						></path>
						<text
							x="50%"
							y="65%"
							textAnchor="middle"
							alignmentBaseline="middle"
							fontSize="12"
							fill="#fff"
							fontWeight="bold"
						>
							x
						</text>
					</svg>

					<p className="inline-block align-middle ml-1 text-2xl text-center font-semibold text-gray-900">
						No products added yet!
						<span
							className="block cursor-pointer hover:text-indigo-600"
							onClick={() => onModalClick('AddProductModal')}
						>
							{' '}Add from here.
						</span>
					</p>
				</div>
			)}

			{(isVisible && appState[REDUCER_TYPES.PRODUCTS].length !== 0 && products.length === 0) && (
				<div className="flex items-center justify-center p-10 mt-4 bg-white rounded-md">
					<svg
						className="inline-block w-8 h-8 text-gray-900"
						viewBox="0 0 28 28"
						fill="none"
					>
						<path
							d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
							fill="currentColor"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinejoin="round"
						></path>
						<path
							d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
							stroke="currentColor"
							strokeWidth="2"
						></path>
						<text
							x="50%"
							y="65%"
							textAnchor="middle"
							alignmentBaseline="middle"
							fontSize="12"
							fill="#fff"
							fontWeight="bold"
						>
							x
						</text>
					</svg>

					<p className="inline-block align-middle ml-1 text-2xl font-semibold text-gray-900">No found products</p>
				</div>
			)}

			{products.length > 0 &&
				products.map((product) => (
					<div key={product._id} className="w-full max-w-sm mt-4 lg:max-w-full lg:flex rounded-lg overflow-hidden">
						<div className="flex-none w-full h-48 overflow-hidden text-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l">
							{product.imageURL ? (
								<Link
									to={product.amazonUrl}
									target="blank"
									rel="noopener noreferrer"
								>
									<img
										className="block w-full h-full"
										src={product.imageURL}
										alt={product.name}
									/>
								</Link>
							) : (
								<svg
									className="block w-full h-full bg-white"
									fill="#4b5563"
									viewBox="0 0 473.068 473.068"
								>
									<path d="M355.507,181.955c8.793-6.139,29.39-20.519,29.39-55.351v-71.77h9.814c4.49,0,8.17-3.679,8.17-8.169v-38.5
				                                c0-4.49-3.681-8.165-8.17-8.165H78.351c-4.495,0-8.165,3.675-8.165,8.165v38.5c0,4.491,3.67,8.169,8.165,8.169h9.82v73.071
				                                c0,34.499,10.502,42.576,29.074,53.89l80.745,49.203v20.984c-20.346,12.23-73.465,44.242-80.434,49.107
				                                c-8.793,6.135-29.384,20.51-29.384,55.352v61.793h-9.82c-4.495,0-8.165,3.676-8.165,8.166v38.498c0,4.49,3.67,8.17,8.165,8.17
				                                h316.361c4.49,0,8.17-3.68,8.17-8.17V426.4c0-4.49-3.681-8.166-8.17-8.166h-9.814v-63.104c0-34.493-10.508-42.572-29.069-53.885
				                                l-80.745-49.202v-20.987C295.417,218.831,348.537,186.822,355.507,181.955z M252.726,272.859l87.802,53.5
				                                c6.734,4.109,10.333,6.373,12.001,9.002c1.991,3.164,2.963,9.627,2.963,19.768v63.104H117.574v-61.793
				                                c0-19.507,9.718-26.289,16.81-31.242c5.551-3.865,54.402-33.389,85.878-52.289c4.428-2.658,7.135-7.441,7.135-12.611v-37.563
				                                c0-5.123-2.671-9.883-7.053-12.55l-87.54-53.339l-0.265-0.165c-6.741-4.105-10.336-6.369-11.998-9.009
				                                c-1.992-3.156-2.968-9.626-2.968-19.767V54.835h237.918v71.77c0,19.5-9.718,26.288-16.814,31.235
				                                c-5.546,3.872-54.391,33.395-85.869,52.295c-4.427,2.658-7.134,7.442-7.134,12.601v37.563
				                                C245.675,265.431,248.346,270.188,252.726,272.859z"/>
									<path d="M331.065,154.234c0,0,5.291-4.619-2.801-3.299c-19.178,3.115-53.079,15.133-92.079,15.133s-57-11-82.507-11.303
				                                c-5.569-0.066-5.456,3.629,0.937,7.391c6.386,3.758,63.772,35.681,71.671,40.08c7.896,4.389,12.417,4.05,20.786,0
				                                C259.246,196.334,331.065,154.234,331.065,154.234z"/>
									<path d="M154.311,397.564c-6.748,6.209-9.978,10.713,5.536,10.713c12.656,0,139.332,0,155.442,0
				                                c16.099,0,9.856-5.453,2.311-12.643c-14.576-13.883-45.416-23.566-82.414-23.566
				                                C196.432,372.068,169.342,383.723,154.311,397.564z"/>
								</svg>
							)}
						</div>
						<div className="flex flex-col justify-between p-4 leading-normal bg-white border-b border-l border-r border-gray-200 rounded-b lg:w-full lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r">
							<div className="mb-8">
								{product.availability && (
									<p className="flex items-center text-sm text-gray-600">
										<svg
											className="w-4 h-4 mr-2"
											viewBox="0 0 512 512"
										>
											{product.availability === 'Out of Stock' && (
												<path fill='red' d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
											)}

											{product.availability === 'In Stock' && (
												<path fill='green' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
											)}

											{(product.availability !== 'Out of Stock') && (product.availability !== 'In Stock') && (
												<path fill='darkblue' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
											)}
										</svg>
										{product.availability}
									</p>
								)}

								<p className="mb-2 text-xl font-bold text-gray-900">
									{product.name ? (
										<Link
											to={product.amazonUrl}
											target="blank"
											rel="noopener noreferrer"
										>
											{product.name}
										</Link>
									) : 'Waiting for a new product to be scraped...'
									}
								</p>

								<div className="flex flex-col text-base text-gray-700">
									<p>
										Amazon Price: {product.priceAmazon ? `${product.priceAmazon.toFixed(2)} ${product.currencyAmazon}` : 'No price'}
									</p>

									{product.priceEbay ? (
										<Link
											to={product.ebayUrl}
											target="blank"
											rel="noopener noreferrer"
										>
											<p>
												Ebay Price: {' '}
												{product.priceEbay && `${product.priceEbay.toFixed(2)} ${product.currencyEbay}`}
												{product?.currencyEbayOriginal && <sup className='ml-1 italic'>({`${product.priceEbayOriginal.toFixed(2)} ${product.currencyEbayOriginal}`})</sup>}
											</p>
										</Link>
									) : (
										<>
											{!product.ebayUrl ? (
												<p className="flex items-center" onClick={() => onModalClick('AddEbayProductModal', { ...product })}>
													Add eBay product
													<svg
														className="ml-2 w-4 h-4"
														viewBox="0 0 512 512"
														fill="#4b5563"
													>
														<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
													</svg>
												</p>
											) : (
												<p>Ebay Price:</p>
											)}
										</>
									)}

									{product?.profit ? (
										<p>
											Profit: <span className={`${product.profit < 0 && 'fill-red-500 text-red-500 inline-flex items-center gap-1'}`}>
												{product.profit && `${product.profit} ${product.currencyAmazon}`}
												{product.profit < 0 && (
													<svg
														className="w-4 h-4"
														viewBox="0 0 512 512"
													>
														<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
													</svg>
												)}
											</span>
										</p>
									) : (
										<>
											{!product.ebayUrl ? <p className='text-white'>-</p> : <p>Profit: <em>Calculating...</em></p>}
										</>
									)}
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-sm">
									<p className="leading-none text-gray-900">
										Rating: {product.rating}
									</p>
									<p className="text-gray-600">
										Last Updated: {(product.updatedAt !== '1970-01-01T00:00:00.000Z') && formatDateToTimeAgo(product.updatedAt)}
									</p>
								</div>

								<div className="flex justify-center gap-2 ml-auto mr-2">
									<div className="mr-1">
										{product.error && (
											<div className="relative group">
												<svg
													className="fill-red-600 group-hover:text-gray-900"
													height="24"
													width="24"
													viewBox="0 0 512 512"
												>
													<path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
												</svg>

												<Tooltip
													message={product.error}
													direction="left"
													customTailwindClass="mb-1"
												/>
											</div>
										)}
									</div>
									<div className="relative group">
										<svg
											className="block w-6 h-6 fill-indigo-600 cursor-pointer p-1 hover:opacity-70"
											viewBox="0 0 512 512"
											onClick={() => onModalClick('EditProductModal', { ...product })}
										>
											<path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
										</svg>
										<Tooltip message="Edit" />
									</div>

									<div className="relative group">
										<svg
											className="block w-6 h-6 fill-red-600 cursor-pointer p-1 hover:opacity-70"
											viewBox="0 0 448 512"
											onClick={() => onModalClick('DeleteProductModal', { ...product })}
										>
											<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
										</svg>
										<Tooltip message="Delete" />
									</div>
								</div>
							</div>
						</div>
					</div>
				))
			}

		</div>
	);
};
