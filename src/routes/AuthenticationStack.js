import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Introduction from 'src/pages/authentication/introduction/Introduction';
import Welcome from 'src/pages/authentication/welcome/Welcome';
import Login from 'src/pages/authentication/login/Login';
import colors from 'src/styles/texts/colors';
import Signup from 'src/pages/authentication/signup/Signup';
import CreateAccount from 'src/pages/authentication/create-account/CreateAccount';
import OtpVerification from 'src/pages/authentication/create-account/otp-verification/OtpVerification';
import CreatePassword from 'src/pages/authentication/create-account/create-password/CreatePassword';
import RecoverPassword from 'src/pages/authentication/recover-password/RecoverPassword';
import RecoverOtpVerification from 'src/pages/authentication/recover-password/recover-otp-verification/RecoverOtpVerification';
import CreateNewPassword from 'src/pages/authentication/recover-password/create-new-password/CreateNewPassword';
import Splash from 'src/pages/authentication/splash/Splash';
import SocialSignup from 'src/pages/authentication/social-login-signup/SocialSignup';
import CreateProfile from 'src/pages/authentication/create-profile/CreateProfile';
import TwoStepWithOtp from 'src/pages/authentication/login/two-step-verification/otp-verification/TwoStepWithOtp';
import SecurityQuestion from 'src/pages/authentication/login/two-step-verification/security-question/SecurityQuestion';

const Auth = createStackNavigator();
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
function Authentication() {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <Auth.Navigator
        initialRouteName="Splash"
        screenOptions={{
          ...horizontalAnimation,
          headerBackTitleVisible: false,
        }}>
        <Auth.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="Introduction"
          component={Introduction}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: colors.defaultWhite,
          }}
        />
        <Auth.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: '',
            // headerStyle: {backgroundColor: colors.appYellow, elevation: 0},
            headerTransparent: true,
            headerTintColor: colors.defaultWhite,
          }}
        />
        <Auth.Screen
          name="Signup"
          component={Signup}
          options={{
            headerTitle: '',
            headerTransparent: true,

            headerTintColor: colors.defaultWhite,
          }}
        />
        <Auth.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{
            headerTitle: '',
            headerTransparent: true,

            headerTintColor: colors.defaultWhite,
          }}
        />
        <Auth.Screen
          name="OtpVerification"
          component={OtpVerification}
          options={{
            headerTitle: '',
            headerTransparent: true,

            headerTintColor: colors.defaultWhite,
          }}
        />
        <Auth.Screen
          name="CreatePassword"
          component={CreatePassword}
          options={{
            headerTitle: '',
            headerTransparent: true,

            headerTintColor: colors.defaultWhite,
          }}
        />
        <Auth.Screen
          name="RecoverPassword"
          component={RecoverPassword}
          options={{
            headerTitle: '',
            headerTransparent: true,

            headerTintColor: colors.defaultWhite,
          }}
        />
        <Auth.Screen
          name="RecoverOtpVerification"
          component={RecoverOtpVerification}
          options={{
            headerTitle: '',
            headerTransparent: true,

            headerTintColor: colors.defaultWhite,
          }}
        />
        <Auth.Screen
          name="CreateNewPassword"
          component={CreateNewPassword}
          options={{
            headerTitle: '',
            headerTransparent: true,

            headerTintColor: colors.defaultWhite,
          }}
        />
        <Auth.Screen
          name="SocialSignup"
          component={SocialSignup}
          options={{
            headerTitle: '',
            headerTransparent: true,

            headerTintColor: colors.defaultWhite,
          }}
        />
        <Auth.Screen
          name="CreateProfile"
          component={CreateProfile}
          options={{
            headerTitle: '',
            headerTransparent: true,

            headerTintColor: colors.defaultWhite,
          }}
        />
        <Auth.Screen
          name="TwoStepWithOtp"
          component={TwoStepWithOtp}
          options={{
            headerTitle: '',
            headerTransparent: true,

            headerTintColor: colors.defaultWhite,
          }}
        />
        <Auth.Screen
          name="SecurityQuestion"
          component={SecurityQuestion}
          options={{
            headerTitle: '',
            headerTransparent: true,

            headerTintColor: colors.defaultWhite,
          }}
        />
      </Auth.Navigator>
    </>
  );
}

export default Authentication;
