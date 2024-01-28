import { useMemo } from 'react';

import { DATA_TYPES } from '../../util/constants.js';

import { CardProducts } from './CardProducts.jsx';
import { CardExtension } from './CardExtension.jsx';
import { CardUsers } from './CardUsers.jsx';

export const Card = ({ dataTypes, data, onModalClick }) => {

    const CardVariant = useMemo(() => {
        let CardComponent = null;

        switch (dataTypes) {
            case DATA_TYPES.PRODUCT:
                CardComponent = <CardProducts products={data} onModalClick={onModalClick} />
                break;

            case DATA_TYPES.EXTENSION:
                CardComponent = <CardExtension extensions={data} onModalClick={onModalClick} />
                break;

            case DATA_TYPES.USER:
                CardComponent = <CardUsers usersData={data} onModalClick={onModalClick} />
                break;
        }

        return CardComponent;

    }, [dataTypes, data, onModalClick]);

    return (CardVariant);
};
