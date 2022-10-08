import {put, select, takeLatest} from 'redux-saga/effects';
import {
  activeContracts,
  closedContracts,
  disputedContracts,
  token,
} from 'src/selectors/selector';
import {getContractDetails, getContractsList} from 'src/services/http.service';

function* fetchContractsList(action) {
  try {
    yield put({
      type: 'IS_CONTRACT_LOADING',
      data: true,
    });
    const res = yield getContractsList({
      token: yield select(token),
      type: action.data.type,
      page: action.data.page,
    });
    yield put({
      type: 'IS_CONTRACT_LOADING',
      data: false,
    });
    if (action.data.type === 'active') {
      yield put({
        type: 'ACTIVE_CONTRACTS',
        contracts: res?.data?.data?.contracts.data,
        has_more_contracts: res?.data?.data?.contracts.meta.has_more_pages,
      });
    }
    if (action.data?.type === 'completed') {
      yield put({
        type: 'CLOSED_CONTRACTS',
        contracts: res?.data?.data?.contracts.data,
        has_more_contracts: res?.data?.data?.contracts.meta.has_more_pages,
      });
    }
    if (action.data?.type === 'disputed') {
      yield put({
        type: 'DISPUTED_CONTRACTS',
        contracts: res?.data?.data?.contracts.data,
        has_more_contracts: res?.data?.data?.contracts.meta.has_more_pages,
      });
    }
  } catch (err) {
    yield put({
      type: 'IS_CONTRACT_LOADING',
      data: false,
    });
    console.log('fetch contracts', err);
  }
}
function* fetchMoreContractsList(action) {
  const active = yield select(activeContracts);
  const closed = yield select(closedContracts);
  const disputed = yield select(disputedContracts);

  console.log('saga more contracts list', action.data);
  try {
    const res = yield getContractsList({
      token: yield select(token),
      type: action.data.type,
      page: action.data.page,
    });
    yield put({
      type: 'LOADER',
      data: false,
    });
    if (action.data.type === 'active') {
      yield put({
        type: 'ACTIVE_CONTRACTS',
        contracts: active.concat(res.data.data.contracts.data),
        has_more_contracts: res.data.data.contracts.meta.has_more_pages,
      });
    }
    if (action.data.type === 'closed') {
      yield put({
        type: 'CLOSED_CONTRACTS',
        contracts: closed.concat(res.data.data.contracts.data),
        has_more_contracts: res.data.data.contracts.meta.has_more_pages,
      });
    }
    if (action.data.type === 'disputed') {
      yield put({
        type: 'DISPUTED_CONTRACTS',
        contracts: disputed.concat(res.data.data.contracts.data),
        has_more_contracts: res.data.data.contracts.meta.has_more_pages,
      });
    }
  } catch (err) {
    yield put({
      type: 'LOADER',
      data: false,
    });
    console.log('fetcMoreContracts', err.response.data);
  }
}
function* fetchContractDetails(action) {
  yield put({
    type: 'CONTRACT_DETAILS_LOADING',
    data: true,
  });
  try {
    const res = yield getContractDetails({
      token: yield select(token),
      id: action.data.id,
    });

    yield put({
      type: 'CONTRACT_DETAILS',
      contract: res.data.data.contract,
    });
    console.log('contract responce', res.data);
  } catch (err) {
    console.log('contract details', err);
  } finally {
    yield put({
      type: 'CONTRACT_DETAILS_LOADING',
      data: false,
    });
  }
}

export function* contractsActionWatcher() {
  yield takeLatest('FETCH_CONTRACTS', fetchContractsList);
  yield takeLatest('FETCH_MORE_CONTRACTS', fetchMoreContractsList);
  yield takeLatest('FETCH_CONTRACT_DETAILS', fetchContractDetails);
}
