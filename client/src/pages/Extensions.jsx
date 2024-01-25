/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useApi } from "../hooks/useApi.js";
import { useFilterData } from "../hooks/useFilterData.js";
import { useAppStateContext } from "../hooks/useAppStateContext.js";
import { useIntervalTimeToReceiveData } from "../hooks/useIntervalTimeToReceiveData.js";

import { DATA_TYPES, REDUCER_TYPES } from "../util/constants.js";

import { extensionService } from "../services/extensionService.js";

import { PageTitle } from "../components/PageTitle.jsx";
import { Loader } from "../components/Loader.jsx";
import { AlertError } from "../components/Alerts/AlertError.jsx";
import { ResponsiveComponent } from "../components/ResponsiveComponent.jsx";
import { DashboardSummary } from "../components/DashboardSummary.jsx";


export const Extensions = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [alert, setAlert] = useState('');

	const [extensionsData, setExtensionsLocalStateData] = useFilterData();
	const [_] = useIntervalTimeToReceiveData(fetchExtensionsData);

	const { getExtensions } = useApi(extensionService);
	const { appState, setExtensions: setExtensionGlobalStateData } = useAppStateContext();

	// Initial
	useEffect(() => {
		async function initialLoading() {
			setIsLoading(true);

			await fetchExtensionsData();
			setIsLoading(false);
		}

		initialLoading();

	}, []);

	// Handle change on global state
	useEffect(() => {
		setExtensionsLocalStateData(appState[REDUCER_TYPES.EXTENSIONS]);
	}, [appState[REDUCER_TYPES.EXTENSIONS]]);

	// Fetch extension statistic data from server
	async function fetchExtensionsData() {
		try {
			const extensionsData = await getExtensions();

			setExtensionsLocalStateData(extensionsData);
			setExtensionGlobalStateData(extensionsData);
		} catch (error) {
			console.error(error);
			addAlertMessage(error.message);
		}
	}

	function addAlertMessage(error) {
		setAlert(error);
	}

	function onCloseAlert() {
		setAlert('');
	}

	async function onRefreshClick() {
		return fetchExtensionsData();
	}

	return (
		<PageTitle title={'Extensions'}>
			<div className='relative'>

				{isLoading
					? <Loader />
					: (
						<>
							<DashboardSummary {...appState[REDUCER_TYPES.GENERAL_STATISTIC]} />

							{alert && (
								<div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5">
									<AlertError message={alert} close={onCloseAlert} />
								</div>
							)}

							<ResponsiveComponent dataType={DATA_TYPES.EXTENSION} localFilteredState={extensionsData} onRefresh={onRefreshClick} />
						</>
					)
				}
			</div>
		</PageTitle>
	);
};