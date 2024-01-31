import { useCallback, useEffect, useState } from 'react';

import { Table } from '../Tables/Table.jsx';
import { Card } from '../Cards/Card.jsx';
import { ModalManager } from '../Modal/ModalManager.jsx';
import { Pagination } from '../Pagination/Pagination.jsx';
import { OptionsData } from '../Options/OptionsData.jsx';

export const ResponsiveComponent = ({ dataType, localFilteredState, onRefresh }) => {
	const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1360);
	const [modalState, setModalState] = useState({ modalName: '', data: {} });
	const [toggleModal, setToggleModal] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth >= 1360);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const modalHandler = useCallback((modalName, data) => {
		setModalState({ modalName, data: { ...data } });
		setToggleModal(true);

	}, [setToggleModal]);

	const closeModal = useCallback(() => {
		setToggleModal(false);

	}, [setToggleModal]);

	return (
		<div>
			<OptionsData dataTypes={dataType} onRefresh={onRefresh} />

			{isDesktop ? (
				<Table
					typeBody={dataType}
					data={localFilteredState.data}
					onModalClick={modalHandler}
				/>
			) : (
				<Card
					dataTypes={dataType}
					data={localFilteredState.data}
					onModalClick={modalHandler}
				/>
			)}

			{localFilteredState.totalDataCount !== 0 && <Pagination localFilteredState={localFilteredState} />}

			{toggleModal && (
				<ModalManager
					useModal={modalState.modalName}
					data={modalState.data}
					closeModal={closeModal}
				/>
			)}
		</div>
	);
};