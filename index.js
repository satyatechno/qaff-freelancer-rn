import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'src/locale/i18n';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import rootSaga from 'src/sagas/RootSaga';
import {store, sagaMiddleware} from './src/store';

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
LogBox.ignoreLogs([
  'Warning: componentWillReceiveProps has been renamed',
  'Animated: `useNativeDriver` was not specified.',
]);

// LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
