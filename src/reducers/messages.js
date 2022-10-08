const messagesReducer = (state, action) => {
  if (!state) {
    return {
      messages: [],
      isTyping: false,
      chatDialogs: [],
      isConnected: false,
      contacts: [],
      chatConnectionError: false,
      isContactLoading: false,
      isContactRefreshing: false,
      isDialogLoading: false,
      isSessionActive: false,
      isSessionLoading: false,
      chatConnectionLoading: false,
    };
  }

  switch (action.type) {
    case 'SEND_MESSAGE':
      return {
        ...state,
        messages: [action.data, ...state.messages],
      };
    case 'FETCH_MESSAGE':
      return {
        ...state,
        messages: action.data,
      };
    case 'SET_DELIEVERED_STATUS':
      return {
        ...state,
        messages: action.data,
      };

    case 'USER_IS_TYPING':
      return {
        ...state,
        isTyping: action.data,
      };
    case 'SET_READ_STATUS':
      return {
        ...state,
        messages: action.data,
      };
    case 'CHAT_DIALOG':
      return {
        ...state,
        chatDialogs: action.data,
      };
    case 'CHAT_CONNECTED':
      return {
        ...state,
        isConnected: action.data,
      };
    case 'CONTACTS':
      return {
        ...state,
        contacts: action.data,
      };

    case 'CHAT_CONNECTION_ERROR':
      return {
        ...state,
        chatConnectionError: action.data,
      };
    case 'SET_CONTACT_LOADING':
      return {
        ...state,
        isContactLoading: action.data,
      };
    case 'SET_CONTACT_REFRESHING':
      return {
        ...state,
        isContactRefreshing: action.data,
      };
    case 'SET_DIALOG_LOADING':
      return {
        ...state,
        isDialogLoading: action.data,
      };
    case 'IS_QUICKBLOX_SESSION':
      return {
        ...state,
        isSessionActive: action.data,
      };
    case 'SESSION_LOADING':
      return {
        ...state,
        isSessionLoading: action.data,
      };
    case 'IS_CHAT_CONNECTION_LOADING':
      return {
        ...state,
        chatConnectionLoading: action.data,
      };

    default:
      return state;
  }
};

export default messagesReducer;
