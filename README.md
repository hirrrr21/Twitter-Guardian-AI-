# Twitter Guardian AI

Decentralized fake news detection project using AI + Web3.

## Phase 1: Extraction Layer (Chrome Extension)

### File structure

```text
Twitter-Guardian-AI-/
├── public/
│   └── manifest.json
└── src/
    └── content/
        └── index.js
```

### What this does

- Runs a content script on `twitter.com` and `x.com`
- Watches tweet loading with `MutationObserver`
- Finds each `article[data-testid="tweet"]`
- Injects one `🛡️ Verify` button near existing tweet action buttons
- Prevents duplicate injection via `data-guardian-processed`
- Logs tweet text to the console when Verify is clicked

### Run locally on Windows 11 (D drive example)

1. Keep this project on your machine, for example:
   `D:\Projects\Twitter-Guardian-AI-`
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select your project folder (which now includes `public/manifest.json`)
6. Open `https://x.com` or `https://twitter.com`
7. Open DevTools Console and click **🛡️ Verify** on a tweet to see logged tweet text
