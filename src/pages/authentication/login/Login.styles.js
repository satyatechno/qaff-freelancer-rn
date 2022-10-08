import {StyleSheet, Dimensions, I18nManager, Platform} from 'react-native';

import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
  },
  upperHalf: {
    backgroundColor: colors.appYellow,
    height: height * 0.32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginImage: {
    height: 150,
    width: 150,
  },
  searchText: {
    color: colors.defaultWhite,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'center',
    width: '65%',
    marginTop: -20,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
    bottom: -35,
  },
  logIn: {
    color: colors.appBlack,

    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10,
    fontFamily: fonts.primarySB,
  },
  label: {
    color: colors.appGray,
    fontSize: 14,
    marginStart: 20,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  input: {
    marginHorizontal: 20,

    fontSize: 14,
    fontFamily: fonts.primary,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  passwordContainer: {
    marginHorizontal: 20,
  },

  passwordInput: {
    fontFamily: fonts.primary,
  },
  forgotPassword: {
    color: colors.appGray,
    fontSize: 14,
    textAlign: 'right',
    marginTop: 5,
    marginEnd: 30,
    marginBottom: 25,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    fontFamily: fonts.primary,
  },
  loginButton: {
    marginHorizontal: 20,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
  socialNetworkText: {
    color: colors.appBlack,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: fonts.primary,
  },
  socialIcon: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  socialIconAlign: {
    marginHorizontal: 20,
    height: 30,
    width: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  footerLogoContainer: {
    borderColor: colors.appGray1,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: colors.defaultWhite,

    height: 50,
    width: 50,
    marginHorizontal: 10,

    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  noAccountText: {
    fontSize: 14,
    color: colors.appGray,
    textAlign: 'center',
    fontFamily: fonts.primary,
  },
  signUpText: {
    fontSize: 14,
    marginStart: 5,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    fontFamily: fonts.primary,
    color: colors.appViolet,
  },
  passwardContainer: {
    borderColor: colors.skyBlue,
    borderWidth: 1.5,
    borderRadius: 10,
    padding: Platform.OS === 'android' ? 0 : 0,
    marginHorizontal: 20,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  passwardInput: {
    fontSize: 16,
    color: colors.appBlack,
    flex: 1,
    // paddingBottom: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingStart: 10,
  },
  icon: {
    color: colors.appGray,
  },
});

export default styles;
