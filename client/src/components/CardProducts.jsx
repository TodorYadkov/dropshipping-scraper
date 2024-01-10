import { Link } from 'react-router-dom';

import { formatDateToTimeAgo } from '../util/formatDateToTimeAgo.js';

import { useModal } from '../hooks/useModal.js';

import { AddProductModal } from './Modal/AddProductModal.jsx';
import { Tooltip } from './Tooltip.jsx';

export const CardProducts = ({ data }) => {
	const [productModal, toggleProductModal] = useModal();

	return (
		<div className="flex flex-col items-center gap-5">
			<div className="mt-5">
				{data.length === 0 && (
					<div className="flex items-center justify-center p-10 bg-white rounded-md">
						<svg
							className="inline-block w-8 h-8 text-gray-900"
							viewBox="0 0 28 28"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
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

						<p className="inline-block align-middle ml-1 text-2xl font-semibold text-gray-900">
							No products added yet!
							<span
								className="cursor-pointer hover:opacity-70"
								onClick={toggleProductModal}
							>
								{' '}
								Add from here.
							</span>
						</p>
					</div>
				)}
			</div>

			{data.length > 0 &&
				data.map((product) => (
					<div
						key={product._id}
						className="w-full max-w-sm mt-6 lg:max-w-full lg:flex"
					>
						<img
							className="flex-none w-full h-48 overflow-hidden text-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l"
							src={product.imageURL}
							alt={product.name}
						/>
						<div className="flex flex-col justify-between p-4 leading-normal bg-white border-b border-l border-r border-gray-200 rounded-b lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r">
							<div className="mb-8">
								<p className="flex items-center text-sm text-gray-600">
									<svg
										className="w-4 h-4 mr-2"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										fill={
											product.availability ===
											'Out of Stock'
												? 'red'
												: 'green'
										}
									>
										{product.availability ===
										'Out of Stock' ? (
											<path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
										) : (
											<path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
										)}
									</svg>
									{product.availability}
								</p>
								<div className="mb-2 text-xl font-bold text-gray-900">
									{product.name}
								</div>
								<div className="flex flex-col text-base text-gray-700">
									<Link
										to={product.amazonUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										<p>
											Amazon Price:{' '}
											{`${product.priceAmazon} ${product.currency}`}
										</p>
									</Link>
									<Link
										to={product.ebayUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										<p>Ebay Price: TODO</p>
									</Link>
									<p>Profit: TODO</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-sm">
									<p className="leading-none text-gray-900">
										Rating: {product.rating}
									</p>
									<p className="text-gray-600">
										Last Updated:{' '}
										{formatDateToTimeAgo(product.updatedAt)}
									</p>
								</div>

								<div className="flex justify-center gap-2 ml-auto mr-2">
									<div className="mr-1">
										{product.error && (
											<div className="relative group">
												<svg
													xmlns="http://www.w3.org/2000/svg"
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
							</div>
						</div>
					</div>
				))}

			{productModal && (
				<AddProductModal toggleModal={toggleProductModal} />
			)}
		</div>
	);
};
