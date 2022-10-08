import AsyncStorage from '@react-native-community/async-storage';

const myReducer = (state, action) => {
  if (!state) {
    return {
      user: [],

      userProfile: [],
      loading: false,
      modal: {},
      savedPosts: [],
      has_more_saved_page: false,
    };
  }

  switch (action.type) {
    case 'SAVE_USER':
      AsyncStorage.setItem('FirstTimeLogin', 'true');
      console.log('REDUX_USER_DATA', action.data);
      return {
        ...state,
        user: action.data,
        firstTimeLogin: false,
      };
    // case 'LOGOUT':
    //   return {
    //     ...state,
    //     user: [],
    //     userProfile: [],
    //   };
    case 'SAVE_PROFILE':
      return {
        ...state,
        userProfile: action.data,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          freelancer_profile: action.data,
        },
      };
    case 'SAVE_PORTFOLIO':
      return {
        ...state,
        portfolioData: action.data,
      };
    case 'PORTFOLIO_DETAIL':
      return {
        ...state,
        portfolioDetails: action.data,
      };
    case 'MODAL_VISIBLE':
      return {
        ...state,
        modal: action.data,
      };
    case 'LOADER':
      return {
        ...state,
        loading: action.data,
      };
    case 'SAVED_DATA':
      return {
        ...state,
        savedPosts: action.savedPosts,
        has_more_saved_page: action.has_more_page,
      };
    case 'UPDATE_EMAIL':
      return {
        ...state,
        user: {
          ...state.user,
          freelancer_profile: {
            ...state.user.freelancer_profile,
            email: action.data,
          },
        },
      };
    case 'UPDATE_MOBILE':
      return {
        ...state,
        user: {
          ...state.user,
          freelancer_profile: {
            ...state.user.freelancer_profile,
            country_code: action.data[0],
            phone: action.data[1],
          },
        },
      };
    case 'IS_PROFILE_COMPLETED':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          is_profile_completed: action.data,
        },
      };
    default:
      return state;
  }
};

export default myReducer;
