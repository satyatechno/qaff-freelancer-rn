import {Dimensions, I18nManager, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    padding: 5,
    flex: 1,
  },
  label: {
    color: colors.appGray,
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  textArea: {
    minHeight: 40,
    padding: 5,
    borderColor: colors.skyBlue,
    borderRadius: 10,
    borderWidth: 1.5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    maxHeight: 200,
    fontSize: 16,
    paddingStart: 10,
  },

  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
  content: {
    flexDirection: 'row',
    // paddingVertical: 10,

    // alignItems: 'center',
  },
});
export default styles;
