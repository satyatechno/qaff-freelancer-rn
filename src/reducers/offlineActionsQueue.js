const offlineActionsReducer = (state, action) => {
  if (!state) {
    return {
      queuedActions: [],
    };
  }

  switch (action.type) {
    case 'ADD_ACTIONS_TO_QUEUE':
      let dummy = [...state.queuedActions];
      if (!dummy?.includes(action.data)) {
        dummy.push(action.data);
      }
      return {
        ...state,
        queuedActions: [...dummy],
      };
    case 'REMOVE_ACTIONS_FROM_QUEUE':
      let temp = [...state.queuedActions];

      if (temp.includes(action.data)) {
        temp.splice(temp.indexOf(action.data, 1));
      }

      return {
        ...state,
        queuedActions: [...temp],
      };

    default:
      return state;
  }
};

export default offlineActionsReducer;
