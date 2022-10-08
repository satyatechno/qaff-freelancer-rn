import axios from 'axios';
import {I18nManager} from 'react-native';
import {LOGOUT} from 'src/actions/action';
import {store} from 'src/store';
import * as RootNavigation from 'src/utils/Navigation';

export const axiosInstance = axios.create({
  baseURL:
    // 'http://qaff-backend-env.eba-gfth7thz.me-south-1.elasticbeanstalk.com/api/',
    // 'http://157.175.79.139/back-dev/api/',
    'https://dev.qaff.com/back-dev/api/',
  // 'https://backend.qaff.com/api/',
  headers: {
    Accept: 'application/json',
    'Accept-Language': I18nManager.isRTL ? 'ar' : 'en',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      RootNavigation.dispatch('Authentication', {screen: 'Login'});
      store.dispatch(LOGOUT());
      alert(error?.response?.data?.message);
    } else if (error?.response?.status === 500) {
      alert(error?.response?.data?.message);
    } else if (error?.response?.status === 404) {
      alert(error?.response?.data?.message);
    } else if (error?.response?.status === 406) {
      throw error;
    } else if (error?.response?.status === 422) {
      throw error;
    } else {
      alert('Something went wrong.');
      throw error;
    }
  },
);

export const register = (data) => {
  return axiosInstance.post('register/freelancer', data);
};

export const resendOTP = (data) => {
  return axiosInstance.post(
    'sendEmailVerification',
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};

export const emailVerification = (data) => {
  return axiosInstance.post('verifyEmailOtp', data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const createPassword = (data) => {
  return axiosInstance.post('verifyEmailAndSetPassword', data, {
    params: {account_type: 'freelancer'},
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const forgotPassword = (data) => {
  return axiosInstance.post('reset_password/send_otp', data, {});
};
export const otpVerification = (data) => {
  return axiosInstance.post('reset_password/check_otp', data);
};
export const createNewPassword = (data) => {
  return axiosInstance.post('reset_password/set_password', data);
};
export const login = (data) => {
  return axiosInstance.post('login/freelancer', data);
};
export const fetchProfile = (data) => {
  return axiosInstance.get('freelancer/public_profile', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const updateProfile = (data) => {
  return axiosInstance.post('freelancer/profile/update', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const addPortfolio = (data) => {
  return axiosInstance.post('freelancer/portfolio/add_portfolio', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const editProfile = (data) => {
  return axiosInstance.post('freelancer/update_public_profile', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const fetchPortfolioList = (data) => {
  return axiosInstance.get('freelancer/portfolio', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const fetchPortfolioDetails = (data) => {
  return axiosInstance.get(`freelancer/portfolio/${data.id}/show`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const editPortfolio = (data) => {
  return axiosInstance.post(
    `freelancer/portfolio/${data.id}/update`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const deletePortfolio = (data) => {
  return axiosInstance.delete(`freelancer/portfolio/${data.id}/delete`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const fetchNewsfeed = (data) => {
  return axiosInstance.get('freelancer/jobs', {
    params: {
      page: data.page,
      sort_by: data.sort_by,
      proposal_count: data.proposal_count,
      budget: data.budget,
      project_timeline: data.project_timeline,
      categories_id: data.categories_id,
      search: data.search,
    },

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const getProposalList = (data) => {
  return axiosInstance.get('freelancer/proposals', {
    params: {
      page: data.page,
      type: data.type,
      search: data.search,
    },

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const getProposalDetails = (data) => {
  return axiosInstance.get(`freelancer/proposals/${data.id}/show`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const fetchProjectDetails = (data) => {
  return axiosInstance.get(`freelancer/jobs/${data.projectId}/show`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const createProposal = (data) => {
  return axiosInstance.post(
    `freelancer/jobs/${data.projectId}/proposal/create`,
    data.proposal,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};

export const oneSignalPlayerIdRegister = (data) =>
  axiosInstance.post('freelancer/update_player_id', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const socialLogin = (data) =>
  axiosInstance.post(`social_login/${data.name}`, data.data);

export const socialSignup = (data) =>
  axiosInstance.post(`social_signup/${data.name}`, data.data);

export const logout = (data) =>
  axiosInstance.get('logout', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const getContractsList = (data) =>
  axiosInstance.get('freelancer/contracts', {
    params: {
      page: data.page,
      type: data.type,
      search: data.search,
    },
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const getContractDetails = (data) =>
  axiosInstance.get(`freelancer/contracts/${data.id}/show`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const showContacts = (data) =>
  axiosInstance.get(`freelancer/contacts`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const getNotifications = (data) => {
  return axiosInstance.get('freelancer/notifications', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      page: data?.page,
    },
  });
};
export const readNotification = (data) =>
  axiosInstance.post(
    `freelancer/notifications/mark_as_read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
export const createClientProfile = (data) =>
  axiosInstance.post('freelancer/create_profile', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const saveUnsave = (data) => {
  // console.log("hellooo",data)
  return axiosInstance.post(
    `freelancer/jobs/${data.id}/${data.status}`,
    {},

    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const displaySavedPosts = (data) => {
  return axiosInstance.get('freelancer/jobs/saved', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      page: data.page,
    },
  });
};

export const budgetRanges = () => axiosInstance.get('data/budget_ranges');

export const fetchProjectTimeline = () =>
  axiosInstance.get('data/project_timelines');

export const fetchCategories = () => axiosInstance.get('categories/main');

export const fetchSubCategories = (id) => axiosInstance.get(`category/${id}`);
export const sendOtp = (data) =>
  axiosInstance.post(`auth/send_otp`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const updateAuthDetails = (data) =>
  axiosInstance.post(`auth/update/${data.type}`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const fetchUserSettings = (token) => {
  return axiosInstance.get('freelancer/settings', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserSettings = (data) =>
  axiosInstance.post('freelancer/settings/update', data.setting, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const TwoStepLogin = (data) => {
  return axiosInstance.post('freelancer/two_step_verification', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const updateProposal = (data) => {
  return axiosInstance.post(
    `freelancer/proposal/${data.proposalId}/update`,
    data.proposal,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const fetchCountriesList = ({search}) =>
  axiosInstance.get('data/country_list', {
    params: {
      search,
    },
  });
export const fetchCityList = ({search, countryId}) =>
  axiosInstance.get('data/city_list', {
    params: {
      country_id: countryId,
      search,
    },
  });
export const addEducation = (data) => {
  return axiosInstance.post('freelancer/profile/education/add', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const editEducation = (data) => {
  return axiosInstance.post(
    `freelancer/profile/education/${data.educationId}/update`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const deleteEducation = (data) => {
  return axiosInstance.delete(
    `freelancer/profile/education/${data.educationId}/delete`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const addEmployment = (data) => {
  return axiosInstance.post('freelancer/profile/employment/add', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const editEmployment = (data) => {
  return axiosInstance.post(
    `freelancer/profile/employment/${data.employmentId}/update`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const deleteEmployment = (data) => {
  return axiosInstance.delete(
    `freelancer/profile/employment/${data.employmentId}/delete`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};

export const fetchCategoriesWithJobCount = () =>
  axiosInstance.get('categories_tree', {params: {job_count: true}});

export const fetchRelatedProjects = (data) => {
  return axiosInstance.get(`freelancer/my_projects/completed`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const fetchSkills = (search, subCategoryIds) =>
  axiosInstance.get('data/skills', {
    params: {search: search, sub_category_ids: subCategoryIds},
  });
export const withdrawProposal = (data) => {
  return axiosInstance.post(
    `freelancer/proposals/${data?.proposalId}/withdrawal`,
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const fetchPredefinedSkills = (token) =>
  axiosInstance.get(`data/skills?type=top`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchInvitations = (data) => {
  return axiosInstance.get('freelancer/invitation', {
    params: {type: data.type, page: data.page, search: data.search},
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const declineInvitation = (data) => {
  return axiosInstance.post(
    `freelancer/invitation/${data.invitationId}/reject`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};

export const tokenDetails = (data) =>
  axiosInstance.get('freelancer/tokens/history', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      from_date: data.from_date,
      to_date: data.to_date,
    },
  });

export const fetchStatistics = (token) =>
  axiosInstance.get('freelancer/statics', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const acceptOffer = (data) =>
  axiosInstance.post(
    `freelancer/contracts/${data.contractId}/accept`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );

export const declineOffer = (data) => {
  return axiosInstance.post(
    `freelancer/contracts/${data.contractId}/reject`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};

export const getInvitationDetail = (data) =>
  axiosInstance.get(`freelancer/invitation/${data.id}/show`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const updateUserPassword = (data) => {
  return axiosInstance.post(`password/change`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const getBeneficiaryList = (data) =>
  axiosInstance.get(`freelancer/beneficiary/get`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const getDisputeList = (data) =>
  axiosInstance.get('freelancer/disputes', {
    params: {
      page: data.page,
    },
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const disputeFile = (data) =>
  axiosInstance.post(`freelancer/disputes/create`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const addBeneficiary = (data) => {
  return axiosInstance.post(`freelancer/beneficiary/create`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const updateBeneficiary = (data) => {
  return axiosInstance.post(
    `freelancer/beneficiary/${data.beneficiaryId}/update`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const makeBeneficiaryDefault = (data) =>
  axiosInstance.post(
    `freelancer/beneficiary/${data.beneficiaryId}/make_default`,
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
export const deleteBeneficiary = (data) =>
  axiosInstance.delete(
    `freelancer/beneficiary/${data.beneficiaryId}/delete
    `,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
export const requestMilestonePayment = (data) =>
  axiosInstance.post(
    `freelancer/contracts/${data?.contractId}/request_payment_for_milestone`,
    data?.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );

export const socialAuthApi = (data) => {
  console.log('ssss', data);
  return axiosInstance.get(`social/${data.authType}/get_user_from_token`, {
    params: {
      code: data?.code,
    },
  });
};

export const fetchReviews = (data) =>
  axiosInstance.get(
    `ratings/freelancer/${data?.id}`,

    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );

export const sendChatMessageNotification = (data) =>
  axiosInstance.post(`freelancer/send_notification`, data?.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const updateFirebaseId = (data) => {
  return axiosInstance.post(`freelancer/update_firebase_user_id`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token ?? ''}`,
    },
  });
};
