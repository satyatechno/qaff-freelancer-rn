import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AddPaymentDetails from 'src/components/add-payment-details/AddPaymentDetails';
import FileViewer from 'src/components/file-viewer/FileViewer';
import ImageViewer from 'src/components/image-viewer/ImageViewer';
import LinkedinWebView from 'src/components/linkedin-web-view/LinkedinWebView';
import NotificationComponent from 'src/components/notification-component/NotificationComponent';
import SettingsWebView from 'src/components/settings-webview/SettingsWebView';
import {ContractRoom} from 'src/pages/contracts/contract-room/ContractRoom';
import Chat from 'src/pages/messages/chat/Chat';
import FirebaseChat from 'src/pages/messages/firebase-chat/FirebaseChat';
import InvitationDetails from 'src/pages/proposals/invitation-details/InvitationDetails';
import ProjectDtails from 'src/pages/proposals/project-details/ProjectDetails';
import ProposalDetails from 'src/pages/proposals/proposal-details/ProposalDetails';
import ViewOffer from 'src/pages/proposals/view-offer/ViewOffer';
import Authentication from 'src/routes/AuthenticationStack';
import Tabs from 'src/routes/Tabs';
import colors from 'src/styles/texts/colors';
import AfterSignup from './AfterSignupStack';

const RootStack = createStackNavigator();
const horizontalAnimation = {
  // gestureDirection: '',
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
      headerShown: false,
    };
  },
};
const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Authentication" component={Authentication} />
      <RootStack.Screen name="Tabs" component={Tabs} />
      <RootStack.Screen
        name="Chat"
        component={Chat}
        options={horizontalAnimation}
      />
      <RootStack.Screen
        name="FirebaseChat"
        component={FirebaseChat}
        options={horizontalAnimation}
      />
      <RootStack.Screen name="ProjectDtails" component={ProjectDtails} />
      <RootStack.Screen name="ViewOffer" component={ViewOffer} />
      <RootStack.Screen
        name="NotificationComponent"
        component={NotificationComponent}
        options={horizontalAnimation}
      />
      <RootStack.Screen name="AfterSignUp" component={AfterSignup} />
      <RootStack.Screen name="ContractRoom" component={ContractRoom} />
      <RootStack.Screen name="ProposalDetails" component={ProposalDetails} />
      <RootStack.Screen
        name="SettingsWebView"
        component={SettingsWebView}
        options={{headerShown: true, headerTitle: '', headerBackTitle: 'Back'}}
      />
      <RootStack.Screen
        name="AddPaymentDetails"
        component={AddPaymentDetails}
      />
      <RootStack.Screen
        name="InvitationDetails"
        component={InvitationDetails}
      />
      <RootStack.Screen
        name="ImageViewer"
        component={ImageViewer}
        options={
          (horizontalAnimation,
          {
            headerShown: true,
            headerTransparent: true,
            headerTintColor: colors.defaultWhite,
            headerTitle: '',
            headerBackTitle: 'Back',
          })
        }
      />
      <RootStack.Screen
        name="FileViewer"
        component={FileViewer}
        options={
          (horizontalAnimation,
          {
            headerShown: true,
            headerTintColor: colors.defaultBlack,
            headerTitle: '',
            headerStyle: {elevation: 10},
          })
        }
      />

      <RootStack.Screen
        name="LinkedinWebView"
        component={LinkedinWebView}
        options={
          (horizontalAnimation,
          {
            headerShown: true,
            // headerTransparent: true,
            // headerTintColor: colors.defaultWhite,
            headerTitle: '',
            headerBackTitle: 'Back',
          })
        }
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
