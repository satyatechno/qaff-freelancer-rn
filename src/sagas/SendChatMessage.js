import {put, takeLatest, select} from 'redux-saga/effects';
import QB from 'quickblox-react-native-sdk';

// import { token, freelancers, } from "src/selectors/Selector";

function* sendChatMessage(action) {
  console.log('SEND CHAT MESSAGE SAGA', JSON.stringify(action.data, null, 2));
  try {
    const dialogData = yield QB.chat.getDialogs({});
    const doesDialogExist = dialogData.dialogs.find((x) =>
      x.occupantsIds.find((id) => id === action.data.qbId),
    );

    console.log('dialogExist', JSON.stringify(doesDialogExist, null, 2));
    if (doesDialogExist) {
      const message1 = {
        dialogId: doesDialogExist.id,
        body: action.data.message,
        properties: {
          ...action.data?.params,
        },
        saveToHistory: true,
        markable: 0,
      };

      yield QB.chat.sendMessage(message1);
      console.log(' Chat Message sent  successfully');
    } else {
      const dialog = yield QB.chat.createDialog({
        type: QB.chat.DIALOG_TYPE.CHAT,
        occupantsIds: [action.data.qbId],
        name: action.data.name,
      });
      yield put({
        type: 'UPDATE_CHAT_DIALOG',
        data: dialog,
      });
      const message1 = {
        dialogId: dialog.id,
        body: action.data.message,
        properties: {
          ...action.data?.params,
        },
        saveToHistory: true,
        markable: 0,
      };

      yield QB.chat.sendMessage(message1);
      console.log(' Chat Message sent  successfully');
    }
  } catch (err) {
    console.log('couldnot fetch dialogs', err);
  }
}
export function* sendMessageActionWatcher() {
  yield takeLatest('SEND_CHAT_MESSAGE', sendChatMessage);
}
