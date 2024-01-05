import { ExtensionStatus } from "../models/ExtensionStatus.js";

let intervalId;

export function checkWorkingExtension() {
    intervalId = setInterval(async () => {
        const fiveMinutesAgo = new Date();
        fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

        // Find and update documents where updatedAt is older than 5 minutes
        await ExtensionStatus.updateMany({ updatedAt: { $lte: fiveMinutesAgo } }, { $set: { isWork: false } });

    }, 5 * 60 * 1000); // 5 minutes in milliseconds
}

export function stopCheckWorkingExtension() {
    clearInterval(intervalId);
}