export const SEND_MESSAGE = (data) => ({
  type: 'SEND_MESSAGE',
  data,
});
export const FETCH_MESSAGE = (data) => ({
  type: 'FETCH_MESSAGE',
  data,
});

export const SET_DELIEVERED_STATUS = (data) => ({
  type: 'SET_DELIEVERED_STATUS',
  data,
});
export const FETCH_CONTACTS = () => ({
  type: 'FETCH_CONTACTS',
});
export const UPDATE_CHAT_DIALOG = (data) => ({
  type: 'UPDATE_CHAT_DIALOG',
  data,
});
export const SET_CONTACT_LOADING = (data) => ({
  type: 'SET_CONTACT_LOADING',
  data,
});
export const SET_CONTACT_REFRESHING = (data) => ({
  type: 'SET_CONTACT_REFRESHING',
  data,
});
export const GET_CHAT_DIALOGS = (data) => ({
  type: 'GET_CHAT_DIALOGS',
  data,
});
export const SET_DIALOG_LOADING = (data) => ({
  type: 'SET_DIALOG_LOADING',
  data,
});
export const FILE_UPLOAD_SUCCESS = (data) => ({
  type: 'FILE_UPLOAD_SUCCESS',
  data,
});
export const CONNECT_TO_CHAT = (data) => ({
  type: 'CONNECT_TO_CHAT',
  data,
});
