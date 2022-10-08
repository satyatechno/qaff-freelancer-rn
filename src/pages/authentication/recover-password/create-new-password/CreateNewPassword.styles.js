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
  passwordText: {
    fontSize: 14,
    color: colors.appGray,
    marginBottom: 5,
    marginTop: 10,
    marginStart: 20,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  input: {
    marginHorizontal: 20,
  },
  inputStyle: {
    fontSize: 16,
    color: colors.appBlack,
  },
  createAccountButton: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  createAccountButtonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
});

export default styles;
