import { getData } from "./storageActions.js";
import { startExtension, stopExtension } from "./extensionControl.js";

export const reactExtensionControl = async (extensionStatus) => {
    const { isScriptRunning } = await getData(['isScriptRunning']);

    if (extensionStatus.isWork && !isScriptRunning) {
        await startExtension();

    } else if (!extensionStatus.isWork && isScriptRunning) {
        await stopExtension();
    }
};