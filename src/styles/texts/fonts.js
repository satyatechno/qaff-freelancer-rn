import {I18nManager} from 'react-native';

export default {
  primary: !I18nManager.isRTL ? 'Raleway-Regular' : 'elmessiri-regular',
  primarySB: !I18nManager.isRTL ? 'Raleway-SemiBold' : 'elmessiri-semibold',
  secondary: !I18nManager.isRTL ? 'Poppins-Regular' : 'elmessiri-regular',
  secondarySB: !I18nManager.isRTL ? 'Poppins-SemiBold' : 'elmessiri-semibold',
};
