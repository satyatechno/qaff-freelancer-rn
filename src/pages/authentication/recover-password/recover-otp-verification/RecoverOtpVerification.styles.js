import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
  },
  upperHalf: {
    backgroundColor: colors.appYellow,
    height: height * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountImage: {
    height: 150,
    width: 150,
  },
  becomeText: {
    color: colors.defaultWhite,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'center',
    width: '65%',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    bottom: -40,
  },
  createAccountText: {
    color: colors.appBlack,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.primarySB,
    marginTop: 50,
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    marginStart: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.skyBlue,
    fontSize: 18,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    width: 20,
    paddingBottom: 0,
    marginEnd: 20,
  },
  enterOtpText: {
    color: colors.appGray,
    fontSize: 14,
    marginTop: 30,
    marginStart: 20,
    marginBottom: 10,

    fontFamily: fonts.primarySB,
  },
  resend: {
    // fontFamily: fonts.primarySB,
    color: colors.appGreen,

    marginStart: 20,
    textDecorationLine: 'underline',
  },
  verifyButton: {
    marginTop: 30,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyText: {
    color: colors.defaultWhite,
    fontSize: 16,
    fontFamily: fonts.secondarySB,
  },
});
export default styles;
