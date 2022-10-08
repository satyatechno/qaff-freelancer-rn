import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  label: {
    color: colors.appGray,
    fontSize: 14,
    marginStart: 10,

    marginBottom: 10,
    // marginTop: 20,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  headng: {
    color: colors.appBlack,
    fontSize: 16,

    margin: 10,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
    // textAlign: 'center',
  },

  phoneInput: {
    fontSize: 16,

    flex: 1,
    marginTop: 5,

    paddingLeft: 10,
    fontFamily: fonts.secondary,
    fontWeight: '200',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },

  phoneContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'relative',
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    // padding: 2,
    marginHorizontal: 10,
  },
  countryPicker: {
    alignSelf: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.appGray,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
  submitButton: {
    marginHorizontal: 10,
    backgroundColor: colors.appGreen,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    // minWidth: '45%',
  },
  submitText: {
    color: colors.defaultWhite,
  },
});
export default styles;
