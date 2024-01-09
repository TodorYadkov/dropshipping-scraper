import { useEffect, useState } from "react";

export const useIntervalTimeToReceiveData = (requestHandler, intervalInMinutes = 2) => {
    const [data, setData] = useState(null);

    const intervalTimeToMilliseconds = intervalInMinutes * 60 * 1000;

    useEffect(() => {
        const intervalId = setInterval(async () => {
            const responseData = await requestHandler();
            setData(responseData);
        }, intervalTimeToMilliseconds);

        return () => {
            clearInterval(intervalId)
        };

    }, [requestHandler, intervalTimeToMilliseconds]);

    return [data];
};