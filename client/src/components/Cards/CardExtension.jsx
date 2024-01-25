import { Link } from 'react-router-dom';

import { formatDateToTimeAgo } from '../../util/formatDateToTimeAgo.js';

import { Tooltip } from '../Tooltip.jsx';

export const CardExtension = ({ extensions, onModalClick }) => {

	return (
		<div className="flex flex-col items-center cursor-default">

			{extensions.length > 0 &&
				extensions.map((extension) => (
					<div key={extension._id} className="w-full max-w-sm mt-4 lg:max-w-full lg:flex rounded-lg overflow-hidden">

						<div className="flex flex-col justify-between p-4 leading-normal bg-white border-b border-l border-r border-gray-200 rounded-b lg:w-full lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r">
							<div className="mb-8">

								<p className="mb-2 text-xl font-bold text-gray-900">{extension.extensionName}</p>

								<div className="flex flex-col gap-1 text-base text-gray-700">
									<p>Logged: {extension.isLogin ? 'Logged in' : 'Not logged in'}</p>
									<p>Working: {extension.isWork ? 'Working' : 'Not working'}</p>
									<p className='italic'>Last Seen: {extension.updatedAt !== '1970-01-01T00:00:00.000Z' ? formatDateToTimeAgo(extension.updatedAt) : "-"}</p>

								</div>
							</div>
							<div className="flex justify-center">

								<div className="flex justify-center gap-2">
									<div className="relative group">
										<svg
											viewBox="0 0 30.143 30.143"
											className={`w-6 h-6 ${extension.isWork ? 'fill-green-600' : 'fill-red-600'} ${extension.isWorkBrowser ? 'cursor-pointer' : 'cursor-not-allowed opacity-20'}`}
											onClick={
												extension.isWorkBrowser
													? (
														extension.isWork
															? () => onModalClick('StopExtensionModal', { ...extension })
															: () => onModalClick('StartExtensionModal', { ...extension })
													) : undefined
											}
										>
											<path d="M20.034,2.357v3.824c3.482,1.798,5.869,5.427,5.869,9.619c0,5.98-4.848,10.83-10.828,10.83 c-5.982,0-10.832-4.85-10.832-10.83c0-3.844,2.012-7.215,5.029-9.136V2.689C4.245,4.918,0.731,9.945,0.731,15.801 c0,7.921,6.42,14.342,14.34,14.342c7.924,0,14.342-6.421,14.342-14.342C29.412,9.624,25.501,4.379,20.034,2.357z" />
											<path d="M14.795,17.652c1.576,0,1.736-0.931,1.736-2.076V2.08c0-1.148-0.16-2.08-1.736-2.08 c-1.57,0-1.732,0.932-1.732,2.08v13.496C13.062,16.722,13.225,17.652,14.795,17.652z" />
										</svg>

										{extension.isWorkBrowser
											? (<Tooltip message={`${extension.isWork ? 'Stop' : 'Start'}`} customTailwindClass="mb-[1px]" direction='right' />)
											: (<Tooltip message="To use control, please login in extension" customTailwindClass="mb-[1px]" direction='right' />)
										}
									</div>

									<div className="relative group">
										<svg
											viewBox="0 0 1024 1024"
											className={`icon w-6 h-6 fill-indigo-600 ${extension.isWorkBrowser ? 'cursor-pointer' : 'cursor-not-allowed opacity-20'}`}
											stroke="#4f46e5"
											strokeWidth="50"
											onClick={
												extension.isWorkBrowser
													? () => onModalClick('LogoutExtensionModal', { ...extension })
													: undefined
											}
										>
											<path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z" />
										</svg>

										{extension.isWorkBrowser
											? (<Tooltip message="Logout" customTailwindClass="mb-[2px]" direction='right' />)
											: (<Tooltip message="To use control, please login in extension" customTailwindClass="mb-[2px]" direction='right' />)
										}
									</div>
								</div>


								<div className="flex justify-center gap-2 ml-auto mr-2">
									<div className="mr-1">
										{extension.error && (
											<div className="relative group">
												<svg
													className="fill-red-600 group-hover:text-gray-900"
													height="24"
													width="24"
													viewBox="0 0 512 512"
													onClick={() => onModalClick('ResetErrorExtensionModal', { ...extension })}
												>
													<path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
												</svg>

												<Tooltip
													message={extension.error}
													direction="left"
													customTailwindClass="mb-1"
												/>
											</div>
										)}
									</div>

									<div className="relative group">
										<svg
											className={`block w-6 h-6 fill-indigo-600 p-1 hover:opacity-70 ${extension.isLogin ? 'cursor-not-allowed opacity-20' : 'cursor-pointer'}`}
											viewBox="0 0 512 512"
											onClick={extension.isLogin ? undefined : () => onModalClick('EditExtensionModal', { ...extension })}
										>
											<path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
										</svg>

										{extension.isLogin
											? (<Tooltip message="To use actions, please logout from extension" direction='right' />)
											: (<Tooltip message="Edit" />)
										}
									</div>

									<div className="relative group">
										<svg
											className={`block w-6 h-6 fill-red-600 p-1 hover:opacity-70 ${extension.isLogin || extension.default ? 'cursor-not-allowed opacity-20' : 'cursor-pointer'}`}
											viewBox="0 0 448 512"
											onClick={extension.isLogin || extension.default ? undefined : () => onModalClick('DeleteExtensionModal', { ...extension })}
										>
											<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
										</svg>

										{extension.isLogin || extension.default
											? extension.default
												? (<Tooltip message={`${extension.extensionName} is default extension and cannot be deleted`} direction='left' />)
												: (<Tooltip message="To use actions, please logout from extension" direction='right' />)
											: (<Tooltip message="Delete" />)
										}
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
