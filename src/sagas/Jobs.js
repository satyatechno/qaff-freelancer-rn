import {put, select, takeLatest} from 'redux-saga/effects';
import {currentFilters, newsfeed, token} from 'src/selectors/selector';
import {fetchNewsfeed, fetchProjectDetails} from 'src/services/http.service';

function* getNewsfeed(action) {
  yield put({
    type: 'NEWSFEED_LOADING',
    data: true,
  });
  try {
    const res = yield fetchNewsfeed({
      token: yield select(token),
      page: action.data.page,
      search: action.data.search,
      sort_by: action.data.sort_by,
      proposal_count: action.data.proposal_count
        ? JSON.stringify([action.data.proposal_count])
        : [],
      budget: action.data.budget ? JSON.stringify(action.data.budget) : [],
      project_timeline: action.data.project_timeline
        ? JSON.stringify(action.data?.project_timeline)
        : [],
      categories_id: action?.data.categories_id
        ? JSON.stringify(action?.data?.categories_id)
        : [],
    });
    // console.log('nn', JSON.stringify(res.data?.data?.jobs?.data[2], null, 2));

    yield put({
      type: 'NEWSFEED_RECEIVED',

      newsfeed: res.data?.data?.jobs?.data,
      has_more_newsfeed: res.data.data.jobs.meta.has_more_pages,
    });
    yield put({
      type: 'REMOVE_ACTIONS_FROM_QUEUE',
      data: 'FETCH_NEWSFEED',
    });
  } catch (err) {
    if (err?.message === 'Network Error') {
      yield put({
        type: 'ADD_ACTIONS_TO_QUEUE',
        data: 'FETCH_NEWSFEED',
      });
    }

    console.log('fetchNewsfeedErr', JSON.stringify(err, null, 2));
  } finally {
    yield put({
      type: 'NEWSFEED_LOADING',
      data: false,
    });
  }
}
function* getMoreNewsfeed(action) {
  console.log('action in more jobs', action);
  const newsFeed = yield select(newsfeed);
  try {
    const res = yield fetchNewsfeed({
      token: yield select(token),
      page: action.data.page,
      sort_by: action.data.sort_by,
      proposal_count: action.data.proposal_count
        ? JSON.stringify([action.data.proposal_count])
        : [],
      budget: action.data.budget ? JSON.stringify(action.data.budget) : [],
      project_timeline: action.data.project_timeline
        ? JSON.stringify(action.data?.project_timeline)
        : [],
      categories_id: action?.data.categories_id
        ? JSON.stringify(action?.data?.categories_id)
        : [],
      search: action.data.search,
    });
    yield put({
      type: 'NEWSFEED_RECEIVED',
      newsfeed: newsFeed.concat(res.data.data.jobs.data),
      has_more_newsfeed: res.data.data.jobs.meta.has_more_pages,
    });
  } catch (err) {
    console.log('fetchMoreNewsfeedErr', err);
  }
}

function* applyJobFilters(action) {
  console.log('fgfg', JSON.stringify(action.data, null, 2));
  try {
    if (action?.data?.clearFilter === false) {
      yield put({
        type: 'CURRENT_FILTERS',
        data: [
          {
            sort: action.data.sort_by,
            bdRange: action.data.budget,
            proposal_count: action.data.proposal_count,
            timeline: action.data.project_timeline,
            category: action?.data.categories_id,
            filterCount: action?.data?.filterCount,
            categoryId: action?.data?.categoryId,
          },
        ],
      });
    } else {
      yield put({
        type: 'CLEAR_FILTERS',
      });
    }

    const currentFilter = yield select(currentFilters);
    // console.log('tt', JSON.stringify(currentFilter[0], null, 2));
    const res = yield fetchNewsfeed({
      token: yield select(token),
      page: action.data.page,
      sort_by: currentFilter[0]?.sort,
      proposal_count: currentFilter[0]?.proposal_count
        ? JSON.stringify([currentFilter[0]?.proposal_count])
        : [],
      budget: currentFilter[0]?.bdRange
        ? JSON.stringify(currentFilter[0]?.bdRange)
        : [],
      project_timeline: currentFilter[0]?.timeline
        ? JSON.stringify(currentFilter[0]?.timeline)
        : [],
      categories_id: currentFilter[0]?.category
        ? JSON.stringify([currentFilter[0]?.category])
        : [],
    });

    console.log('Filter data', JSON.stringify(res.config.params, null, 2));

    yield put({
      type: 'LOADER',
      data: false,
    });
    yield put({
      type: 'NEWSFEED_RECEIVED',

      newsfeed: res.data.data.jobs.data,
      has_more_newsfeed: res.data.data.jobs.meta.has_more_pages,
    });
  } catch (err) {
    console.log('tt1', JSON.stringify(currentFilter, null, 2));

    yield put({
      type: 'LOADER',
      data: false,
    });

    console.log('fetchNewsfeedErrwithFILTERS', JSON.stringify(err, null, 2));
  }
}

function* getProjectDetails(action) {
  yield put({
    type: 'IS_PROJECT_LOADING',
    data: true,
  });
  try {
    console.log('dssfs', action.data.projectId);
    const res = yield fetchProjectDetails({
      token: yield select(token),
      projectId: action.data.projectId,
    });

    yield put({
      type: 'PROJECT_DETAILS',

      projectDetails: res.data.data.job,
    });
  } catch (err) {
    console.log('fetchProjectDetailsErr', err.response.message);
  } finally {
    yield put({
      type: 'IS_PROJECT_LOADING',
      data: false,
    });
  }
}

export function* jobsActionWatcher() {
  yield takeLatest('FETCH_NEWSFEED', getNewsfeed);
  yield takeLatest('FETCH_MORE_NEWSFEED', getMoreNewsfeed);
  yield takeLatest('APPLY_JOB_FILTERS', applyJobFilters);

  yield takeLatest('FETCH_PROJECT_DETAILS', getProjectDetails);
}
