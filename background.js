function cancelIfTracker(details) {
  return {cancel: details.url.indexOf("analytics.js") != -1};
}

chrome.webRequest.onBeforeRequest.addListener(
  cancelIfTracker,
  {urls: ["<all_urls>"]},
  ["blocking"]);
