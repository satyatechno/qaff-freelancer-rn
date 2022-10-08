import {put, takeLatest, select} from 'redux-saga/effects';

import {
  addPortfolio,
  deletePortfolio,
  editPortfolio,
  fetchPortfolioDetails,
  fetchPortfolioList,
} from 'src/services/http.service';
import {token} from 'src/selectors/selector';

function* addNewPortfolio(action) {
  const {data, callback} = action.data
  try {
    const res = yield addPortfolio({
      data: data,
      token: yield select(token),
    });

    console.log('sagaPortfolio', JSON.stringify(res.data, null, 2));

    yield put({
      type: 'FETCH_PORTFOLIO',
    });
    yield put({
      type: 'FETCH_PROFILE',
    });
    yield put({
      type: 'LOADER',
      data: false,
    });
    yield put({
      type: 'MODAL_VISIBLE',
      data: {
        visible: true,
        type: 1,
        message: res.data.message,
      },
    });
  } catch (err) {
    console.log('saga Error add portfolio', err);
    yield put({
      type: 'LOADER',
      data: false,
    });
    yield put({
      type: 'MODAL_VISIBLE',
      data: {
        visible: true,
        type: 2,
        message: 'Something went wrong',
      },
    });
  }finally {
    callback('complete')
  }
}

function* fetchPortfolio() {
  try {
    const res = yield fetchPortfolioList({
      token: yield select(token),
    });

    yield put({
      type: 'SAVE_PORTFOLIO',
      data: res.data.data.portfolio.data,
    });
    yield put({
      type: 'LOADER',
      data: false,
    });
  } catch (err) {
    console.log('saga Error portfolio list', err);
    yield put({
      type: 'LOADER',
      data: false,
    });
    yield put({
      type: 'MODAL_VISIBLE',
      data: {
        visible: true,
        type: 2,
        message: 'Something went wrong',
      },
    });
  }
}
function* fetchPortfolioDetail(action) {
  try {
    const res = yield fetchPortfolioDetails({
      id: action.data,
      token: yield select(token),
    });

    yield put({
      type: 'PORTFOLIO_DETAIL',
      data: res.data.data.portfolio,
    });

    yield put({
      type: 'LOADER',
      data: false,
    });
  } catch (err) {
    console.log('saga Error portfolio details', err);
    yield put({
      type: 'LOADER',
      data: false,
    });
    yield put({
      type: 'MODAL_VISIBLE',
      data: {
        visible: true,
        type: 2,
        message: 'Something went wrong',
      },
    });
  }
}
function* updatePortfolio(action) {
  try {
    const res = yield editPortfolio({
      data: action.data.data,
      id: action.data.id,
      token: yield select(token),
    });

    yield put({
      type: 'FETCH_PORTFOLIO',
    });
    yield put({
      type: 'FETCH_PROFILE',
    });
    yield put({
      type: 'LOADER',
      data: false,
    });
    yield put({
      type: 'MODAL_VISIBLE',
      data: {
        visible: true,
        type: 1,
        message: res.data.message,
      },
    });
  } catch (err) {
    console.log('saga Error update portfolio', err);
    yield put({
      type: 'LOADER',
      data: false,
    });
    yield put({
      type: 'MODAL_VISIBLE',
      data: {
        visible: true,
        type: 2,
        message: 'Something went wrong',
      },
    });
  }
}
function* DeletePortfolio(action) {
  try {
    const res = yield deletePortfolio({
      id: action.data.id,
      token: yield select(token),
    });

    yield put({
      type: 'FETCH_PORTFOLIO',
    });
    yield put({
      type: 'FETCH_PROFILE',
    });
  } catch (err) {
    console.log('saga Error delete portfolio', err);
    yield put({
      type: 'LOADER',
      data: false,
    });
    yield put({
      type: 'MODAL_VISIBLE',
      data: {
        visible: true,
        type: 2,
        message: 'Something went wrong',
      },
    });
  }
}

export function* portfolioActionWatcher() {
  yield takeLatest('ADD_PORTFOLIO', addNewPortfolio);

  yield takeLatest('FETCH_PORTFOLIO', fetchPortfolio);
  yield takeLatest('FETCH_PORTFOLIO_DETAIL', fetchPortfolioDetail);
  yield takeLatest('UPDATE_PORTFOLIO', updatePortfolio);
  yield takeLatest('DELETE_PORTFOLIO', DeletePortfolio);
}
