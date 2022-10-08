import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const {StyleSheet, I18nManager} = require('react-native');

export default StyleSheet.create({
  addSchoolText: {
    fontSize: 16,
    // marginHorizontal: 10,
    marginVertical: 10,
    textAlign: 'left',
  },
  submitButton: {
    marginHorizontal: 10,
    backgroundColor: colors.skyBlue,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    minWidth: '45%',
  },
  submitText: {
    color: colors.defaultWhite,
  },
  inputContainer: {
    // marginTop: height * 0.1,
  },
  label: {
    color: colors.appGray,
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
    paddingTop: 10,
  },
  textArea: {
    // minHeight: 0,
    // maxHeight: 250,
    borderColor: colors.skyBlue,
    borderRadius: 10,
    borderWidth: 1.5,
    // minHeight: 40,
    paddingStart: 10,
    height: 40,
    fontSize: 16,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
