const TWEET_SELECTOR = 'article[data-testid="tweet"]';
const ACTIONS_SELECTOR = '[role="group"]';
const TWEET_TEXT_SELECTOR = '[data-testid="tweetText"]';
const PROCESSED_ATTR = 'data-guardian-processed';
const VERIFY_BUTTON_ATTR = 'data-guardian-verify-button';

function getTweetText(tweetElement) {
  const tweetTextElement = tweetElement.querySelector(TWEET_TEXT_SELECTOR);
  const text = tweetTextElement?.innerText?.trim();
  return text || tweetElement.innerText.trim();
}

function createVerifyButton(tweetElement) {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute(VERIFY_BUTTON_ATTR, 'true');
  button.setAttribute('aria-label', 'Verify tweet');
  button.textContent = '🛡️ Verify';

  button.style.marginLeft = '8px';
  button.style.padding = '4px 8px';
  button.style.border = '1px solid rgb(83, 100, 113)';
  button.style.borderRadius = '9999px';
  button.style.background = 'transparent';
  button.style.color = 'inherit';
  button.style.cursor = 'pointer';
  button.style.font = 'inherit';

  button.addEventListener('click', () => {
    const tweetText = getTweetText(tweetElement);
    console.log('[Twitter Guardian AI] Tweet text:', tweetText);
  });

  return button;
}

function addVerifyButtonToTweet(tweetElement) {
  if (tweetElement.hasAttribute(PROCESSED_ATTR)) {
    return;
  }

  const actionsGroup = tweetElement.querySelector(ACTIONS_SELECTOR);
  if (!actionsGroup) {
    return;
  }

  const existingButton = actionsGroup.querySelector(`[${VERIFY_BUTTON_ATTR}]`);
  if (!existingButton) {
    actionsGroup.appendChild(createVerifyButton(tweetElement));
  }

  tweetElement.setAttribute(PROCESSED_ATTR, 'true');
}

function processTweets(root = document) {
  const tweets = root.querySelectorAll(TWEET_SELECTOR);
  tweets.forEach(addVerifyButtonToTweet);
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) {
        return;
      }

      if (node.matches?.(TWEET_SELECTOR)) {
        addVerifyButtonToTweet(node);
      } else {
        processTweets(node);
      }
    });
  });
});

processTweets();
observer.observe(document.body, { childList: true, subtree: true });
