Extension Problems:

- Always use import with added extension (example .js, .ts)

- To call only one instance of contentScript.js we can select from this way:
  - Inject with static declarations - https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts#static-declarative
  - Inject with dynamic declarations - https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts#dynamic-declarative
  - Inject programmatically - https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts#programmatic
  - manifest.js // "run_at": "document_idle" - here you can add a time when to run the

- Fixed the problem to not close all other tabs except amazon urls by changing the matches in content_scripts in manifest.json