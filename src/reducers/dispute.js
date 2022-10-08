const disputeReducer = (state, action) => {
    if (!state) {
        return {
            myDisputes: [],
            has_more_disputes_page: false,

        };
    }

    switch (action.type) {
        case 'MY_DISPUTE':
            return {
                ...state,
                myDisputes: action.disputes,
                has_more_disputes_page: action.has_more_disputes,
            };




        default:
            return state;
    }
};

export default disputeReducer;
