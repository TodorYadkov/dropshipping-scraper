/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { DATA_TYPES, REDUCER_TYPES } from '../util/constants.js';

import { useFilterData } from '../hooks/useFilterData.js';
import { useAppStateContext } from '../hooks/useAppStateContext.js';
import { useIntervalTimeToReceiveData } from '../hooks/useIntervalTimeToReceiveData.js';

import { Loader } from '../components/Shared/Loader.jsx';
import { PageTitle } from '../components/Shared/PageTitle.jsx';
import { DashboardSummary } from '../components/Summaries/DashboardSummary.jsx';
import { ResponsiveComponent } from '../components/Shared/ResponsiveComponent.jsx';

export const Extensions = () => {
	const [extensionsData, setExtensionsLocalStateData] = useFilterData();
	const [_] = useIntervalTimeToReceiveData(getExtensionsData);

	const { appState, setIsLoadingState, setRefreshState } = useAppStateContext();

	// Initial
	useEffect(() => {
		setIsLoadingState(true);
		getExtensionsData();
	}, []);

	// Handle change on global state
	useEffect(() => {
		setExtensionsLocalStateData(appState[REDUCER_TYPES.EXTENSIONS]);

	}, [appState[REDUCER_TYPES.EXTENSIONS]]);

	// Get extension data from global state
	function getExtensionsData() {
		// Start fetch extensions
		setRefreshState(true);

		const extensionsData = appState[REDUCER_TYPES.EXTENSIONS];

		setExtensionsLocalStateData(extensionsData);
	}

	return (
		<PageTitle title={'Extensions'}>
			<div className='relative'>

				{appState[REDUCER_TYPES.IS_LOADING_STATE]
					? <Loader />
					: (
						<>
							<DashboardSummary {...appState[REDUCER_TYPES.GENERAL_STATISTIC]} />

							<ResponsiveComponent dataType={DATA_TYPES.EXTENSION} localFilteredState={extensionsData} onRefresh={getExtensionsData} />
						</>
					)
				}
			</div>
		</PageTitle>
	);
};