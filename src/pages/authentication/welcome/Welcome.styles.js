import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('screen');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
  },

  upperHalf: {
    backgroundColor: colors.appViolet,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.55,
  },
  welcomeImage: {
    height: 250,
    width: 250,
  },
  applyText: {
    color: colors.defaultWhite,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'center',
    width: '60%',
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    bottom: -40,
  },
  welcomeText: {
    fontSize: 20,
    marginTop: 50,
    textAlign: 'center',
    fontFamily: fonts.primarySB,
  },
  signUpButton: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  signUpButtonText: {
    color: colors.defaultWhite,
    fontSize: 18,

    textAlign: 'center',
    fontFamily: fonts.secondarySB,
  },
  orText: {
    textAlign: 'center',
    color: colors.appBlack,
    fontSize: 16,
    marginVertical: 10,
    fontFamily: fonts.secondary,
    fontWeight: '300',
  },
  logInButton: {
    marginHorizontal: 20,
  },
  logInButtonText: {
    color: colors.appViolet,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.secondarySB,
  },
});

export default styles;
