/**If your app uses a browser API that you need to mock in your tests or if you just
 *  need a global setup before running your tests, add a src/setupTests.js to your 
 * project. It will be automatically executed before running your tests. */

import '@testing-library/jest-dom/extend-expect';
let savedItems = {};

const localStorageMock = {
  setItem:(key, item) => {
    savedItems[key] =item;
  } ,
  getItem: (key) => savedItems[key],
  clear: () => {
    savedItems = {};
  }
};

Object.defineProperty(window,'localStorage', { value: localStorageMock });

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});