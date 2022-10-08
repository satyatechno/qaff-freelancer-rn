import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
    // justifyContent: 'space-between',
  },
  input: {
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    // paddingBottom: 7,
    marginHorizontal: 20,
    fontSize: 16,
    color: colors.appBlack,
    fontFamily: fonts.secondary,
    fontWeight: '200',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingStart: 10
  },

  label: {
    color: colors.appGray,
    fontSize: 14,
    marginStart: 20,

    marginBottom: 10,
    marginTop: 20,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  headng: {
    color: colors.appBlack,
    fontSize: 18,

    marginVertical: 20,
    fontFamily: fonts.primarySB,
    textAlign: 'center',
  },
  phoneText: {
    fontSize: 14,
    color: colors.appGray,
    marginBottom: 5,
    marginTop: 10,
    marginStart: 30,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
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
    marginHorizontal: 20,
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
});
export default styles;
