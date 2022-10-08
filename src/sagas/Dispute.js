import { put, takeLatest, select } from 'redux-saga/effects';
import { getDisputeList, } from 'src/services/http.service';
import { token, myDisputes } from 'src/selectors/selector';

function* fetchDisputeList(action) {
    console.log('saga action dispute list', action.data);
    try {
        const res = yield getDisputeList({
            token: yield select(token),
            page: action.data.page,
        });
        yield put({
            type: 'LOADER',
            data: false,
        });

        yield put({
            type: 'MY_DISPUTE',
            disputes: res.data.data.disputes.data,
            has_more_disputes: res.data.data.disputes.meta.has_more_pages,
        });
        console.log("dispute List", res.data.data)

    } catch (err) {
        yield put({
            type: 'LOADER',
            data: false,
        });
        console.log('fetch dispute', err);
    }
}
function* fetchMoreDisputeList(action) {
    const active = yield select(myDisputes);


    console.log('saga more dispute list', action.data);
    try {
        const res = yield getDisputeList({
            token: yield select(token),
            page: action.data.page,
        });
        yield put({
            type: 'LOADER',
            data: false,
        });
        yield put({
            type: 'MY_DISPUTE',
            contracts: active.concat(res.data.data.disputes.data),
            has_more_contracts: res.data.data.disputes.meta.has_more_pages,
        });


    } catch (err) {
        yield put({
            type: 'LOADER',
            data: false,
        });
        console.log('fetcMoredispute', err.response.data);
    }
}


export function* disputeActionWatcher() {
    yield takeLatest('FETCH_DISPUTE', fetchDisputeList);
    yield takeLatest('FETCH_MORE_DISPUTE', fetchMoreDisputeList);
}
