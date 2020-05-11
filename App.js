import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './src/Redux/reducers';

import Router from './router';
// applyMiddleware(thunk)
let store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1317',
  },
});

export default App;
