import {put, takeLatest, select} from 'redux-saga/effects';
import {FreshchatUser} from 'react-native-freshchat-sdk';
import {Freshchat} from 'react-native-freshchat-sdk';
import {user} from 'src/selectors/selector';

function* setupFreshchatUser(action) {
  let {freelancer_profile} = yield select(user);
  try {
    let freshchatUser = new FreshchatUser();
    freshchatUser.firstName = freelancer_profile.first_name;
    freshchatUser.lastName = freelancer_profile.last_name;
    freshchatUser.email = freelancer_profile.email;
    freshchatUser.phoneCountryCode =
      `+${freelancer_profile.country_code}` ?? '';
    freshchatUser.phone = freelancer_profile.phone ?? '';
    Freshchat.setUser(freshchatUser, (error) => {
      console.error('Freshchat set user error', error);
    });
  } catch (err) {
    console.error('setup freshchat action error', err);
  }
}

export function* freshchatActionWatcher() {
  yield takeLatest('SETUP_FRESHCHAT_USER', setupFreshchatUser);
}
