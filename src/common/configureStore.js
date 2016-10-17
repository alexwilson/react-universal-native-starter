import {createStore} from 'redux';

export default (initialState) => createStore(
  () => {},
  initialState,
  typeof window !== 'undefined' && window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => f
);
