console.log('hello world');
function handleBeforeRequest(details) {
  console.log('hiya');
  const {url, tabId} = details;

  // -1 indicates a request unrelated to the tab
  if (tabId === -1) {
    return;
  }
  // https://developer.chrome.com/extensions/webRequest#type-BlockingResponse
  return {cancel: isTracker(url)};
}

function isTracker(url) {
  // simple check for google analytics tracker ...
  return url.indexOf('analytics.js') != -1;
}

chrome.webRequest.onBeforeRequest.addListener(
  handleBeforeRequest,
  {urls: ['<all_urls>']},
  // callback will be syncronous, and can return a blockingResponse
  ['blocking']);
