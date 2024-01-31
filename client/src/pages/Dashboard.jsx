import { useEffect, useState } from 'react';

import { DATA_TYPES, REDUCER_TYPES } from '../util/constants.js';

import { useAppStateContext } from '../hooks/useAppStateContext.js';
import { useLocalProductState } from '../hooks/useLocalProductsState.js';
import { useIntervalTimeToReceiveData } from '../hooks/useIntervalTimeToReceiveData.js';

import { Loader } from '../components/Shared/Loader.jsx';
import { PageTitle } from '../components/Shared/PageTitle.jsx';
import { AlertError } from '../components/Alerts/AlertError.jsx';
import { DashboardSummary } from '../components/Summaries/DashboardSummary.jsx';
import { ResponsiveComponent } from '../components/Shared/ResponsiveComponent.jsx';

export const Dashboard = () => {
	const [alert, setAlert] = useState('');
	
	const [_] = useIntervalTimeToReceiveData(getProductsHandler);

	const { appState, setIsLoadingState, setRefreshState } = useAppStateContext();
	const { localFilteredState, setLocalProductsWithSameCurrencyAndProfit } = useLocalProductState(addAlertMessage);

	// Initial
	useEffect(() => {
		setIsLoadingState(true);
		getProductsHandler();

		// On load set up currency on local products
		setLocalProductsWithSameCurrencyAndProfit();
	}, []);

	// Get products from global state
	function getProductsHandler() {
		// Start fetch products
		setRefreshState(true);
	}

	function addAlertMessage(error) {
		setAlert(error);
	}

	function onCloseAlert() {
		setAlert('');
	}

	function onRefreshClick() {
		getProductsHandler();
	}

	return (
		<>
			{alert && (
				<div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<AlertError message={alert} close={onCloseAlert} />
				</div>
			)}

			<PageTitle title={'Dashboard'}>
				<div className='relative'>
					{appState[REDUCER_TYPES.IS_LOADING_STATE]
						? <Loader />
						: (
							<>
								<DashboardSummary {...appState[REDUCER_TYPES.GENERAL_STATISTIC]} />

								<ResponsiveComponent dataType={DATA_TYPES.PRODUCT} localFilteredState={localFilteredState} onRefresh={onRefreshClick} />
							</>
						)
					}
				</div>
			</PageTitle>
		</>
	);
};