import {StyleSheet, Dimensions, I18nManager} from 'react-native';

const {width, height} = Dimensions.get('window');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width,
    height: height * 0.4,
    position: 'relative',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },

  createAccountText: {
    color: colors.appBlack,
    fontWeight: 'bold',
    fontSize: 21,
    textAlign: 'center',
    // marginVertical: 10,
    fontFamily: fonts.primarySB,
  },
  childContainer: {
    flex: 1,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.skyBlue,
    padding: 10,
    // backgroundColor:colors.defaultWhite,
    fontSize: 20,
    color: colors.appBlack,
    textAlign: 'center',
    marginHorizontal: 10,
    // marginVertical:25,
    marginBottom: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    // height: 30,
    // width: 30,
    // borderRadius: 15
  },
  textInputContainer: {
    alignItems: 'center',

    marginHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  enterOtpText: {
    color: colors.appGray,
    fontSize: 14,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    fontFamily: fonts.primarySB,
  },
  resendContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
  },
  resendText: {
    fontSize: 14,
    color: colors.appGreen1,
    textDecorationLine: 'underline',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
});

export default styles;
