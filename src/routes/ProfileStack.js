import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from 'src/pages/profile/Profile';
import Edit from 'src/pages/profile/view-profile/edit-personal-info/edit/Edit';
import ViewProfile from 'src/pages/profile/view-profile/ViewProfile';
import EditPersonalInfo from 'src/pages/profile/view-profile/edit-personal-info/EditPersonalInfo';
import EditSummary from 'src/pages/profile/view-profile/summary/edit-summary/EditSummary';
import AddPortfolio from 'src/pages/profile/view-profile/portfolio/add-portfolio/AddPortfolio';
import EditSkills from 'src/pages/profile/view-profile/skills/edit-skills/EditSkills';
import PortfolioList from 'src/pages/profile/view-profile/portfolio/portfoilo-list/PortfolioList';
import PortfolioDetails from 'src/pages/profile/view-profile/portfolio/portfolio-details/PortfolioDetails';
import EditPortfolio from 'src/pages/profile/view-profile/portfolio/edit-portfolio/EditPortfolio';
import Saved from 'src/pages/profile/saved/Saved';
import ChangeEmail from 'src/pages/profile/view-profile/edit-personal-info/change-email/ChangeEmail';
import OtpVerification from 'src/pages/profile/view-profile/edit-personal-info/change-email/otp-verification/OtpVerification';
import Settings from 'src/pages/profile/settings/Settings';
import PasswordSecurity from 'src/pages/profile/settings/password-security/PasswordSecurity';
import MembersPermissions from 'src/pages/profile/settings/members-permissions/MembersPermissions';
import TaxInformation from 'src/pages/profile/settings/tax-information/TaxInformation';
import PrivacyPolicy from 'src/pages/profile/settings/privacy-policy/PrivacyPolicy';
import TermsOfService from 'src/pages/profile/settings/terms-of-service/TermsOfService';
import Accessibility from 'src/pages/profile/settings/accessibility/Accessibility';
import NotificationSettings from 'src/pages/profile/settings/notification-settings/NotificationSettings';
import Location from 'src/pages/profile/view-profile/edit-personal-info/location/Location';
import AddEducation from 'src/pages/profile/view-profile/education/add-education/AddEducation';
import EditEducation from 'src/pages/profile/view-profile/education/edit-education/EditEducation';
import AddEmployment from 'src/pages/profile/view-profile/employment/add-employment/AddEmployment';
import EditEmployment from 'src/pages/profile/view-profile/employment/edit-employment/EditEmployment';
import ShowSecurityQuestion from 'src/pages/profile/settings/password-security/show-security-question/ShowSecurityQuestion';
import SecurityQuestion from 'src/pages/profile/settings/password-security/sequrity-question/SecurityQuestion';
import SelectCountry from 'src/pages/profile/view-profile/edit-personal-info/location/select-country/SelectCountry';
import SelectEmploymentCountry from 'src/pages/profile/view-profile/employment/select-employment-country/SelectEmploymentCountry';
import RelatedProject from 'src/pages/profile/view-profile/portfolio/add-portfolio/select-related-project/RelatedProject';
import AddSkills from 'src/pages/profile/view-profile/skills/add-skills/AddSkills';
import AddExpertise from 'src/pages/profile/view-profile/expertise/add-expertise/AddExpertise';
import SelectCategory from 'src/pages/profile/view-profile/expertise/add-expertise/select-category/SelectCategory';
import SelectSubCategory from 'src/pages/profile/view-profile/expertise/add-expertise/select-sub-category/SelectSubCategory';
import TokenHistory from 'src/pages/profile/token-history/TokenHistory';
import UpdatePassword from 'src/pages/profile/set-new-password/UpdatePassword';
import ProposalDetails from 'src/pages/proposals/proposal-details/ProposalDetails';
import PaymentSetting from 'src/pages/profile/settings/payment-setting/PaymentSetting';
import DisputeFile from 'src/pages/profile/dispute-file/DisputeFile';
import MyDispute from 'src/pages/profile/my-dispute/MyDispute';
import MyContracts from 'src/pages/profile/my-contracts/MyContracts';

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
function ProfileStack() {
  return (
    <Stack.Navigator
     
      screenOptions={{
        ...horizontalAnimation,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPersonalInfo"
        component={EditPersonalInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditSummary"
        component={EditSummary}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPortfolio"
        component={AddPortfolio}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditSkills"
        component={EditSkills}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PortfolioList"
        component={PortfolioList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PortfolioDetails"
        component={PortfolioDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPortfolio"
        component={EditPortfolio}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Saved"
        component={Saved}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpVerification"
        component={OtpVerification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        options={{headerShown: false}}
        component={Settings}
      />
      <Stack.Screen
        name="PasswordSecurity"
        options={{headerShown: false}}
        component={PasswordSecurity}
      />
      <Stack.Screen
        name="MembersPermissions"
        options={{headerShown: false}}
        component={MembersPermissions}
      />
      <Stack.Screen
        name="TaxInformation"
        options={{headerShown: false}}
        component={TaxInformation}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        options={{headerShown: false}}
        component={PrivacyPolicy}
      />
      <Stack.Screen
        name="TermsOfService"
        options={{headerShown: false}}
        component={TermsOfService}
      />
      <Stack.Screen
        name="Accessibility"
        options={{headerShown: false}}
        component={Accessibility}
      />
      <Stack.Screen
        name="NotificationSettings"
        options={{headerShown: false}}
        component={NotificationSettings}
      />
      <Stack.Screen
        name="Location"
        options={{headerShown: false}}
        component={Location}
      />
      <Stack.Screen
        name="AddEducation"
        options={{headerShown: false}}
        component={AddEducation}
      />
      <Stack.Screen
        name="EditEducation"
        options={{headerShown: false}}
        component={EditEducation}
      />
      <Stack.Screen
        name="AddEmployment"
        options={{headerShown: false}}
        component={AddEmployment}
      />
      <Stack.Screen
        name="EditEmployment"
        options={{headerShown: false}}
        component={EditEmployment}
      />
      <Stack.Screen
        name="ShowSecurityQuestion"
        options={{headerShown: false}}
        component={ShowSecurityQuestion}
      />
      <Stack.Screen
        name="SecurityQuestion"
        options={{headerShown: false}}
        component={SecurityQuestion}
      />
      <Stack.Screen
        name="SelectCountry"
        options={{headerShown: false}}
        component={SelectCountry}
      />
      <Stack.Screen
        name="SelectEmploymentCountry"
        options={{headerShown: false}}
        component={SelectEmploymentCountry}
      />
      <Stack.Screen
        name="RelatedProject"
        options={{headerShown: false}}
        component={RelatedProject}
      />
      <Stack.Screen
        name="AddSkills"
        options={{headerShown: false}}
        component={AddSkills}
      />
      <Stack.Screen
        name="AddExpertise"
        options={{headerShown: false}}
        component={AddExpertise}
      />
      <Stack.Screen
        name="SelectCategory"
        options={{headerShown: false}}
        component={SelectCategory}
      />
      <Stack.Screen
        name="SelectSubCategory"
        options={{headerShown: false}}
        component={SelectSubCategory}
      />
      <Stack.Screen
        name="TokenHistory"
        options={{headerShown: false}}
        component={TokenHistory}
      />
      <Stack.Screen
        name="UpdatePassword"
        options={{headerShown: false}}
        component={UpdatePassword}
      />
      <Stack.Screen
        name="ProposalDetail"
        component={ProposalDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentSetting"
        component={PaymentSetting}
        options={{headerShown: false}}
      />
       <Stack.Screen name="DisputeFile" component={DisputeFile} 
        options={{headerShown: false}}
       
       />
      <Stack.Screen name="MyDispute" component={MyDispute} 
        options={{headerShown: false}}
      
      />
      <Stack.Screen name="MyContracts" component={MyContracts} 
        options={{headerShown: false}}
      
      />

    </Stack.Navigator>
  );
}

export default ProfileStack;
