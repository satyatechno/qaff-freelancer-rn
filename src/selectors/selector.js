export const token = (state) => state.myReducer.user.token;
export const newsfeed = (state) => state.jobsReducer.newsfeed;

export const activeProposals = (state) =>
  state.proposalsReducer.activeProposals;

export const draftProposals = (state) => state.proposalsReducer.draftProposals;
export const archivedProposals = (state) =>
  state.proposalsReducer.archivedProposals;

export const submittedProposals = (state) =>
  state.proposalsReducer.submittedProposals;
export const activeContracts = (state) =>
  state.contractsReducer.activeContracts;
export const closedContracts = (state) =>
  state.contractsReducer.closedContracts;
export const disputedContracts = (state) =>
  state.contractsReducer.disputedContracts;

export const quickbloxUser = (state) =>
  state.myReducer.user?.freelancer_profile?.quickblox;

export const messages = (state) => state.messagesReducer.messages;
export const chatDialogs = (state) => state.messagesReducer.chatDialogs;
export const contacts = (state) => state.messagesReducer.contacts;
export const notifications = (state) => state.notificationReducer.notifications;
export const latestNotification = (state) =>
  state.notificationReducer.latestNotification;
export const totalActiveProposals = (state) =>
  state.proposalsReducer.totalActiveProposals;

export const pendingInvitations = (state) =>
  state.proposalsReducer.pendingInvitations;
export const totalDraftProposals = (state) =>
  state.proposalsReducer.totalDraftProposals;
export const savedPosts = (state) => state.myReducer.savedPosts;
export const has_more_newsfeed_page = (state) =>
  state.jobsReducer.has_more_newsfeed_page;
export const has_more_saved_page = (state) =>
  state.myReducer.has_more_saved_page;
export const projectDetails = (state) => state.jobsReducer.projectDetails;
export const currentFilters = (state) => state.jobsReducer.currentFilters;
export const userProfile = (state) => state.myReducer.userProfile;
export const pendingOffers = (state) => state.proposalsReducer.pendingOffers;
export const expiredOffers = (state) => state.proposalsReducer.expiredOffers;
export const declinedOffers = (state) => state.proposalsReducer.declinedOffers;
export const expiredInvitations = (state) =>
  state.proposalsReducer.expiredInvitations;
export const declinedInvitations = (state) =>
  state.proposalsReducer.declinedInvitations;

export const user = (state) => state.myReducer.user;
export const myDisputes = (state) => state.disputeReducer.myDisputes;

