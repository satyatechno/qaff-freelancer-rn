import QB from 'quickblox-react-native-sdk';
import {put, takeLatest, select, call} from 'redux-saga/effects';
import {token, contacts, chatDialogs} from 'src/selectors/selector';
import {showContacts} from 'src/services/http.service';
function* fetchContacts() {
  try {
    yield put({
      type: 'SET_CONTACT_LOADING',
      data: true,
    });
    const {
      data: {
        data: {contacts},
      },
    } = yield showContacts({token: yield select(token)});
    yield put({
      type: 'CONTACTS',
      data: contacts,
    });
    yield put({
      type: 'SET_CONTACT_LOADING',
      data: false,
    });
    yield put({
      type: 'SET_CONTACT_REFRESHING',
      data: false,
    });
  } catch (err) {
    yield put({
      type: 'SET_CONTACT_LOADING',
      data: false,
    });
    yield put({
      type: 'SET_CONTACT_REFRESHING',
      data: false,
    });
    console.error('Couldnot fetch contacts', err);
  }
}
// function* addContact(action){
//     console.log('cc', JSON.stringify(yield select(contacts), null, 2))
//     console.log('action.data',action.data)
//     const existingContacts= yield select(contacts)
//     try{
//        if( existingContacts.findIndex(item => item.profile.id===action.data)!==-1){
//      alert('Already in contact')
//        }else {
//         let newContact= yield addContacts({
//             token: yield select(token),
//             data: {
//               profile_type: "freelancer",
//               profile_id:action.data,
//             }
//           })
//           yield put({
//               type: 'CONTACTS',
//               data : [...existingContacts, newContact.data.data.contact]
//           })
//           console.log('added conctacts');
//        }
//     }catch(err){
//         console.error('Couldnot add contact', err)
//     }
// }
function* updateChatDialog(action) {
  const newChatDialogs = yield select(chatDialogs);
  try {
    yield put({
      type: 'CHAT_DIALOG',
      data: [...newChatDialogs, action.data],
    });
  } catch (err) {
    console.error('Couldnot update chat dialog', err);
  }
}

function* uploadFile(action = {}) {
  const {url} = action.data;
  try {
    let progress = yield call(QB.content.subscribeUploadProgress, {url});
    console.log('file upload success', progress);

    const file = yield call(QB.content.upload, {url, public: false});
    // yield put(fileUploadSucess(file))
  } catch (e) {
    // yield put(fileUploadFail(e.message))
  } finally {
    yield call(QB.content.unsubscribeUploadProgress, {url});
  }
}

export function* messagesActionWatcher() {
  yield takeLatest('FETCH_CONTACTS', fetchContacts);
  // yield takeLatest('ADD_CONTACT', addContact);
  yield takeLatest('UPDATE_CHAT_DIALOG', updateChatDialog);
  yield takeLatest('FILE_UPLOAD_SUCCESS', uploadFile);
}
