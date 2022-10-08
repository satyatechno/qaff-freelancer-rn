import {NativeEventEmitter} from 'react-native';
import OneSignal from 'react-native-onesignal';
import {eventChannel} from 'redux-saga';
import {call, fork, put, select, take, takeLatest} from 'redux-saga/effects';
import {latestNotification, notifications, token} from 'src/selectors/selector';
import {getNotifications} from 'src/services/http.service';
import * as RootNavigation from 'src/utils/Navigation';

function* fetchNotifications(action) {
  try {
    const res = yield getNotifications({
      token: yield select(token),
    });
    yield put({
      type: 'NOTIFICATIONS_DATA',
      notifications: res.data.data.notifications.data,
      latestNotification: res.data.data.latest_notifications,
      has_more_page: res.data.data.notifications.meta.has_more_pages,
    });
    yield put({
      type: 'UNREAD_NOTIFICATION',
      data: res.data.data.unread_notificaiton_count,
    });
    console.log('hahaah', res.data.data);
  } catch (err) {
    console.log('myError', err.response.data);
  }
}
function* fetchMoreNotifications(action) {
  yield put({
    type: 'IS_LOADING_MORE',
    data: true,
  });
  try {
    const notification = yield select(notifications);
    const latest = yield select(latestNotification);
    const res = yield getNotifications({
      token: yield select(token),
      page: action.data.page,
    });
    yield put({
      type: 'NOTIFICATIONS_DATA',
      notifications: [...notification, ...res.data.data.notifications.data],
      latestNotification: [...latest],
      has_more_page: res.data.data.notifications.meta.has_more_pages,
    });

    console.log('res more notification', res.data.data);
  } catch (err) {
    console.log('myError', err.response.data);
  } finally {
    yield put({
      type: 'IS_LOADING_MORE',
      data: false,
    });
  }
}

function* notificationMessages(notification) {
  console.log('Notification Handler', JSON.stringify(notification, null, 2));

  if (!Object.keys(notification).includes('notification')) {
    yield put({
      type: 'FETCH_NOTIFICATIONS',
    });
    // const {
    //   type,
    //   project_id,
    //   proposal_id,
    // } = notification?.payload?.additionalData;
    // if (
    //   type === 'App\\Notifications\\ProposalReceiveNotification' ||
    //   'App\\Notifications\\ProposalUpdatedNotification'
    // ) {
    //   yield put({
    //     type: 'FETCH_PROJECT',
    //     data: {type: 'progress', page: 1},
    //   });
    // }
  } else {
    const {
      type,
      invitation_id,
      contract_id,
    } = notification?.notification?.payload?.additionalData;

    switch (type) {
      case `App\\Notifications\\Invitation\\RecieveNotification`:
        RootNavigation.navigate('InvitationDetails', {
          id: invitation_id,
        });

        break;
      case 'App\\Notifications\\Contract\\OfferRecieveNotification':
        RootNavigation.navigate('ContractRoom', {
          contractId: contract_id,
        });
        break;

      case 'App//Notifications//ChatNotification':
        RootNavigation.navigate('Messages');
        break;

      default:
    }
  }
}

function* createOnesignalChannel(emitter) {
  return eventChannel((emit) => {
    const notificationHandler = (event) => {
      emit(event);
    };

    OneSignal.addEventListener('received', notificationHandler);
    OneSignal.addEventListener('opened', notificationHandler);
    const unsubscribe = () => {
      OneSignal.removeEventListener('received', notificationHandler);
      OneSignal.removeEventListener('opened', notificationHandler);
    };

    return unsubscribe;
  });
}

function* setupNotificationEvents() {
  const emitter2 = new NativeEventEmitter(OneSignal);

  try {
    const onesignalChannel = yield call(createOnesignalChannel, emitter2);
    while (onesignalChannel) {
      try {
        console.log('in notification channel');
        if (onesignalChannel) {
          const status = yield take(onesignalChannel);

          yield fork(notificationMessages, status);
        }
      } catch (err) {
        console.error('notification channel error:', err);
      }
    }
  } catch (err) {
    console.log('Couldnot setup notification events', err);
  }
}

export function* notificationActionWatcher() {
  yield takeLatest('FETCH_NOTIFICATIONS', fetchNotifications);
  yield takeLatest('FETCH_MORE_NOTIFICATIONS', fetchMoreNotifications);
  yield takeLatest('SETUP_NOTIFICATION_EVENTS', setupNotificationEvents);
}
