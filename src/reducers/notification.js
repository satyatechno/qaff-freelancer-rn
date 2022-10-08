const notificationReducer = (state, action) => {
  if (!state) {
    return {
      notification_loading: false,
      notifications: [],
      has_more_notifications_page: false,
      latestNotification: [],
      unReadNotification: 0,
      isLoadingMore: false,
    };
  }

  switch (action.type) {
    case 'FETCH_NOTIFICATIONS':
      return {
        ...state,
        notification_loading: true,
      };
    case 'NOTIFICATIONS_DATA':
      return {
        ...state,
        notifications: action.notifications,
        latestNotification: action.latestNotification,
        notification_loading: false,
        has_more_notifications_page: action.has_more_page,
      };
    case 'UNREAD_NOTIFICATION':
      return {
        ...state,
        unReadNotification: action.data,
      };
    case 'IS_LOADING_MORE':
      return {
        ...state,
        isLoadingMore: action.data,
      };
    default:
      return state;
  }
};

export default notificationReducer;
