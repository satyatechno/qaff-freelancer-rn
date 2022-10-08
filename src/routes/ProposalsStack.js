import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Proposals from 'src/pages/proposals/Proposals';
import ProposalDetails from 'src/pages/proposals/proposal-details/ProposalDetails';

import ProposalLists from 'src/pages/proposals/proposal-lists/ProposalLists';
import ChangeTerms from 'src/pages/proposals/change-terms/ChangeTerms';
import InvitationDetails from 'src/pages/proposals/invitation-details/InvitationDetails';
import DeclineInvitation from 'src/pages/proposals/decline-invitation/DeclineInvitation';
import OfferDetails from 'src/pages/proposals/offer-details/OfferDetails';
import AcceptOffer from 'src/pages/proposals/accept-offer/AcceptOffer';
import DeclineOffer from 'src/pages/proposals/decline-offer/DeclineOffer';
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
const Proposal = () => (
  <Stack.Navigator screenOptions={{...horizontalAnimation, headerShown: false}}>
    <Stack.Screen name="Proposals" component={Proposals} />
    <Stack.Screen name="ProposalDetails" component={ProposalDetails} />
    <Stack.Screen name="ProposalLists" component={ProposalLists} />
    <Stack.Screen name="ChangeTerms" component={ChangeTerms} />
    <Stack.Screen name="InvitationDetails" component={InvitationDetails} />
    <Stack.Screen name="DeclineInvitation" component={DeclineInvitation} />
    <Stack.Screen name="OfferDetails" component={OfferDetails} />
    <Stack.Screen name="AcceptOffer" component={AcceptOffer} />
    <Stack.Screen name="DeclineOffer" component={DeclineOffer} />
  </Stack.Navigator>
);

export default Proposal;
