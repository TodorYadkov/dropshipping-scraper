import { ExtensionStatus } from '../models/ExtensionStatus.js';

let intervalId;

export function checkWorkingExtension() {
    const timeToCheck = 3; // Time in minutes

    const intervalTimeToMilliseconds = timeToCheck * 60 * 1000;
    intervalId = setInterval(async () => {
        const timeMinutesAgo = new Date();
        timeMinutesAgo.setMinutes(timeMinutesAgo.getMinutes() - timeToCheck);

        // Find and update documents where updatedAt is older than timeToCheck
        await ExtensionStatus.updateMany({ updatedAt: { $lte: timeMinutesAgo } }, { $set: { isWork: false } });

    }, intervalTimeToMilliseconds);
}

export function stopCheckWorkingExtension() {
    clearInterval(intervalId);
}