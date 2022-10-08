import {combineReducers} from 'redux';
import {createStore, applyMiddleware} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import createSagaMiddleWare from 'redux-saga';

import myReducer from 'src/reducers/reducer';
import jobsReducer from 'src/reducers/jobs';
import proposalsReducer from 'src/reducers/proposals';
import contractsReducer from 'src/reducers/contracts';
import messagesReducer from 'src/reducers/messages';
import notificationReducer from 'src/reducers/notification';
import offlineActionsReducer from 'src/reducers/offlineActionsQueue';
import disputeReducer from 'src/reducers/dispute';
import chatReducer from './reducers/chatReducer';

const appReducer = combineReducers({
  myReducer,
  jobsReducer,
  proposalsReducer,
  contractsReducer,
  messagesReducer,
  notificationReducer,
  offlineActionsReducer,
  disputeReducer,
  chatReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: 'PAIRROXZ_QAFF',
  storage: AsyncStorage,
};
export const sagaMiddleware = createSagaMiddleWare();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware),
);

// export default rootReducer;
// export default (state, action) =>
//   rootReducer(action.type === 'LOGOUT' ? undefined : state, action);
