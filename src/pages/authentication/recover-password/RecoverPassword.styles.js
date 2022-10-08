import {StyleSheet, Dimensions} from 'react-native';
const {height} = Dimensions.get('window');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
  },
  upperHalf: {
    backgroundColor: colors.appYellow,
    height: height * 0.55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupImage: {
    height: 250,
    width: 250,
  },
  receiveText: {
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
  label: {
    color: colors.appGray,
    fontSize: 12,
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
  },
  welcomeText: {
    color: colors.appBlack,

    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    fontFamily: fonts.primarySB,
  },
  signUpButton: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  signUpButtonText: {
    color: colors.defaultWhite,
    fontSize: 18,

    textAlign: 'center',
    fontFamily: fonts.secondarySB,
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
});

export default styles;
