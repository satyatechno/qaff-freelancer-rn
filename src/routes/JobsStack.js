import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Filter from 'src/pages/jobs/filters/Filter';
import ShowSubCategories from 'src/pages/jobs/filters/show-subcategories/ShowSubCategories';
import Jobs from 'src/pages/jobs/Jobs';
import MySuggestion from 'src/pages/jobs/my-suggestion/MySuggestion';
import ProjectDetails from 'src/pages/jobs/project-details/ProjectDetails';
import ProposalSent from 'src/pages/jobs/proposal-sent/ProposalSent';
// import ProposalDetails from 'src/pages/proposals/proposal-details/ProposalDetails';

const Stack = createStackNavigator();

const horizontalAnimation = {
  // gestureDirection: 'horizontal',
  // gestureEnabled: true,
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
const Job = () => (
  <Stack.Navigator screenOptions={horizontalAnimation} headerMode="none">
    <Stack.Screen name="Jobs" component={Jobs} />
    <Stack.Screen name="Filter" component={Filter} />
    <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
    <Stack.Screen name="MySuggestion" component={MySuggestion} />
    <Stack.Screen name="ProposalSent" component={ProposalSent} />
    <Stack.Screen name="ShowSubCategories" component={ShowSubCategories} />
    {/* <Stack.Screen name="ProposalDetails" component={ProposalDetails} /> */}
  </Stack.Navigator>
);

export default Job;
