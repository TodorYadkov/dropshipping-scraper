import { getData } from "./storageActions.js";
import { startExtension, stopExtension } from "./extensionControl.js";
import { userLogout } from "./userControl.js";

export const reactExtensionControl = async (extensionStatus) => {
    const { isScriptRunning } = await getData(['isScriptRunning']);

    if (extensionStatus.isWork && !isScriptRunning) {
        await startExtension();

    } else if (!extensionStatus.isWork && isScriptRunning) {
        await stopExtension();

    } else if (!extensionStatus.isLogin) {
        await userLogout();
    }
};