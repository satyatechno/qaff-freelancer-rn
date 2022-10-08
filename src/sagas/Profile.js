import {put, takeLatest, select} from 'redux-saga/effects';

import {
  displaySavedPosts,
  editProfile,
  fetchProfile,
  saveUnsave,
  updateProfile,
} from 'src/services/http.service';

import {
  token,
  newsfeed,
  savedPosts,
  has_more_newsfeed_page,
  has_more_saved_page,
  projectDetails,
  userProfile,
  quickbloxUser,
} from 'src/selectors/selector';
import Snackbar from 'react-native-snackbar';
import colors from 'src/styles/texts/colors';
import {updateQbUser} from 'src/helpers/updateQuickbloxUser';
import { firebase_update_user } from 'src/firebase';

function* fetchFullProfile() {
  try {
    const res = yield fetchProfile({
      token: yield select(token),
    });

    yield put({
      type: 'SAVE_PROFILE',
      data: res.data.data.public_profile,
    });
  } catch (err) {
    console.log('saga Error fetch profile', err);
  }
}

function* updatePersonalInfo(action) {
  const {login} = yield select(quickbloxUser);
  console.log('actiondata', action.data.data);
  try {
    const res = yield updateProfile({
      data: action.data.data,
      token: yield select(token),
    });
    firebase_update_user(res.data.data?.profile)
    // updateQbUser(action.data.firstName, action.data.lastName, login);
    console.log(
      'Update Personal Info',
      JSON.stringify(res?.data?.data, null, 2),
    );

    yield put({
      type: 'UPDATE_USER',
      data: res.data.data.profile,
    });
    yield put({
      type: 'IS_PROFILE_COMPLETED',
      data: res?.data?.data?.profile?.is_profile_completed,
    });
    // yield put({
    //   type: 'FETCH_PROFILE',
    // });
    yield put({
      type: 'LOADER',
      data: false,
    });

    if (action?.data?.naviation) {
      action.data?.naviation;
    }

    if (action.data.modal) {
      yield put({
        type: 'MODAL_VISIBLE',
        data: {
          visible: true,
          type: 1,
          message: res.data.message,
        },
      });
    } else {
      Snackbar.show({
        text: res.data.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appViolet,
      });
    }
  } catch (err) {
    console.log('saga Error update personal info', err);
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

function* updateUserProfile(action) {
  try {
    const res = yield editProfile({
      data: action.data.data,
      token: yield select(token),
    });
    console.log('object', JSON.stringify(res.data?.data, null, 2));

    yield put({
      type: 'SAVE_PROFILE',
      data: res.data.data.public_profile,
    });
    yield put({
      type: 'IS_PROFILE_COMPLETED',
      data: res.data.data?.public_profile?.is_profile_completed,
    });
    // yield put({
    //   type: 'FETCH_PROFILE',
    // });
    yield put({
      type: 'LOADER',
      data: false,
    });

    if (action?.data?.modal === true) {
      yield put({
        type: 'MODAL_VISIBLE',
        data: {
          visible: true,
          type: 1,
          message: res.data.message,
        },
      });
    }
    if (action?.data?.modal === false) {
      yield Snackbar.show({
        text: 'Record saved',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appViolet,
      });
    }
    if (action?.data?.naviation) {
      action.data?.naviation;
    }
  } catch (err) {
    console.log('saga Error update user profile', err?.response);
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
function* fetchSavedData(action) {
  // console.log('Saved actionData', action.data);
  try {
    const response = yield displaySavedPosts({
      token: yield select(token),
      page: action.data.page,
    });
    console.log('saved post', response.data);
    yield put({
      type: 'SAVED_DATA',
      savedPosts: response.data.data.jobs.data,
      has_more_page: response.data.data.jobs.meta.has_more_pages,
    });
    yield put({
      type: 'LOADER',
      data: false,
    });
  } catch (err) {
    console.log('myError', err);
    yield put({
      type: 'LOADER',
      data: false,
    });
  }
}
function* fetchMoreSavedData(action) {
  const savePost = yield select(savedPosts);
  // console.log('Saved more actionData', action.data);
  try {
    const response = yield displaySavedPosts({
      token: yield select(token),
      page: action.data.page,
    });

    yield put({
      type: 'SAVED_DATA',
      savedPosts: savePost.concat(response.data.data.jobs.data),
      has_more_page: response.data.data.jobs.meta.has_more_pages,
    });
  } catch (err) {
    console.log('error on saved post data ', err);
  }
}
function* updateSaveStatus(action) {
  let newsfeedData = [...(yield select(newsfeed))];
  let savedPostData = yield select(savedPosts);
  let hasMoreNewsFeed = yield select(has_more_newsfeed_page);
  let hasMoreSavePost = yield select(has_more_saved_page);
  let projectDetail = yield select(projectDetails);

  // console.log('Saved more actionData', action.data);
  try {
    const response = yield saveUnsave({
      token: yield select(token),
      id: action.data.id,
      status: action.data.status ? 'unsave' : 'save',
    });
    console.log('save status', response.data);
    newsfeedData.map((item) => {
      if (item.id === action.data.id) {
        item.is_saved = !action.data.status;
      }
    });

    if (action.data.status) {
      savedPostData = [...savedPostData].filter((item) => {
        if (item.id !== action.data.id) {
          return item;
        }
      });
    } else {
      let Item = newsfeedData.filter((item) => {
        if (item.id === action.data.id) {
          return item;
        }
      });
      savedPostData.splice(0, 0, Item[0]);
    }
    if (projectDetail?.id == action.data.id) {
      projectDetail.is_saved = !action.data.status;
    }
    yield put({
      type: 'PROJECT_DETAILS',
      projectDetails: {...projectDetail},
    });

    yield put({
      type: 'NEWSFEED_RECEIVED',

      newsfeed: [...newsfeedData],
      has_more_newsfeed: hasMoreNewsFeed,
    });
    yield put({
      type: 'SAVED_DATA',
      savedPosts: [...savedPostData],
      has_more_page: hasMoreSavePost,
    });
  } catch (err) {
    console.log('error on save status', err);
  }
}

function* updateEducation(action) {
  const public_profile = yield select(userProfile);
  try {
    if (action.data.type === 'add') {
      let temp = public_profile?.educations;
      temp.push(action.data.data);
      yield put({
        type: 'SAVE_PROFILE',
        data: {...public_profile, educations: [...temp]},
      });
    }

    if (action.data.type === 'edit') {
      public_profile.educations?.map((edu) => {
        if (edu.id === action.data.data.id) {
          // alert('abc');
          (edu.school_name = action.data.data.school_name),
            (edu.area_of_study = action.data.data.area_of_study),
            (edu.degree = action.data.data.degree.data),
            (edu.date_from = action.data.data.date_from),
            (edu.date_to = action.data.data.date_to),
            (edu.description = action.data.data.description);
          console.log('edited education', JSON.stringify(edu, null, 2));
        }
      });
      yield put({
        type: 'SAVE_PROFILE',
        data: {...public_profile},
      });
    }
    if (action.data.type === 'delete') {
      let index = public_profile?.educations?.findIndex(
        (education) => education.id === action.data.educationId,
      );
      index !== -1 && public_profile.educations?.splice(index, 1);
      yield put({
        type: 'SAVE_PROFILE',
        data: {...public_profile},
      });
    }
    yield put({
      type: 'LOADER',
      data: false,
    });
    if (action?.data?.modal === false) {
      Snackbar.show({
        text: 'Record saved',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appViolet,
      });
    }
    // console.log('ss', JSON.stringify(public_profile, null, 2));
  } catch (err) {
    yield put({
      type: 'LOADER',
      data: false,
    });
    console.error('error while updating education', err);
  }
}

function* updateEmployment(action) {
  const public_profile = yield select(userProfile);
  try {
    if (action.data.type === 'add') {
      let temp = public_profile?.employments;
      temp.push(action.data.data);
      yield put({
        type: 'SAVE_PROFILE',
        data: {...public_profile, employments: [...temp]},
      });
    }

    if (action.data.type === 'edit') {
      public_profile.employments?.map((emp) => {
        if (emp.id === action.data.data.id) {
          // alert('abc');
          (emp.company_name = action.data.data.company_name),
            (emp.city = action.data.data.city),
            (emp.country = action.data.data.country),
            (emp.from_month_year = action.data.data.from_month_year),
            (emp.to_month_year = action.data.data.to_month_year),
            (emp.currently_working = action.data.data.currently_working);
          emp.description = action.data.data.description;

          console.log('edited employment', JSON.stringify(emp, null, 2));
        }
      });
      yield put({
        type: 'SAVE_PROFILE',
        data: {...public_profile},
      });
    }
    if (action.data.type === 'delete') {
      let index = public_profile?.employments?.findIndex(
        (employment) => employment.id === action.data.employmentId,
      );
      index !== -1 && public_profile.employments?.splice(index, 1);
      yield put({
        type: 'SAVE_PROFILE',
        data: {...public_profile},
      });
    }
    yield put({
      type: 'LOADER',
      data: false,
    });
    if (action?.data?.modal === false) {
      Snackbar.show({
        text: 'Record saved',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appViolet,
      });
    }
    // console.log('ss', JSON.stringify(public_profile, null, 2));
  } catch (err) {
    yield put({
      type: 'LOADER',
      data: false,
    });
    console.error('error while updating employments', err);
  }
}

export function* profileActionWatcher() {
  yield takeLatest('FETCH_PROFILE', fetchFullProfile);
  yield takeLatest('UPDATE_PERSONAL_INFO', updatePersonalInfo);
  yield takeLatest('UPDATE_PROFILE', updateUserProfile);
  yield takeLatest('FETCH_SAVED_POST', fetchSavedData);
  yield takeLatest('FETCH_MORE_SAVED_POST', fetchMoreSavedData);
  yield takeLatest('UPDATE_SAVE_STATUS', updateSaveStatus);
  yield takeLatest('UPDATE_EDUCATION', updateEducation);
  yield takeLatest('UPDATE_EMPLOYMENT', updateEmployment);
}
