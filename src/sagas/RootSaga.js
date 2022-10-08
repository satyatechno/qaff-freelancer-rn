import {all, fork} from 'redux-saga/effects';
import {contractsActionWatcher} from './Contracts';
import { disputeActionWatcher } from './Dispute';
import {freshchatActionWatcher} from './freshchat';
import {jobsActionWatcher} from './Jobs';
import {messagesActionWatcher} from './Messages';
import {notificationActionWatcher} from './Notification';
import {portfolioActionWatcher} from './Portfolio';
import {profileActionWatcher} from './Profile';
import {proposalsActionWatcher} from './Proposals';
import {quickbloxActionWatcher} from './Quickblox';
import {sendMessageActionWatcher} from './SendChatMessage';

export default function* rootSaga() {
  yield all([
    fork(contractsActionWatcher),
    fork(jobsActionWatcher),
    fork(portfolioActionWatcher),
    fork(profileActionWatcher),
    fork(proposalsActionWatcher),
    fork(quickbloxActionWatcher),
    fork(messagesActionWatcher),
    fork(notificationActionWatcher),
    fork(sendMessageActionWatcher),
    fork(freshchatActionWatcher),
    fork(disputeActionWatcher)
  ]);
}
