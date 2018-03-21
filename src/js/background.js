import * as ABPFilterParser from 'abp-filter-parser';

import easyPrivacy from '../data/easyprivacy.txt';

let parsedFilterData = {};

ABPFilterParser.parse(easyPrivacy, parsedFilterData);

export function handleBeforeRequest(details) {
  const {url, tabId} = details;

  // -1 indicates a request unrelated to the tab
  if (tabId === -1) {
    return;
  }
  // https://developer.chrome.com/extensions/webRequest#type-BlockingResponse
  return {cancel: isTracker(url)};
}

export function isTracker(url) {
  if (ABPFilterParser.matches(parsedFilterData, url, {
    domain: window.location.hostname,
    elementTypeMaskMap: ABPFilterParser.elementTypes.SCRIPT,
  })) {
    console.log('You should block this URL!');
    console.log(url);
    return true;
  } else {
    console.log('You should NOT block this URL!');
    return false;
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  handleBeforeRequest,
  {urls: ['<all_urls>']},
  // callback will be syncronous, and can return a blockingResponse
  ['blocking']);


// fetch tracker blacklist (alarm to recheck every 30 mins)
// don't want to DoS easylist
// count blocked trackers
// update icon and popup with blocked trackers meta
