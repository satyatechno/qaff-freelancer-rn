import {put, takeLatest, select} from 'redux-saga/effects';
import {
  getProposalList,
  getProposalDetails,
  createProposal,
  fetchInvitations,
  getContractDetails,
  getContractsList,
  declineInvitation,
} from 'src/services/http.service';
import {
  token,
  activeProposals,
  draftProposals,
  submittedProposals,
  totalActiveProposals,
  pendingInvitations,
  pendingOffers,
  archivedProposals,
  expiredInvitations,
  declinedOffers,
  expiredOffers,
} from 'src/selectors/selector';
import Snackbar from 'react-native-snackbar';
import colors from 'src/styles/texts/colors';

function* fetchProposalList(action) {
  console.log('saga action proposal list', action.data);
  try {
    const res = yield getProposalList({
      token: yield select(token),
      type: action.data.type,
      page: action.data.page,
      search: action.data.search,
    });
    yield put({
      type: 'LOADER',
      data: false,
    });

    if (action.data.type === 'archived') {
      yield put({
        type: 'ARCHIVED_PROPOSALS',
        proposals: res.data.data.proposals.data,
        has_more_proposals: res.data.data.proposals.meta.has_more_pages,
        totalProposals: res.data.data.proposals.meta.total_items,
      });
    }

    if (action.data.type === 'published') {
      yield put({
        type: 'SUBMITTED_PROPOSALS',
        proposals: res.data.data.proposals.data,
        has_more_proposals: res.data.data.proposals.meta.has_more_pages,
        totalProposals: res.data.data.proposals.meta.total_items,
      });
    }
    if (action.data.type === 'draft') {
      yield put({
        type: 'DRAFT_PROPOSALS',
        proposals: res.data.data.proposals.data,
        has_more_proposals: res.data.data.proposals.meta.has_more_pages,
        totalProposals: res.data.data.proposals.meta.total_items,
      });
    }
    if (action.data.type === 'active') {
      yield put({
        type: 'ACTIVE_PROPOSALS',
        proposals: res.data.data.proposals.data,
        has_more_proposals: res.data.data.proposals.meta.has_more_pages,
        totalProposals: res.data.data.proposals.meta.total_items,
      });
    }
  } catch (err) {
    yield put({
      type: 'LOADER',
      data: false,
    })
    console.log('fetchProposals', err?.response?.data);
  }
}
function* fetchMoreProposalList(action) {
  const activeProposal = yield select(activeProposals);
  const draftProposal = yield select(draftProposals);
  const submittedProposal = yield select(submittedProposals);
  const archiveProposal = yield select(archivedProposals);

  console.log('saga action More proposal list', action.data);
  try {
    const res = yield getProposalList({
      token: yield select(token),
      type: action.data.type,
      page: action.data.page,
      search: action.data.search,
    });

    yield put({
      type: 'LOADER',
      data: false,
    });
    if (action.data.type === 'archived') {
      yield put({
        type: 'ARCHIVED_PROPOSALS',
        proposals: archiveProposal.concat(res.data.data.proposals.data),
        has_more_proposals: res.data.data.proposals.meta.has_more_pages,
        totalProposals: res.data.data.proposals.meta.total_items,
      });
    }
    if (action.data.type === 'active') {
      yield put({
        type: 'ACTIVE_PROPOSALS',
        proposals: activeProposal.concat(res.data.data.proposals.data),
        has_more_proposals: res.data.data.proposals.meta.has_more_pages,
        totalProposals: res.data.data.proposals.meta.total_items,
      });
    }
    if (action.data.type === 'draft') {
      yield put({
        type: 'DRAFT_PROPOSALS',
        proposals: draftProposal.concat(res.data.data.proposals.data),
        has_more_proposals: res.data.data.proposals.meta.has_more_pages,
        totalProposals: res.data.data.proposals.meta.total_items,
      });
    }
    if (action.data.type === 'published') {
      yield put({
        type: 'SUBMITTED_PROPOSALS',
        proposals: submittedProposal.concat(res.data.data.proposals.data),
        has_more_proposals: res.data.data.proposals.meta.has_more_pages,
        totalProposals: res.data.data.proposals.meta.total_items,
      });
    }
  } catch (err) {
    yield put({
      type: 'LOADER',
      data: false,
    });
    console.log('fetcMoreProposals', err?.response?.data);
  }
}

function* fetchProposalDetails(action) {
  console.log('actionproposal details', action.data);
  try {
    yield put({
      type: 'IS_PROPOSAL_DETAIL_LOADING',
      data: true,
    });
    const res = yield getProposalDetails({
      token: yield select(token),
      id: action.data.id,
    });
    console.log('proposal details', res.data.data.proposal);
    yield put({
      type: 'PROPOSAL_DETAILS',
      proposalDetails: res.data.data.proposal,
    });
    yield put({
      type: 'IS_PROPOSAL_DETAIL_LOADING',
      data: false,
    });
  } catch (err) {
    yield put({
      type: 'IS_PROPOSAL_DETAIL_LOADING',
      data: false,
    });
    console.log('Proposal details err', err?.response?.data);
  }
}

function* oncreateProposal(action) {
  const activeProposal = yield select(activeProposals);
  const totalProposal = yield select(totalActiveProposals);
  try {
    const res = yield createProposal({
      token: yield select(token),
      projectId: action.data.projectId,
      proposal: action.data.proposal,
    });

    console.log('ADD pROPOSAL \n', res.data);

    yield put({
      type: 'LOADER',
      data: false,
    });
    
    action.data.navigation.replace('ProposalSent', {
      client_name: action.data.client_name,
    });
yield put({
  type: 'FETCH_NEWSFEED',
  data: {page: 1}
})
    yield put({
      type: 'ACTIVE_PROPOSALS',
      proposals: [res.data.data.proposal, ...activeProposal],
      has_more_proposals: false,
      totalProposals: totalProposal + 1,
    });
  } catch (err) {
    yield put({
      type: 'LOADER',
      data: false,
    });

    if (err.response?.status === 406) {
      console.log('ds', JSON.stringify(err?.response, null, 2));
      yield put({
        type: 'MODAL_VISIBLE',
        data: {
          visible: true,
          type: 2,
          message: err.response?.data?.message,
        },
      });
    }

    if (err.response?.status === 402) {
      yield put({
        type: 'MODAL_VISIBLE',
        data: {
          visible: true,
          type: 2,
          message: err.response?.data?.message,
        },
      });
    }

    console.log(
      'createProposalsErr',
      JSON.stringify(err?.response?.data, null, 2),
    );
  }
}

function* getInvitations(action) {
  try {
    const res = yield fetchInvitations({
      token: yield select(token),
      type: action.data.type,
      page: action.data.page,
      search: action.data.search,
    });

    if (action.data.type === 'pending') {
      yield put({
        type: 'PENDING_INVITATIONS',
        data: res?.data?.data?.invitation?.data,
        hasMorePage: res?.data?.data?.invitation.meta.has_more_pages,
      });
    }
    if (action.data.type === 'rejected') {
      yield put({
        type: 'DECLINED_INVITATIONS',
        data: res?.data?.data?.invitation?.data,
        hasMorePage: res?.data?.data?.invitation.meta.has_more_pages,
      });
    }
    if (action.data.type === 'expired') {
      yield put({
        type: 'EXPIRED_INVITATIONS',
        data: res?.data?.data?.invitation?.data,
        hasMorePage: res?.data?.data?.invitation.meta.has_more_pages,
      });
    }
    yield put({
      type: 'LOADER',
      data: false,
    });
  } catch (err) {
    yield put({
      type: 'LOADER',
      data: false,
    });
    console.error('Fetch invitation err', JSON.stringify(err, null, 2));
  }
}

function* updateInvitations(action) {
  const currentPendingInvitation = yield select(pendingInvitations);
  try {
    let temp = [...currentPendingInvitation];
    let removeIndex = temp?.findIndex((x) => x.id === action.data.invitationId);
    removeIndex !== -1 && temp.splice(removeIndex, 1);
    yield put({
      type: 'PENDING_INVITATIONS',
      data: [...temp],
      // hasMorePage: res?.data?.data?.invitation.meta.has_more_pages
    });
    Snackbar.show({
      text: action.data.message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: colors.appGreen,
    });
  } catch (err) {
    console.error(
      'UPDATE INVITATION ERROR',
      JSON.stringify(err?.response?.data, null, 2),
    );
  }
}

function* getOffers(action) {
  try {
    const res = yield getContractsList({
      token: yield select(token),
      type: action.data.type,
      page: action.data.page,
      search: action.data.search,
    });

    // console.log('saga offer', JSON.stringify(action.type, null, 2));

    if (action.data.type === 'pending') {
      yield put({
        type: 'PENDING_OFFERS',
        data: res?.data?.data?.contracts?.data,
        hasMorePage: res?.data?.data?.contracts.meta.has_more_pages,
      });
    }
    if (action.data.type === 'expired') {
      yield put({
        type: 'EXPIRED_OFFERS',
        data: res?.data?.data?.contracts?.data,
        hasMorePage: res?.data?.data?.contracts.meta.has_more_pages,
      });
    }
    if (action.data.type === 'rejected') {
      yield put({
        type: 'DECLINED_OFFERS',
        data: res?.data?.data?.contracts?.data,
        hasMorePage: res?.data?.data?.contracts.meta.has_more_pages,
      });
    }
    yield put({
      type: 'LOADER',
      data: false,
    });
  } catch (err) {
    yield put({
      type: 'LOADER',
      data: false,
    });
    console.error('Fetch offers error', err);
  }
}

function* getMoreInvitations(action) {
  const existingPendingInvitations = yield select(pendingInvitations);
  const existingExpiredInvitations = yield select(expiredInvitations);
  const existingDeclinedInvitations = yield select(declineInvitation);
  try {
    const res = yield fetchInvitations({
      token: yield select(token),
      type: action.data.type,
      page: action.data.page,
      search: action.data.search,
    });

    yield put({
      type: 'LOADER',
      data: false,
    });
    if (action.data.type === 'pending') {
      yield put({
        type: 'PENDING_INVITATIONS',
        data: existingPendingInvitations.concat(
          res?.data?.data?.invitation?.data,
        ),
        hasMorePage: res?.data?.data?.invitation.meta.has_more_pages,
      });
    }
    if (action.data.type === 'expired') {
      yield put({
        type: 'EXPIRED_INVITATIONS',
        data: existingExpiredInvitations.concat(
          res?.data?.data?.invitation?.data,
        ),
        hasMorePage: res?.data?.data?.invitation.meta.has_more_pages,
      });
    }
    if (action.data.type === 'rejected') {
      yield put({
        type: 'DECLINED_INVITATIONS',
        data: existingDeclinedInvitations.concat(
          res?.data?.data?.invitation?.data,
        ),
        hasMorePage: res?.data?.data?.invitation.meta.has_more_pages,
      });
    }
  } catch (err) {
    yield put({
      type: 'LOADER',
      data: false,
    });
    console.log('fetcMoreInvitations error', err?.response?.data);
  }
}

function* getMoreOffers(action) {
  const existingPendingOffers = yield select(pendingOffers);
  const existingDeclinedOffers = yield select(declinedOffers);
  const existingExpiredOffers = yield select(expiredOffers);
  try {
    const res = yield fetchInvitations({
      token: yield select(token),
      type: action.data.type,
      page: action.data.page,
      search: action.data.search,
    });

    yield put({
      type: 'LOADER',
      data: false,
    });
    if (action.data.type === 'pending') {
      yield put({
        type: 'PENDING_OFFERS',
        data: existingPendingOffers.concat(res?.data?.data?.contracts?.data),
        hasMorePage: res?.data?.data?.contracts.meta.has_more_pages,
      });
    }
    if (action.data.type === 'rejected') {
      yield put({
        type: 'DECLINED_OFFERS',
        data: existingDeclinedOffers.concat(res?.data?.data?.contracts?.data),
        hasMorePage: res?.data?.data?.contracts.meta.has_more_pages,
      });
    }
    if (action.data.type === 'expired') {
      yield put({
        type: 'EXPIRED_OFFERS',
        data: existingExpiredOffers.concat(res?.data?.data?.contracts?.data),
        hasMorePage: res?.data?.data?.contracts.meta.has_more_pages,
      });
    }
  } catch (err) {
    yield put({
      type: 'LOADER',
      data: false,
    });
    console.log('fetcMoreOffers Error', err?.response?.data);
  }
}

function* updatePendingOffers(action) {
  const currentPendingOffers = yield select(pendingOffers);
  try {
    let temp = [...currentPendingOffers];
    let removeIndex = temp?.findIndex((x) => x.id === action.data.contractId);
    removeIndex !== -1 && temp.splice(removeIndex, 1);
    yield put({
      type: 'PENDING_OFFERS',
      data: [...temp],
      // hasMorePage: res?.data?.data?.invitation.meta.has_more_pages
    });
    Snackbar.show({
      text: action.data.message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: colors.appGreen,
    });
  } catch (err) {
    console.error(
      'UPDATE PENDING OFFER ERROR',
      JSON.stringify(err?.response?.data, null, 2),
    );
  }
}

export function* proposalsActionWatcher() {
  yield takeLatest('FETCH_PROPOSAL_LIST', fetchProposalList);
  yield takeLatest('FETCH_MORE_PROPOSAL_LIST', fetchMoreProposalList);
  yield takeLatest('FETCH_PROPOSAL_DETAILS', fetchProposalDetails);
  yield takeLatest('CREATE_PROPOSAL', oncreateProposal);
  yield takeLatest('FETCH_INVITATIONS', getInvitations);
  yield takeLatest('UPDATE_INVITATIONS', updateInvitations);
  yield takeLatest('FETCH_OFFERS', getOffers);
  yield takeLatest('FETCH_MORE_INVITATIONS', getMoreInvitations);
  yield takeLatest('FETCH_MORE_OFFERS', getMoreOffers);
  yield takeLatest('UPDATE_PENDING_OFFERS', updatePendingOffers);
}
