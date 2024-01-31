import { useMemo } from 'react';

import { DATA_TYPES } from '../../util/constants.js';

import { ProductOptions } from './ProductOptions.jsx';
import { ExtensionOptions } from './ExtensionOptions.jsx';
import { UserOption } from './UserOptions.jsx';

export const OptionsData = ({ dataTypes, onRefresh }) => {

	const Options = useMemo(() => {
		let OptionsComponent = null;

		switch (dataTypes) {
			case DATA_TYPES.PRODUCT:
				OptionsComponent = <ProductOptions onRefresh={onRefresh} />
				break;
			case DATA_TYPES.EXTENSION:
				OptionsComponent = <ExtensionOptions onRefresh={onRefresh} />
				break;
			case DATA_TYPES.USER:
				OptionsComponent = <UserOption onRefresh={onRefresh} />
				break;
		}

		return OptionsComponent;

	}, [dataTypes, onRefresh]);

	return (Options);
};