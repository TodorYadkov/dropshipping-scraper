export async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tabs] = await chrome.tabs.query(queryOptions);
    return tabs.id;
}