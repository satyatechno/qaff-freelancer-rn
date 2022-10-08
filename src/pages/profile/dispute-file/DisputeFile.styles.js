import {I18nManager, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  titleText: {
    fontSize: 16,
    fontFamily: fonts.primarySB,
    color: colors.skyBlue,
    textAlign: 'left',
  },
  serialText: {
    fontSize: 14,
    fontFamily: fonts.secondarySB,
    color: colors.appBlack,
    textAlign: 'left',
  },
  input: {
    borderColor: colors.skyBlue,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    fontSize: 16,
    paddingStart: 10,
    paddingBottom: 5,
    color: colors.appBlack,
    fontFamily: fonts.secondary,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  label: {
    color: colors.appGray,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  describeText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
  },
  describeInput: {
    height: 80,
    marginBottom: 10,
    textAlignVertical: 'top',
    fontSize: 14,
    fontFamily: fonts.secondary,
    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
    fontFamily: fonts.primary,
    color: colors.appBlack,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  describeInputMaxLimit: {
    color: colors.appGray,
    fontFamily: fonts.primary,
    fontSize: 12,
    textAlign: 'left',
  },
});

export default styles;
