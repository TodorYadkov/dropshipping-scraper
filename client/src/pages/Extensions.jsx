/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useApi } from "../hooks/useApi.js";
import { useFilterData } from "../hooks/useFilterData.js";
import { useIntervalTimeToReceiveData } from "../hooks/useIntervalTimeToReceiveData.js";

import { DATA_TYPES } from "../util/constants.js";

import { statisticService } from "../services/statisticService.js";

import { PageTitle } from "../components/PageTitle.jsx";
import { Loader } from "../components/Loader.jsx";
import { AlertError } from "../components/Alerts/AlertError.jsx";
import { ResponsiveComponent } from "../components/ResponsiveComponent.jsx";


export const Extensions = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [alert, setAlert] = useState('');

	const [extensionsData, setExtensionsData] = useFilterData();
	const [_] = useIntervalTimeToReceiveData(fetchExtensionsStatisticData);

	const { getExtensionsStatistic } = useApi(statisticService);

	// Initial
	useEffect(() => {
		async function initialLoading() {
			setIsLoading(true);

			await fetchExtensionsStatisticData();
			setIsLoading(false);
		}

		initialLoading();

	}, []);

	// Fetch extension statistic data from server
	async function fetchExtensionsStatisticData() {
		try {
			const extensionsData = await getExtensionsStatistic();

			setExtensionsData(extensionsData);
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
		return fetchExtensionsStatisticData();
	}

	return (
		<PageTitle title={'Extensions'}>
			<div className='relative'>

				{isLoading
					? <Loader />
					: (
						<>
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