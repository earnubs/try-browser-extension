No Track
--------

Simple browser extension that blocks <s>trackers</s> Google Analytics. :)

Usage
-----

Install project deps:

```
npm install
```

Build project

```
npm build
```

Load unpacked extension from `dist` folder (built with `npm build`), when loaded
check network tab of any site using Google Analytics and check the `analytics.js`
file has been blocked.

Tests

```
npm test -- --watch
```
