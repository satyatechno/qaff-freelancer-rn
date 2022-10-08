import {StyleSheet, Dimensions, I18nManager, Platform} from 'react-native';

const {width, height} = Dimensions.get('screen');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: height * 0.3,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  logIn: {
    color: colors.appBlack,
    fontWeight: 'bold',
    fontSize: 21,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: fonts.primarySB,
  },
  queText: {
    color: colors.appBlack,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    marginTop: 10,
    fontFamily: fonts.primarySB,
    marginStart: 20,
  },
  label: {
    color: colors.appGray,
    fontSize: 16,
    marginStart: 20,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  input: {
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    marginHorizontal: 20,
    fontSize: 16,
    paddingStart: 10,
    paddingBottom: 5,
    color: colors.appBlack,
    fontFamily: fonts.secondary,
    fontWeight: '200',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  forgotPassword: {
    color: colors.appGray,
    fontSize: 14,
    textAlign: 'right',
    marginTop: 7,
    marginEnd: 20,
    marginBottom: 15,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    fontFamily: fonts.primary,
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
  footer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
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
  passwardContainer: {
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    padding: Platform.OS === 'android' ? 1 : 13,
    marginHorizontal: 20,
    flexDirection: 'row',
    height: 40,
  },
  passwardInput: {
    fontSize: 16,
    color: colors.appBlack,
    flex: 1,
    // paddingBottom: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
});

export default styles;
