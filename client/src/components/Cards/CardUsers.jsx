import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Tooltip } from '../Tooltip.jsx';

export const CardUsers = ({ usersData, onModalClick }) => {
	const [isVisible, setIsVisible] = useState(false);

	const [searchParams] = useSearchParams();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setIsVisible(true);
		}, 500);

		return () => clearTimeout(timeoutId);

	}, []);

	return (
		<div className="flex flex-col items-center cursor-default">

			{(isVisible && usersData.length === 0 && searchParams.get('search') === null) && (
				<div className="flex flex-col items-center justify-center p-10 mt-4 bg-white rounded-md">
					<svg className="inline-block w-7 h-7 text-gray-900" viewBox="0 0 640 512" >
						<path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
					</svg>

					<p className="inline-block align-middle ml-1 text-2xl text-center font-semibold text-gray-900">No registered users yet!</p>
				</div>
			)}

			{(isVisible && usersData.length === 0 && searchParams.get('search') !== null) && (
				<div className="flex items-center justify-center p-10 mt-4 bg-white rounded-md">
					<svg className="inline-block w-7 h-7 text-gray-900" viewBox="0 0 640 512">
						<path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
					</svg>

					<p className="inline-block align-middle ml-1 text-2xl font-semibold text-gray-900">No found users</p>
				</div>
			)}

			{usersData.length > 0 &&
				usersData.map((user) => (
					<div key={user._id} className="w-full max-w-sm mt-4 lg:max-w-full lg:flex rounded-lg overflow-hidden">
						<div className="flex-none w-full h-48 overflow-hidden text-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l">
							<img
								className="block w-full h-full"
								src={user.avatarURL ? user.avatarURL : "https://res.cloudinary.com/framevibe/image/upload/v1705609288/xfq6pgcrwaybffifd3fk.png"}
								alt={user.name}
							/>
						</div>
						{/* TODO */}
						<div className="flex flex-col justify-between p-4 leading-normal bg-white border-b border-l border-r border-gray-200 rounded-b lg:w-full lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r">
							<div className="mb-8">
								{user.availability && (
									<p className="flex items-center text-sm text-gray-600">
										<svg
											className="w-4 h-4 mr-2"
											viewBox="0 0 512 512"
										>
											{user.availability === 'Out of Stock' && (
												<path fill='red' d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
											)}

											{user.availability === 'In Stock' && (
												<path fill='green' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
											)}

											{(user.availability !== 'Out of Stock') && (user.availability !== 'In Stock') && (
												<path fill='darkblue' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
											)}
										</svg>
										{user.availability}
									</p>
								)}

								<p className="mb-2 text-xl font-bold text-gray-900">
									{user.name ? (
										<Link
											to={user.amazonUrl}
											target="blank"
											rel="noopener noreferrer"
										>
											{user.name}
										</Link>
									) : 'Waiting for a new product to be scraped...'
									}
								</p>

								<div className="flex flex-col text-base text-gray-700">
									<p>
										Amazon Price: {user.priceAmazon ? `${user.priceAmazon.toFixed(2)} ${user.currencyAmazon}` : 'No price'}
									</p>

									{user.priceEbay ? (
										<Link
											to={user.ebayUrl}
											target="blank"
											rel="noopener noreferrer"
										>
											<p>
												Ebay Price: {' '}
												{user.priceEbay && `${user.priceEbay.toFixed(2)} ${user.currencyEbay}`}
												{user?.currencyEbayOriginal && <sup className='ml-1 italic'>({`${user.priceEbayOriginal.toFixed(2)} ${user.currencyEbayOriginal}`})</sup>}
											</p>
										</Link>
									) : (
										<>
											{!user.ebayUrl ? (
												<p className="flex items-center" onClick={() => onModalClick('AddEbayProductModal', { ...user })}>
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

									{user?.profit ? (
										<p>
											Profit: <span className={`${user.profit < 0 && 'fill-red-500 text-red-500 inline-flex items-center gap-1'}`}>
												{user.profit && `${user.profit} ${user.currencyAmazon}`}
												{user.profit < 0 && (
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
											{!user.ebayUrl ? <p className='text-white'>-</p> : <p>Profit: <em>Calculating...</em></p>}
										</>
									)}
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-sm">
									<p className="leading-none text-gray-900">
										Rating: {user.rating}
									</p>
									<p className="text-gray-600">
										Last Updated: {(user.updatedAt !== '1970-01-01T00:00:00.000Z') && formatDateToTimeAgo(user.updatedAt)}
									</p>
								</div>

								<div className="flex justify-center gap-2 ml-auto mr-2">
									<div className="mr-1">
										{user.error && (
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
													message={user.error}
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
											onClick={() => onModalClick('EditProductModal', { ...user })}
										>
											<path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
										</svg>
										<Tooltip message="Edit" />
									</div>

									<div className="relative group">
										<svg
											className="block w-6 h-6 fill-red-600 cursor-pointer p-1 hover:opacity-70"
											viewBox="0 0 448 512"
											onClick={() => onModalClick('DeleteProductModal', { ...user })}
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
