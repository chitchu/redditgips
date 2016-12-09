/* global JSON */
const LOCALSTORAGE_PATH = 'gipstate'

const loadState = () => {
  try {
    const state = localStorage.getItem(LOCALSTORAGE_PATH);
    if (state === null) {
      return undefined;
    }
    return JSON.parse(state);
  } catch (err) {
    console.warn(err);
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCALSTORAGE_PATH, serializedState);
  } catch (err) {
    console.warn(err);
  }
};

export {
  loadState,
  saveState
};