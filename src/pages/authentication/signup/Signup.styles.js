import {StyleSheet, Dimensions} from 'react-native';
const {height} = Dimensions.get('window');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
  },
  upperHalf: {
    backgroundColor: colors.appGreen,
    height: height * 0.55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupImage: {
    height: 250,
    width: 250,
    // resizeMode: 'contain',
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
    marginVertical: 20,
    fontFamily: fonts.primary,
  },
  socialIcon: {
    flexDirection: 'row',
    alignSelf: 'center',
    //     marginTop: 10,
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
  footerTopText: {
    color: colors.appGray,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
    fontFamily: fonts.primary,
  },
  footerBottomText: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.primary,
    fontWeight: '300',
    fontSize: 13,
    color: colors.appGray,
  },
});

export default styles;
