const chatReducer = (state, action) => {
  if (!state) {
    return {
      // FireBaseChat Variable
      chatServerConnected: false,
      connectionFailed: false,
      dialogs: '',
      channels: [],
      chatHistory: [],
      chatLoading: true,
      activeDialog: {},
      unreadMessageCount: 0
    };
  }

  switch (action.type) {
    case 'GET_CHANNELS': {
      return {
        ...state,
        channels: action.payload,
      };
    }

    case 'GET_CHAT_HISTORY':
      return {
        ...state,
        chatHistory: action.payload,
      };

    case 'CHAT_LOADING':
      return {
        ...state,
        chatLoading: action.payload,
      };

    case 'SET_ACTIVE_OPPONENT':
      return {
        ...state,
        activeDialog: action.payload,
      };
    case 'CHAT_SERVER_STATUS':
      return {
        ...state,
        chatServerConnected: action.payload,
      };
    case 'GET_DIALOGS':
      return {
        ...state,
        dialogs: action.payload,
      };
    case 'ADD_ATTACHMENT_URL':
      let {id, url} = action.payload;
      let newArray = [...state.chatHistory];
      let i = newArray.findIndex((_item) => _item.id === id);
      if (i > -1) {
        newArray[i] = {
          ...newArray[i],
          url,
        };
      }
      // console.log('history', newArray);
      return {
        ...state,
        chatHistory: [...newArray],
      };

      case "SET_UNREAD_MESSAGE_COUNT":
        return {
          ...state,
          unreadMessageCount: action.payload,
        };

    default:
      return state;
  }
};

export default chatReducer;
