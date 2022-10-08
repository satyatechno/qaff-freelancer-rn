const jobsReducer = (state, action) => {
  if (!state) {
    return {
      newsfeed: [],
      has_more_newsfeed_page: false,
      projectDetails: undefined,
      currentFilters: [
        {
          sort: 'newest',
          bdRange: undefined,
          timeline: undefined,
          proposal_count: undefined,
          category: undefined,
          filterCount: 0,
          categoryId: undefined,
        },
      ],
      isProjectLoading: false,
      newsfeedLoading: false,
    };
  }

  switch (action.type) {
    case 'NEWSFEED_RECEIVED':
      return {
        ...state,
        newsfeed: action.newsfeed,
        has_more_newsfeed_page: action.has_more_newsfeed,
      };
    case 'FETCH_MORE_NEWSFEED':
      return {
        ...state,
      };

    case 'PROJECT_DETAILS':
      return {
        ...state,
        projectDetails: action.projectDetails,
      };

    case 'CURRENT_FILTERS':
      console.log('action', action.data[0]);
      let currentFilter = [...state.currentFilters];

      console.log('prevcurr', JSON.stringify(currentFilter[0], null, 2));
      if (action.data[0]?.sort !== undefined) {
        currentFilter = [
          {
            ...currentFilter[0],
            sort: action.data[0]?.sort,
          },
        ];
        // currentFilter[0].sort = action.data[0]?.sort;
        // filter_count++;
        // :  (  currentFilter[0]?.sort === 'newest'||action.data[0]?.sort === 'newest' )&&  currentFilter[0].filterCount!==0 ? currentFilter[0].filterCount-1
        // : (  currentFilter[0]?.sort !== 'newest'||action.data[0]?.sort !== 'newest' )&&  currentFilter[0].filterCount!==0
      }
      if (action.data[0]?.sort == undefined) {
        currentFilter = [
          {
            ...currentFilter[0],
            sort: currentFilter[0]?.sort,
          },
        ];
        // currentFilter[0].sort = 'newest';
      }
      // currentFilter[0].sort = action.data[0].sort;
      // filter_count++;
      if (action.data[0]?.bdRange !== undefined) {
        currentFilter = [
          {
            ...currentFilter[0],
            bdRange: action.data[0]?.bdRange,
          },
        ];
        // currentFilter[0].bdRange = action.data[0]?.bdRange;
        // filter_count++;
      }
      if (action.data[0]?.bdRange === undefined) {
        currentFilter = [
          {
            ...currentFilter[0],
            bdRange: currentFilter[0]?.bdRange,
          },
        ];
        // currentFilter[0].bdRange = undefined;
      }
      if (action.data[0]?.timeline !== undefined) {
        currentFilter = [
          {
            ...currentFilter[0],
            timeline: action.data[0]?.timeline,
          },
        ];
        // console.log('pabc', JSON.stringify(currentFilter, null, 2));

        // currentFilter[0].timeline = action.data[0]?.timeline;
        // filter_count++;
      }
      if (action.data[0]?.timeline === undefined) {
        currentFilter = [
          {
            ...currentFilter[0],
            timeline: currentFilter[0]?.timeline,
          },
        ];
        // currentFilter[0].timeline = undefined;
      }
      if (action.data[0]?.proposal_count !== undefined) {
        currentFilter = [
          {
            ...currentFilter[0],
            proposal_count: action.data[0]?.proposal_count,
          },
        ];
        // currentFilter[0].proposal_count = action.data[0]?.proposal_count;
        // filter_count++;
      }
      if (action.data[0]?.proposal_count === undefined) {
        currentFilter = [
          {
            ...currentFilter[0],
            proposal_count: currentFilter[0]?.proposal_count,
          },
        ];
        // currentFilter[0].proposal_count = undefined;
      }
      if (action.data[0]?.category !== undefined) {
        currentFilter = [
          {
            ...currentFilter[0],
            category: action.data[0]?.category,
          },
        ];

        // currentFilter[0].category = action.data[0]?.category;
        // filter_count++;
      }
      if (action.data[0]?.category === undefined) {
        currentFilter = [
          {
            ...currentFilter[0],
            category: currentFilter[0]?.category,
          },
        ];

        // currentFilter[0].category = undefined;
      }
      if (action.data[0]?.categoryId !== undefined) {
        currentFilter = [
          {
            ...currentFilter[0],
            categoryId: action.data[0]?.categoryId,
          },
        ];

        // currentFilter[0].categoryId = action.data[0]?.categoryId;
        // filter_count++;
      }
      if (action.data[0]?.categoryId === undefined) {
        currentFilter = [
          {
            ...currentFilter[0],
            categoryId: currentFilter[0]?.categoryId,
          },
        ];

        // currentFilter[0].categoryId = undefined;
      }

      var finalFilter = currentFilter.map((filter) => {
        var finalCount = 0;
        if (filter.sort !== 'newest') {
          //  [
          //   {
          //     ...currentFilter[0],

          //     filterCount: 1,
          //   },
          // ];
          finalCount += 1;
        }
        if (filter.bdRange !== undefined) {
          finalCount += 1;
        }
        if (
          filter.proposal_count !== undefined &&
          filter.proposal_count?.findIndex((x) => x === 0) === -1
        ) {
          finalCount += 1;
          console.log(
            'in pc',
            filter.proposal_count?.findIndex((x) => x === 0) === -1,
          );
        }
        if (filter.timeline !== undefined) {
          finalCount += 1;
        }
        if (filter.category !== undefined) {
          finalCount += 1;
        }
        return finalCount;
      });
      // currentFilter = [
      //   {
      //     ...currentFilter[0],

      //     filterCount: filterNo,
      //   },
      // ];

      // if (action?.data[0]?.filterCount == 0) {

      //   currentFilter[0].filterCount = undefined;
      // }
      // if (action?.data[0]?.filterCount !== 0) {
      //   currentFilter[0].filterCount = filter_count;
      // }
      // currentFilter[0].filterCount =
      //   action?.data[0]?.filterCount == 0 ? undefined : filter_count;
      console.log('curr', JSON.stringify(finalFilter, null, 2));
      currentFilter = [{...currentFilter[0], filterCount: finalFilter[0]}];

      return {
        ...state,
        currentFilters: [{...currentFilter[0]}],
      };

    case 'CLEAR_FILTERS':
      let temp = [
        {
          sort: 'newest',
          bdRange: undefined,
          timeline: undefined,
          proposal_count: undefined,
          category: undefined,
          filterCount: 0,
        },
      ];
      return {
        ...state,
        currentFilters: [...temp],
      };
    case 'IS_PROJECT_LOADING':
      console.log('sddd', action.data);
      return {
        ...state,
        isProjectLoading: action.data,
      };
    case 'NEWSFEED_LOADING':
      return {
        ...state,
        newsfeedLoading: action.data,
      };
    default:
      return state;
  }
};

export default jobsReducer;
