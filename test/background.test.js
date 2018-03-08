import {handleBeforeRequest, isTracker} from '../src/js/background';

describe('addListener', () => {
  test('should be called once', () => {
    expect(global.chrome.webRequest.onBeforeRequest.addListener.calledOnce).toBe(true);
  });
  test('with an event handler', () => {
    expect(global.chrome.webRequest.onBeforeRequest.addListener.firstCall.args[0]).toEqual(handleBeforeRequest);
  });
  test('with all urls filter', () => {
    expect(global.chrome.webRequest.onBeforeRequest.addListener.firstCall.args[1]).toEqual({ urls: ['<all_urls>']});
  });
  test('with blocking extra info spec', () => {
    expect(global.chrome.webRequest.onBeforeRequest.addListener.firstCall.args[2][0]).toEqual('blocking');
  });
});

describe('handleBeforeRequest', () => {

  test('returns blocking response', () => {
    const response = handleBeforeRequest({url: 'https://example.com/'});

    expect(response).toEqual({cancel: false});
  });

  test('returns undef when tabId is -1', () => {
    const response = handleBeforeRequest({url: 'https://example.com/', tabId: -1});

    expect(response).toBeUndefined();
  });
});

describe('isTracker', () => {
  test('is true for tracker url', () => {
    expect(isTracker('https://www.google-analytics.com/analytics.js')).toBe(true);
  });

  test('is false for non tracker url', () => {
    expect(isTracker('https://www.google-analytics.com/')).toBe(false);
  });
});
