const proposalsReducer = (state, action) => {
  if (!state) {
    return {
      activeProposals: [],
      draftProposals: [],
      submittedProposals: [],
      archivedProposals: [],
      has_more_proposals_page: false,
      totalActiveProposals: 0,
      totalDraftProposals: 0,
      proposalDetails: undefined,
      pendingInvitations: [],
      has_more_pending_invitations: false,
      declinedInvitations: [],
      has_more_declined_invitations: false,
      pendingOffers: [],
      has_more_pending_offers: false,
      expiredInvitations: [],
      has_more_expired_invitations: false,
      expiredOffers: [],
      has_more_expired_offers: false,
      declinedOffers: [],
      has_more_declined_offers: false,
      isProposalDetailLoading: false,
    };
  }

  switch (action.type) {
    case 'ACTIVE_PROPOSALS':
      return {
        ...state,
        activeProposals: action.proposals,
        has_more_proposals_page: action.has_more_proposals,
        totalActiveProposals: action.totalProposals,
      };
    case 'DRAFT_PROPOSALS':
      return {
        ...state,
        draftProposals: action.proposals,
        has_more_proposals_page: action.has_more_proposals,
        totalDraftProposals: action.totalProposals,
      };
    case 'SUBMITTED_PROPOSALS':
      return {
        ...state,
        submittedProposals: action.proposals,
        has_more_proposals_page: action.has_more_proposals,
        totalActiveProposals: action.totalProposals,
      };
    case 'ARCHIVED_PROPOSALS':
      return {
        ...state,
        archivedProposals: action.proposals,
        has_more_proposals_page: action.has_more_proposals,
        totalActiveProposals: action.totalProposals,
      };
    case 'PROPOSAL_DETAILS':
      return {
        ...state,
        proposalDetails: action.proposalDetails,
      };
    case 'SAVE_TO_DRAFT':
      return {
        ...state,
        draftProposals: [action.data, ...state.draftProposals],
        totalDraftProposals: state.totalDraftProposals + 1,
      };
    case 'UPDATE_ACTIVE_PROPOSALS':
      let tempActive = [...state.activeProposals].filter(
        (x) => x.id === action.data?.id,
      );

      return {
        ...state,
        activeProposals: [action.data, ...tempActive],
        proposalDetails: action.data,
      };
    case 'UPDATE_DRAFT_PROPOSALS':
      let tempDraft = [...state.draftProposals].filter(
        (x) => x.id === action.data?.id,
      );

      return {
        ...state,
        draftProposals: [action.data, ...tempDraft],
        proposalDetails: action.data,
      };

    case 'PENDING_INVITATIONS':
      return {
        ...state,
        pendingInvitations: action.data,
        has_more_pending_invitations: action.hasMorePage,
      };
    case 'DECLINED_INVITATIONS':
      return {
        ...state,
        declinedInvitations: action.data,
        has_more_declined_invitations: action.hasMorePage,
      };
    case 'EXPIRED_INVITATIONS':
      return {
        ...state,
        expiredInvitations: action.data,
        has_more_expired_invitations: action.hasMorePage,
      };

    case 'PENDING_OFFERS':
      // console.log('ss', JSON.stringify(action.data, null, 2));
      return {
        ...state,
        pendingOffers: action.data,
        has_more_pending_offers: action.hasMorePage,
      };
    case 'EXPIRED_OFFERS':
      // console.log('ss', JSON.stringify(action.data, null, 2));
      return {
        ...state,
        expiredOffers: action.data,
        has_more_expired_offers: action.hasMorePage,
      };
    case 'DECLINED_OFFERS':
      // console.log('ss', JSON.stringify(action.data, null, 2));
      return {
        ...state,
        declinedOffers: action.data,
        has_more_declined_offers: action.hasMorePage,
      };
    case 'IS_PROPOSAL_DETAIL_LOADING':
      // console.log('ss', JSON.stringify(action.data, null, 2));
      return {
        ...state,
        isProposalDetailLoading: action.data,
      };
    default:
      return state;
  }
};

export default proposalsReducer;
