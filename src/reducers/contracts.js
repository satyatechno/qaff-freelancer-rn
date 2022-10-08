const contractsReducer = (state, action) => {
  if (!state) {
    return {
      activeContracts: [],
      closedContracts: [],
      disputedContracts: [],
      has_more_contracts_page: false,
      contractDetails: undefined,
      isContractLoading: false,
      contractDetailsLoading: false,
    };
  }

  switch (action.type) {
    case 'ACTIVE_CONTRACTS':
      return {
        ...state,
        activeContracts: action.contracts,
        has_more_contracts_page: action.has_more_contracts,
      };
    case 'CLOSED_CONTRACTS':
      return {
        ...state,
        closedContracts: action.contracts,
        has_more_contracts_page: action.has_more_contracts,
      };
    case 'DISPUTED_CONTRACTS':
      return {
        ...state,
        disputedContracts: action.contracts,
        has_more_contracts_page: action.has_more_contracts,
      };
    case 'CONTRACT_DETAILS':
      return {
        ...state,
        contractDetails: action.contract,
      };
    case 'IS_CONTRACT_LOADING':
      return {
        ...state,
        isContractLoading: action.data,
      };
    case 'CONTRACT_DETAILS_LOADING':
      return {
        ...state,
        contractDetailsLoading: action.data,
      };
    default:
      return state;
  }
};

export default contractsReducer;
