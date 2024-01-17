import { useCallback, useEffect, useState } from 'react';

import { TABLE_BODY_TYPES } from '../util/constants.js';

import { Table } from './Tables/Table.jsx';
import { CardProducts } from './CardProducts.jsx';
import { ModalManager } from './Modal/ModalManager.jsx';
import { Pagination } from './Pagination/Pagination.jsx';
import { ProductOptions } from './Tables/ProductOptions.jsx';

export const ResponsiveProductsComponent = ({ localFilteredState }) => {
	const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1360);
	const [modalState, setModalState] = useState({ modalName: '', product: {} });
	const [toggleModal, setToggleModal] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth >= 1360);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const modalHandler = useCallback((modalName, product) => {
		setModalState({ modalName, product: { ...product } });
		setToggleModal(true);

	}, [setToggleModal]);

	const closeModal = useCallback(() => {
		setToggleModal(false);

	}, [setToggleModal]);

	return (
		<div>
			<ProductOptions />

			{isDesktop ? (
				<Table
					data={localFilteredState.products}
					typeBody={TABLE_BODY_TYPES.PRODUCT}
					onModalClick={modalHandler}
				/>
			) : (
				<CardProducts
					products={localFilteredState.products}
					onModalClick={modalHandler}
				/>
			)}

			<Pagination localFilteredState={localFilteredState} />

			{toggleModal && (
			<ModalManager
				useModal={modalState.modalName}
				data={modalState.product}
				closeModal={closeModal}
			/>
			)}
		</div>
	);
};
