import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GettingStarted from 'src/pages/authentication/after-signup/getting-started/GettingStarted';
import Expertise from 'src/pages/authentication/after-signup/expertise/Expertise';
import Education from 'src/pages/authentication/after-signup/education/Education';
import Employment from 'src/pages/authentication/after-signup/employment/Employment';
import Title from 'src/pages/authentication/after-signup/title-overview/Title';
import SetupProfile from 'src/pages/authentication/after-signup/setup-profile/SetupProfile';
import Location from 'src/pages/authentication/after-signup/location/Location';
import PhoneNo from 'src/pages/authentication/after-signup/phoneNo/PhoneNo';
import SelectCategory from 'src/pages/authentication/after-signup/select-category/SelectCategory';
import SelectSubCategory from 'src/pages/authentication/after-signup/select-sub-category/SelectSubCategory';
import AddEducation from 'src/pages/authentication/after-signup/education/add-education/AddEducation';
import AddEmployment from 'src/pages/authentication/after-signup/employment/add-employment/AddEmployment';
import SelectEmploymentCountry from 'src/pages/authentication/after-signup/employment/select-employment-country/SelectEmploymentCountry';
import SelectCountry from 'src/pages/authentication/after-signup/location/select-country/SelectCountry';
import OtpVerification from 'src/pages/authentication/after-signup/phoneNo/otp-verification/OtpVerification';
import SetupComplete from 'src/pages/authentication/after-signup/setup-complete/SetupComplete';
import Skills from 'src/pages/authentication/after-signup/skills/Skills';
import AddSkills from 'src/pages/authentication/after-signup/skills/add-skills/AddSkills';
import EditSkills from 'src/pages/authentication/after-signup/skills/edit-skills/EditSkills';

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
function AfterSignup() {
  return (
    <Stack.Navigator screenOptions={horizontalAnimation} headerMode="none" >
      <Stack.Screen name="GettingStarted" component={GettingStarted} />
      <Stack.Screen name="Expertise" component={Expertise} />
      <Stack.Screen name="SelectCategory" component={SelectCategory} />
      <Stack.Screen name="SelectSubCategory" component={SelectSubCategory} />
      <Stack.Screen name="Education" component={Education} />
      <Stack.Screen name="Employment" component={Employment} />
      <Stack.Screen name="Title" component={Title} />
      <Stack.Screen name="SetupProfile" component={SetupProfile} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="PhoneNo" component={PhoneNo} />
      <Stack.Screen name="AddEducation" component={AddEducation} />
      <Stack.Screen name="AddEmployment" component={AddEmployment} />
      <Stack.Screen
        name="SelectEmploymentCountry"
        component={SelectEmploymentCountry}
      />
      <Stack.Screen name="SelectCountry" component={SelectCountry} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="SetupComplete" component={SetupComplete} />
      <Stack.Screen name="Skills" component={Skills} />
      <Stack.Screen name="AddSkills" component={AddSkills} />
      <Stack.Screen name="EditSkills" component={EditSkills} />
    </Stack.Navigator>
  );
}

export default AfterSignup;
