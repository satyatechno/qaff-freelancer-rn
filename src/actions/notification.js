export const FETCH_NOTIFICATIONS = () => ({
  type: 'FETCH_NOTIFICATIONS',
});
export const FETCH_MORE_NOTIFICATIONS = (data) => ({
  type: 'FETCH_MORE_NOTIFICATIONS',
  data,
});
export const UNREAD_NOTIFICATION = (data) => ({
  type: 'UNREAD_NOTIFICATION',
  data,
});
export const SETUP_NOTIFICATION_EVENTS = () => ({
  type: 'SETUP_NOTIFICATION_EVENTS',
});
