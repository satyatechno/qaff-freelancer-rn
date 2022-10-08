import QB from 'quickblox-react-native-sdk';
import {AppState, NativeEventEmitter} from 'react-native';
import {eventChannel} from 'redux-saga';
import {call, fork, put, select, take, takeLatest} from 'redux-saga/effects';
import {chatDialogs, messages, quickbloxUser} from 'src/selectors/selector';

function* quickbloxSetup() {
  const {login, password} = yield select(quickbloxUser);
  yield put({
    type: 'SESSION_LOADING',
    data: true,
  });
  try {
    let res = yield QB.auth.login({
      login: login,
      password: password,
    });
    console.log('Quickblox login successfull', res);
    yield put({
      type: 'IS_QUICKBLOX_SESSION',
      data: true,
    });
    yield put({
      type: 'SESSION_LOADING',
      data: false,
    });
    yield put({
      type: 'SETUP_CHAT_CONNECTION',
    });

    yield put({
      type: 'SETUP_MESSAGE_EVENTS',
    });
    yield put({
      type: 'SETUP_APP_STATE',
    });
  } catch (err) {
    console.error('Quickblox login err', err);
    yield put({
      type: 'IS_QUICKBLOX_SESSION',
      data: false,
    });
    yield put({
      type: 'SESSION_LOADING',
      data: false,
    });
  }
}

function* messageStatus(message) {
  console.log('pong', JSON.stringify(message, null, 2));
  const {qb_id} = yield select(quickbloxUser);
  if (message.type === '@QB/RECEIVED_NEW_MESSAGE') {
    var tempChatDialogs = yield select(chatDialogs);
    // if (!tempChatDialogs.length) {
    //   const chatDialog = yield QB.chat.getDialogs({});
    //   yield put({
    //     type: 'CHAT_DIALOG',
    //     data: chatDialog.dialogs,
    //   });
    // }
    let dialogFound;
    if (tempChatDialogs.length) {
      tempChatDialogs?.forEach((x) => {
        if (x.id === message.payload.dialogId) {
          (x.lastMessage = message.payload.body),
            (x.lastMessageDateSent = message.payload?.dateSent);
          dialogFound = true;
        }
        // else{
        //  tempChatDialogs = yield QB.chat.getDialogs({});

        // }
      });
      // console.log('from qb cd', JSON.stringify(tempChatDialogs, null, 2));
      if (dialogFound) {
        console.log('if dailog');
        yield put({
          type: 'CHAT_DIALOG',
          data: [...tempChatDialogs],
        });
      } else {
        console.log('else new dailog create');
        const newChatDialogs = yield QB.chat.getDialogs({});
        yield put({
          type: 'CHAT_DIALOG',
          data: [...newChatDialogs.dialogs],
        });
      }
    }

    if (message.payload.senderId !== qb_id) {
      yield QB.chat
        .markMessageDelivered({
          message: {
            id: message.payload.id,
            dialogId: message.payload.dialogId,
            senderId: message.payload.senderId,
          },
        })
        .then((res) => console.log('mdsuccessfully'))
        .catch((err) => console.error('message not delivered', err));
    }
    yield put({
      type: 'SEND_MESSAGE',
      data: message.payload,
    });
  }
  if (message.type === '@QB/MESSAGE_DELIVERED') {
    const tempMessage = yield select(messages);
    let dummy = tempMessage.findIndex(
      (x) => x.id === message.payload.messageId,
    );
    if (dummy !== -1) {
      tempMessage[dummy].deliveredIds.push(message.payload.userId);
      yield put({
        type: 'SET_DELIEVERED_STATUS',
        data: [...tempMessage],
      });
    }
  }

  if (message.type === '@QB/USER_IS_TYPING') {
    if (message.payload.userId !== qb_id) {
      yield put({
        type: 'USER_IS_TYPING',
        data: true,
      });
    }
  }

  if (message.type === '@QB/USER_STOPPED_TYPING') {
    yield put({
      type: 'USER_IS_TYPING',
      data: false,
    });
  }
  if (message.type === '@QB/MESSAGE_READ') {
    const tempMessage = yield select(messages);
    // let dummy = tempMessage.findIndex(
    //   (x) => x.id === message.payload.messageId,
    // );
    tempMessage.forEach((x) => {
      if (x.readIds.findIndex((y) => y === message.payload.userId) === -1) {
        x.readIds.push(message.payload.userId);
      }
    });
    yield put({
      type: 'SET_READ_STATUS',
      data: [...tempMessage],
    });
  }
}

function* createMessageChannel(emitter) {
  const QBMessageEvents = [
    QB.chat.EVENT_TYPE.RECEIVED_NEW_MESSAGE,
    QB.chat.EVENT_TYPE.MESSAGE_DELIVERED,
    QB.chat.EVENT_TYPE.MESSAGE_READ,
    QB.chat.EVENT_TYPE.USER_STOPPED_TYPING,
    QB.chat.EVENT_TYPE.USER_IS_TYPING,
  ];
  return eventChannel((emit) => {
    const pingHandler = (event) => {
      emit(event);
    };

    // setup the subscription
    QBMessageEvents.forEach((eventName) => {
      emitter.addListener(eventName, pingHandler);
    });
    const unsubscribe = () => {
      QBMessageEvents.forEach((eventName) => {
        emitter.removeListener(eventName, pingHandler);
      });
    };

    return unsubscribe;
  });
}
function* createChatConnectionChannel(emitter) {
  const QBConnectionEvents = [
    QB.chat.EVENT_TYPE.CONNECTED,
    QB.chat.EVENT_TYPE.CONNECTION_CLOSED,
    QB.chat.EVENT_TYPE.CONNECTION_CLOSED_ON_ERROR,
    QB.chat.EVENT_TYPE.RECONNECTION_FAILED,
    QB.chat.EVENT_TYPE.RECONNECTION_SUCCESSFUL,
  ];
  return eventChannel((emit) => {
    const chatConnectionHandler = (event) => {
      emit(event);
    };

    QBConnectionEvents.forEach((eventName) => {
      emitter.addListener(eventName, chatConnectionHandler);
    });
    const unsubscribe = () => {
      QBConnectionEvents.forEach((eventName) => {
        emitter.removeListener(eventName, chatConnectionHandler);
      });
    };

    return unsubscribe;
  });
}

function* createAppStateChannel(emitter) {
  return eventChannel((emit) => {
    const appStateHandler = (event) => {
      emit(event);
    };

    AppState.addEventListener('change', appStateHandler);
    const unsubscribe = () => {
      AppStateEvents.forEach((eventName) => {
        emitter.removeListener(eventName, appStateHandler);
      });
    };

    return unsubscribe;
  });
}

function* connectionStatus(connection) {
  // console.log('Connection Status', connection);
  console.log('Connection Status', JSON.stringify(connection, null, 2));
  if (connection?.type === '@QB/CONNECTED') {
    console.log('Chat connected successfully');
  } else if (connection?.type === '@QB/CONNECTION_CLOSED') {
    // yield put({
    //   type: 'CONNECT_TO_CHAT',
    // });
  } else if (connection?.type === '@QB/CONNECTION_CLOSED_ON_ERROR') {
    // yield put({
    //   type: 'CONNECT_TO_CHAT',
    // });
  } else if (connection?.type === '@QB/RECONNECTION_FAILED') {
    yield put({
      type: 'CONNECT_TO_CHAT',
    });
  } else if (connection?.type === '@QB/RECONNECTION_SUCCESSFUL') {
    console.log('Reconnected to chat successfully');
  }
}

function* quickbloxSetupChatConnection() {
  const emitter1 = new NativeEventEmitter(QB.chat);

  try {
    yield put({
      type: 'CONNECT_TO_CHAT',
    });
    try {
      const chatDialogs = yield QB.chat.getDialogs({});
      // console.log(
      //   'saga chat dialogs',
      //   JSON.stringify(chatDialogs?.dialogs[0], null, 2),
      // );
      yield put({
        type: 'CHAT_DIALOG',
        data: chatDialogs.dialogs,
      });
    } catch (err) {
      console.error('Couldnot retrieve chat dialogs', err);
    }

    const connectionChannel = yield call(createChatConnectionChannel, emitter1);
    while (connectionChannel) {
      try {
        console.log('in connection channel');
        if (connectionChannel) {
          const connectionMessage = yield take(connectionChannel);

          yield fork(connectionStatus, connectionMessage);
        }
      } catch (err) {
        console.error('message channel error:', err);
      }
    }
  } catch (err) {
    console.log('Couldnot setup chat connection', err);
  }
}

function* setupAppState() {
  const emitter2 = new NativeEventEmitter(AppState);

  try {
    const appStateChannel = yield call(createAppStateChannel, emitter2);
    while (appStateChannel) {
      try {
        console.log('in appState channel');
        if (appStateChannel) {
          const status = yield take(appStateChannel);

          yield fork(appStateStatus, status);
        }
      } catch (err) {
        console.error('message channel error:', err);
      }
    }
  } catch (err) {
    console.log('Couldnot setup chat connection', err);
  }
}

function* appStateStatus(status) {
  console.log('app state status', JSON.stringify(status, null, 2));
  if (status === 'inactive') {
    QB.chat
      .disconnect()
      .then((res) => console.log('Disconnected from chat server'))
      .catch((err) =>
        console.log('Error while disconnecting from chat server'),
      );
  } else {
    yield put({
      type: 'SETUP_CHAT_CONNECTION',
    });
  }
}

function* quickbloxSetupMessageEvents() {
  const emitter = new NativeEventEmitter(QB.chat);
  try {
    let messageChannel = yield call(createMessageChannel, emitter);

    while (messageChannel) {
      try {
        console.log('in message channel');
        if (messageChannel) {
          const message = yield take(messageChannel);

          yield fork(messageStatus, message);
        }
      } catch (err) {
        console.error('message channel error:', err);
      }
    }
  } catch (err) {
    console.log('Couldnot setup message events');
  }
}

function* connectToChat() {
  const {password, qb_id} = yield select(quickbloxUser);
  yield put({
    type: 'IS_CHAT_CONNECTION_LOADING',
    data: true,
  });
  try {
    let isconnected = yield QB.chat.isConnected();

    if (isconnected) {
      console.log('chat server already connected');
      yield put({
        type: 'CHAT_CONNECTED',
        data: true,
      });
      yield put({
        type: 'IS_CHAT_CONNECTION_LOADING',
        data: false,
      });
    }
    if (!isconnected) {
      yield QB.chat.connect({
        userId: qb_id,
        password: password,
      });

      console.log('connected successfully ');
      yield put({
        type: 'CHAT_CONNECTED',
        data: true,
      });
      yield put({
        type: 'IS_CHAT_CONNECTION_LOADING',
        data: false,
      });
    }
  } catch (err) {
    yield put({
      type: 'CHAT_CONNECTED',
      data: false,
    });
    yield put({
      type: 'IS_CHAT_CONNECTION_LOADING',
      data: false,
    });
    console.log('Saga chat connect action err', err);
  }
}

function* getChatDialogs() {
  try {
    yield put({
      type: 'SET_DIALOG_LOADING',
      data: true,
    });
    const chatDialogs = yield QB.chat.getDialogs({});

    yield put({
      type: 'SET_DIALOG_LOADING',
      data: false,
    });
    yield put({
      type: 'CHAT_DIALOG',
      data: chatDialogs.dialogs,
    });
  } catch (err) {
    yield put({
      type: 'SET_DIALOG_LOADING',
      data: false,
    });
    console.error('Couldnot retrieve chat dialogs', err);
  }
}

export function* quickbloxActionWatcher() {
  yield takeLatest('SETUP_QUICKBLOX', quickbloxSetup);
  yield takeLatest('SETUP_MESSAGE_EVENTS', quickbloxSetupMessageEvents);
  yield takeLatest('SETUP_CHAT_CONNECTION', quickbloxSetupChatConnection);
  yield takeLatest('SETUP_APP_STATE', setupAppState);
  yield takeLatest('CONNECT_TO_CHAT', connectToChat);
  yield takeLatest('GET_CHAT_DIALOGS', getChatDialogs);
}
